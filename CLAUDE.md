# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Home Assistant custom Lovelace card for displaying air quality sensor data with visual health range indicators. It's designed for HACS (Home Assistant Community Store) installation.

## Build Commands

```bash
npm install          # Install dependencies
npm run build        # Build production bundle (outputs to dist/)
```

The build uses Webpack to bundle TypeScript source files into a single JavaScript file for Home Assistant.

## Architecture

**Main Components:**
- `src/air-quality-card.ts` - Main card component using LitElement. Renders sensor bars with gradient visualization and rating badge
- `src/air-quality-card-editor.ts` - Visual config editor for the card (uses `@customElement` decorator)

**Key Patterns:**
- Uses Lit 3 with decorators (`experimentalDecorators` enabled in tsconfig)
- `custom-card-helpers` for Home Assistant integration (`HomeAssistant` type, `fireEvent`)
- Sensor thresholds defined in `SENSOR_THRESHOLDS` constant with min/max/unit/icon per sensor type
- Rating images mapped in `RATING_IMAGES` (excellent/good/moderate/poor/unhealthy)

**Supported Sensors:**
- CO2, VOC, PM2.5, Temperature, Humidity (with visual bars)
- Rating (determines badge image)
- Recommendation (optional text sensor)

**Distribution:**
- `hacs.json` configures HACS with filename pointing to versioned JS in dist/
- Update `hacs.json` filename when releasing new versions
