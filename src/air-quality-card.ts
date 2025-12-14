console.info('%c AIR QUALITY CARD  v1.3.0 ', 'color: white; background: green; font-weight: bold;');

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import './air-quality-card-editor';


export type SensorType = 'co2' | 'voc' | 'pm25' | 'temperature' | 'humidity' | 'rating';

export interface AirQualityCardConfig {
  type: string;
  title?: string;
  width?: string;  // e.g., "100%", "400px"
  height?: string;
  entities: Partial<Record<SensorType, string>>;  // co2, voc, etc.
  show_bars?: SensorType[];  // explicitly typed for clarity
  recommendation?: string
  _customThresholds?: Record<SensorType, { min?: number; max?: number }>;
}


interface hassWithFormat extends HomeAssistant {
  formatNumber(
    value: number,
    options?: {
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string;
}




// Awair-matched thresholds with gradient type
// 'linear' = low is good, high is bad (CO2, VOC, PM2.5)
// 'u-shaped' = both extremes are bad, middle is good (temp, humidity)
interface Thresholds {
  min: number;        // healthy range min
  max: number;        // healthy range max
  unit: string;
  icon: string;
  absoluteMin: number;
  absoluteMax: number;
  gradientType: 'linear' | 'u-shaped';
  // For linear: color stops from good to bad
  // For u-shaped: define the breakpoints
  breakpoints: number[];
}

const SENSOR_THRESHOLDS: Record<string, Thresholds> = {
  co2: {
    min: 0, max: 600, unit: 'ppm', icon: 'mdi:molecule-co2',
    absoluteMin: 0, absoluteMax: 5000, gradientType: 'linear',
    breakpoints: [0, 600, 1000, 2000, 4500, 5000]  // green, yellow, orange, red, purple
  },
  voc: {
    min: 0, max: 300, unit: 'ppb', icon: 'mdi:chemical-weapon',
    absoluteMin: 0, absoluteMax: 25000, gradientType: 'linear',
    breakpoints: [0, 300, 500, 3000, 25000]  // green, yellow, orange, red, purple
  },
  pm25: {
    min: 0, max: 12, unit: 'µg/m³', icon: 'mdi:blur',
    absoluteMin: 0, absoluteMax: 150, gradientType: 'linear',
    breakpoints: [0, 12, 35, 55, 150]  // green, yellow, orange, red, purple
  },
  temperature: {
    min: 20, max: 25, unit: '°C', icon: 'mdi:thermometer',
    absoluteMin: 8, absoluteMax: 34, gradientType: 'u-shaped',
    breakpoints: [8, 16, 18, 20, 25, 27, 29, 34]  // purple, red, orange, yellow, green, yellow, orange, red, purple
  },
  humidity: {
    min: 40, max: 50, unit: '%', icon: 'mdi:water-percent',
    absoluteMin: 14, absoluteMax: 80, gradientType: 'u-shaped',
    breakpoints: [14, 23, 30, 40, 50, 60, 65, 80]  // purple, red, orange, yellow, green, yellow, orange, red, purple
  },
};

const RATING_IMAGES: Record<string, string> = {
  excellent: '/local/airquality/excellent.png',
  good: '/local/airquality/good.png',
  moderate: '/local/airquality/moderate.png',
  poor: '/local/airquality/poor.png',
  unhealthy: '/local/airquality/unhealthy.png',
};

export class AirQualityCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property() private config!: AirQualityCardConfig;

  public setConfig(config: AirQualityCardConfig) {
    if (!config.entities) throw new Error('Entities required');
    this.config = config;
  }

  static styles = css`
    :host {
      display: block;
      overflow: hidden;
    }
    .card-wrapper {
      position: relative;
    }
    .badge {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
      border: 2px solid var(--card-background-color);
    }
    ha-card {
      padding: 16px;
      overflow: hidden;
      max-width: 100%;
      box-sizing: border-box;
    }
    .recommendation-text {
      margin-top: 16px;
      font-size: 14px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      padding: 10px;
      border-radius: 8px;
      line-height: 1.4;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .title {
      font-weight: bold;
      flex-grow: 1;
    }
    .score {
      font-weight: bold;
      text-align: right;
    }
    .attributes {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      width: 100%;
    }
    .bar-container {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
    }
    .icon {
      margin-right: 8px;
      font-size: 24px;
    }
    .bar {
      flex-grow: 1;
      height: 10px;
      border-radius: 3px;
      background: var(--primary-background-color);
      position: relative;
      overflow: hidden;
    }
    .value-above {
      text-align: right;
      font-size: 12px;
      margin-bottom: 6px;
      padding-right: 2px;
    }

    .gradient {
      position: absolute;
      inset: 0;
      border-radius: 3px;
      z-index: 1;
    }

    /* CO2 gradient - matches Awair scale positions */
    .gradient-co2 {
      background: linear-gradient(to right,
        #2ecc71 0%,
        #2ecc71 12%,
        #f1c40f 12%,
        #f1c40f 20%,
        #e67e22 20%,
        #e67e22 40%,
        #e74c3c 40%,
        #e74c3c 90%,
        #8e44ad 90%,
        #8e44ad 100%);
    }

    /* VOC gradient - compressed scale for usability */
    .gradient-voc {
      background: linear-gradient(to right,
        #2ecc71 0%,
        #2ecc71 40%,
        #f1c40f 40%,
        #f1c40f 50%,
        #e67e22 50%,
        #e67e22 70%,
        #e74c3c 70%,
        #e74c3c 90%,
        #8e44ad 90%,
        #8e44ad 100%);
    }

    /* PM2.5 gradient - matches Awair scale positions */
    .gradient-pm25 {
      background: linear-gradient(to right,
        #2ecc71 0%,
        #2ecc71 8%,
        #f1c40f 8%,
        #f1c40f 23%,
        #e67e22 23%,
        #e67e22 37%,
        #e74c3c 37%,
        #e74c3c 100%);
    }

    /* U-shaped gradient for temp/humidity - both extremes are bad */
    .gradient-u-shaped {
      background: linear-gradient(to right,
        #8e44ad 0%,
        #e74c3c 10%,
        #e67e22 18%,
        #f1c40f 28%,
        #2ecc71 40%,
        #2ecc71 60%,
        #f1c40f 72%,
        #e67e22 82%,
        #e74c3c 90%,
        #8e44ad 100%);
    }

    .marker {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 3px;
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 2px;
      z-index: 3;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
      transform: translateX(-50%);
    }

    .bar-wrapper {
      position: relative;
      flex-grow: 1;
    }

    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      background: #555;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s;
      z-index: 10;
    }

    .bar-wrapper:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
  `;

  static getConfigElement(): Promise<HTMLElement> {
    return Promise.resolve(document.createElement('air-quality-card-editor'));
  }

  static getStubConfig(): Record<string, any> {
    return {
      type: 'custom:air-quality-card',
      title: 'Air Quality',
      entities: {},
    };
  }

  // Get color based on marker position and sensor type
  getValueColor(key: string, markerPercent: number): string {
    const colors = {
      green: '#2ecc71',
      yellow: '#f1c40f',
      orange: '#e67e22',
      red: '#e74c3c',
      purple: '#8e44ad'
    };

    if (key === 'co2') {
      if (markerPercent <= 12) return colors.green;
      if (markerPercent <= 20) return colors.yellow;
      if (markerPercent <= 40) return colors.orange;
      if (markerPercent <= 90) return colors.red;
      return colors.purple;
    }

    if (key === 'voc') {
      if (markerPercent <= 40) return colors.green;
      if (markerPercent <= 50) return colors.yellow;
      if (markerPercent <= 70) return colors.orange;
      if (markerPercent <= 90) return colors.red;
      return colors.purple;
    }

    if (key === 'pm25') {
      if (markerPercent <= 8) return colors.green;
      if (markerPercent <= 23) return colors.yellow;
      if (markerPercent <= 37) return colors.orange;
      return colors.red;
    }

    // U-shaped for temperature and humidity
    if (markerPercent <= 10) return colors.purple;
    if (markerPercent <= 18) return colors.red;
    if (markerPercent <= 28) return colors.orange;
    if (markerPercent <= 40) return colors.yellow;
    if (markerPercent <= 60) return colors.green;
    if (markerPercent <= 72) return colors.yellow;
    if (markerPercent <= 82) return colors.orange;
    if (markerPercent <= 90) return colors.red;
    return colors.purple;
  }

  renderBar(key: string, entityId: string | undefined) {
    if (!entityId) return html``;
    const state = this.hass.states[entityId];
    if (!state || state.state === 'unavailable') return html``;

    const raw = state.state;
    const numeric = Number(raw);

    // Round value to 2 decimal places safely, remove trailing zeros
    const rounded = Math.round((numeric + Number.EPSILON) * 100) / 100;
    const formatted = parseFloat(rounded.toFixed(2)).toString();

    const name = state.attributes.friendly_name || key.toUpperCase();
    const threshold = SENSOR_THRESHOLDS[key];
    const custom = (this.config as any)._customThresholds?.[key] || {};
    const min = custom.min ?? threshold.min;
    const max = custom.max ?? threshold.max;
    const absoluteMin = threshold.absoluteMin;
    const absoluteMax = threshold.absoluteMax;
    const unit = threshold.unit;
    const icon = threshold.icon;
    const gradientType = threshold.gradientType;

    const tooltip = `${name} — healthy: ${min}–${max} ${unit}`;

    // Calculate marker position as percentage
    const markerPercent = Math.max(0, Math.min(100, ((numeric - absoluteMin) / (absoluteMax - absoluteMin)) * 100));

    // Get color for value text based on position
    const valueColor = this.getValueColor(key, markerPercent);

    // Select gradient class based on sensor type
    let gradientClass: string;
    if (gradientType === 'u-shaped') {
      gradientClass = 'gradient-u-shaped';
    } else if (key === 'co2') {
      gradientClass = 'gradient-co2';
    } else if (key === 'voc') {
      gradientClass = 'gradient-voc';
    } else if (key === 'pm25') {
      gradientClass = 'gradient-pm25';
    } else {
      gradientClass = 'gradient-co2'; // default fallback
    }

    return html`
      <div
        class="bar-container"
        @click=${() => fireEvent(this, 'hass-more-info', { entityId })}
        style="cursor: pointer;"
        title="${tooltip}"
      >
        <ha-icon class="icon" icon="${icon}"></ha-icon>
        <div class="bar-wrapper">
          <div class="value-above" style="color: ${valueColor}; font-weight: bold;">${formatted} ${unit}</div>
          <div class="bar">
            <div class="gradient ${gradientClass}"></div>
            <div class="marker" style="left: ${markerPercent}%;"></div>
          </div>
          <div class="tooltip">${tooltip}</div>
        </div>
      </div>
    `;
  }



  isValueHealthy(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  render() {
    const { title, entities } = this.config;
    const show_bars: SensorType[] = this.config.show_bars ?? Object.keys(entities) as SensorType[];
    const barElements = show_bars
      .filter((key: SensorType) => SENSOR_THRESHOLDS[key])
      .map((key: SensorType) => this.renderBar(key, entities[key]));

    const allHealthy = show_bars
      .filter(key => SENSOR_THRESHOLDS[key]) // skip "rating"
      .every((key: SensorType) => {
        const entityId = entities[key];
        const state = entityId ? this.hass.states[entityId] : undefined;
        if (!state || state.state === 'unavailable') return false;
        const value = parseFloat(state.state);
        const { min, max } = SENSOR_THRESHOLDS[key];
        return this.isValueHealthy(value, min, max);
      });


    const ratingEntityId = entities.rating;
    let rawState = '';
    let ratingKey = 'moderate';
    // console.log('[AirQualityCard] ratingEntityId:', ratingEntityId);
    // console.log('[AirQualityCard] rawState:', rawState);


    if (ratingEntityId && this.hass.states[ratingEntityId]) {
      const state = this.hass.states[ratingEntityId].state;
      rawState = state ?? ''; // ensure it's at least an empty string
      // console.log('[AirQualityCard] NewrawState:', rawState);

      const candidate = rawState.toLowerCase().trim();
      if (candidate && RATING_IMAGES.hasOwnProperty(candidate)) {
        ratingKey = candidate;
      } else {
        console.warn(`[AirQualityCard] Unknown air quality rating: "${rawState}" — defaulting to "moderate"`);
      }
    }

    const badgeImage = RATING_IMAGES[ratingKey];
    // console.log('[AirQualityCard] Available rating images:', Object.keys(RATING_IMAGES));




    return html`
      <ha-card style="width: ${this.config.width || '100%'}; height: ${this.config.height || 'auto'};">
        <div class="card-wrapper">
          <div class="header">
            <img class="badge" src="${badgeImage}" alt="${rawState}" />
            <div class="title">${title || 'Air Quality'}</div>
            <div class="score">${rawState}%</div>
          </div>
          <div class="attributes">
            ${barElements}
          </div>
        </div>
        ${this.config.recommendation && this.hass.states[this.config.recommendation]
          ? html`
              <div class="recommendation-text">
                ${this.hass.states[this.config.recommendation].state}
              </div>
            `
          : ''}
      </ha-card>
    `;
  }
}



if (!customElements.get('air-quality-card')) {
  customElements.define('air-quality-card', AirQualityCard);
}

(window as any).customCards = (window as any).customCards || [];
if (!(window as any).customCards.some((c: any) => c.type === 'air-quality-card')) {
  (window as any).customCards.push({
    type: 'air-quality-card',
    name: 'Air Quality Card',
    description: 'Displays air quality sensors with healthy ranges and gradients.',
    preview: true
  });
}
