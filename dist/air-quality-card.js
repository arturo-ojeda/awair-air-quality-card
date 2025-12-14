/*! For license information please see air-quality-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,t,i)},n=(i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",$=g.reactiveElementPolyfillSupport,_=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),v={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return n(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s,this[s]=o.fromAttribute(e,t.type)??this._$Ej?.get(s)??null,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,o=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[_("elementProperties")]=new Map,A[_("finalized")]=new Map,$?.({ReactiveElement:A}),(g.reactiveElementVersions??=[]).push("2.1.0");const x=globalThis,w=x.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,M=`<${P}>`,O=document,k=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,R="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,q=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,I=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=I(1),V=(I(2),I(3),Symbol.for("lit-noChange")),W=Symbol.for("lit-nothing"),F=new WeakMap,Q=O.createTreeWalker(O,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===H?"!--"===c[1]?n=N:void 0!==c[1]?n=j:void 0!==c[2]?(L.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=q):void 0!==c[3]&&(n=q):n===q?">"===c[0]?(n=o??H,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?q:'"'===c[3]?D:z):n===D||n===z?n=q:n===N||n===j?n=H:(n=q,o=void 0);const d=n===q&&t[e+1].startsWith("/>")?" ":"";r+=n===H?i+M:l>=0?(s.push(a),i.slice(0,l)+S+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=X.createElement(c,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),Q.nextNode(),a.push({type:2,index:++o});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===V)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Y(t,o._$AS(t,e.values),o,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);Q.currentNode=s;let o=Q.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new G(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=Q.nextNode(),r++)}return Q.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),U(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new X(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new G(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Y(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Y(this,s[i+n],e,n),a===V&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??W)===V)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(X,G),(x.litHtmlVersions??=[]).push("3.3.0");const nt=globalThis;class at extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new G(e.insertBefore(k(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.0");const lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ht=(t=lt,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var pt,ut,gt;(gt=pt||(pt={})).language="language",gt.system="system",gt.comma_decimal="comma_decimal",gt.decimal_comma="decimal_comma",gt.space_comma="space_comma",gt.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ut||(ut={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var ft=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o};new Set(["call-service","divider","section","weblink","cast","select"]);var mt=function(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};class $t extends at{setConfig(t){this._config={...t}}_valueChanged(t,e,i){if(!this._config.entities)return;const s=t.target,o="min"===i||"max"===i?parseFloat(s.value):s.value;this._config.entities[e]||(this._config.entities[e]=""),"_customThresholds"in this._config||(this._config._customThresholds={}),this._config._customThresholds[e]={...this._config._customThresholds?.[e],[i]:o},ft(this,"config-changed",{config:this._config})}render(){if(!this.hass||!this._config)return B``;const t=this._config._customThresholds||{};return B`
      <div class="card-config">
        <label>
          Title
          <input
            type="text"
            .value=${this._config.title||""}
            @input=${t=>{this._config.title=t.target.value,ft(this,"config-changed",{config:this._config})}}
          />
        </label>
        <label>
          Card Width (e.g. 100%, 300px)
          <input
            type="text"
            .value=${this._config.width||""}
            @input=${t=>{this._config.width=t.target.value,ft(this,"config-changed",{config:this._config})}}
          />
        </label>

        <label>
          Card Height (e.g. auto, 400px)
          <input
            type="text"
            .value=${this._config.height||""}
            @input=${t=>{this._config.height=t.target.value,ft(this,"config-changed",{config:this._config})}}
          />
        </label>
        <label>
          Recommendation Sensor
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.recommendation||""}
            .configValue=${"recommendation"}
            @value-changed=${t=>{this._config.recommendation=t.detail.value,ft(this,"config-changed",{config:this._config})}}
            allow-custom-entity
          ></ha-entity-picker>
        </label>

        ${["co2","voc","pm25","temperature","humidity","rating"].map((e=>{const i=t[e]||{};return B`
            <div class="sensor-entry">
              <label>${e.toUpperCase()}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${this._config.entities?.[e]||""}
                .configValue=${e}
                @value-changed=${t=>{this._config.entities={...this._config.entities,[e]:t.detail.value},ft(this,"config-changed",{config:this._config})}}
                allow-custom-entity
              ></ha-entity-picker>
              ${"rating"!==e?B`
                <label>Absolute Min</label>
                <input
                  type="number"
                  .value=${i.min??""}
                  @input=${t=>this._valueChanged(t,e,"min")}
                />
                <label>Absolute Max</label>
                <input
                  type="number"
                  .value=${i.max??""}
                  @input=${t=>this._valueChanged(t,e,"max")}
                />
              `:""}
            </div>
          `}))}
      </div>
    `}}$t.styles=r`
    .sensor-entry {
      margin-bottom: 12px;
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 6px;
    }
    .sensor-entry label {
      display: block;
      font-weight: bold;
      margin-bottom: 4px;
    }
    input[type="number"], input[type="text"] {
      background-color: rgb(110, 110, 110);
      color: #000;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 4px;
      width: 100%;
      box-sizing: border-box;
    }
  `,mt([dt({attribute:!1})],$t.prototype,"hass",void 0),mt([dt({state:!0,attribute:!1})],$t.prototype,"_config",void 0),customElements.get("air-quality-card-editor")||customElements.define("air-quality-card-editor",$t);var _t=function(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};console.info("%c AIR QUALITY CARD  v1.3.0 ","color: white; background: green; font-weight: bold;");const bt={co2:{min:0,max:600,unit:"ppm",icon:"mdi:molecule-co2",absoluteMin:0,absoluteMax:5e3,gradientType:"linear",breakpoints:[0,600,1e3,2e3,4500,5e3]},voc:{min:0,max:300,unit:"ppb",icon:"mdi:chemical-weapon",absoluteMin:0,absoluteMax:25e3,gradientType:"linear",breakpoints:[0,300,500,3e3,25e3]},pm25:{min:0,max:12,unit:"µg/m³",icon:"mdi:blur",absoluteMin:0,absoluteMax:150,gradientType:"linear",breakpoints:[0,12,35,55,150]},temperature:{min:20,max:25,unit:"°C",icon:"mdi:thermometer",absoluteMin:8,absoluteMax:34,gradientType:"u-shaped",breakpoints:[8,16,18,20,25,27,29,34]},humidity:{min:40,max:50,unit:"%",icon:"mdi:water-percent",absoluteMin:14,absoluteMax:80,gradientType:"u-shaped",breakpoints:[14,23,30,40,50,60,65,80]}},yt={excellent:"/local/airquality/excellent.png",good:"/local/airquality/good.png",moderate:"/local/airquality/moderate.png",poor:"/local/airquality/poor.png",unhealthy:"/local/airquality/unhealthy.png"};class vt extends at{setConfig(t){if(!t.entities)throw new Error("Entities required");this.config=t}static getConfigElement(){return Promise.resolve(document.createElement("air-quality-card-editor"))}static getStubConfig(){return{type:"custom:air-quality-card",title:"Air Quality",entities:{}}}getValueColor(t,e){const i="#2ecc71",s="#f1c40f",o="#e67e22",r="#e74c3c",n="#8e44ad";return"co2"===t?e<=12?i:e<=20?s:e<=40?o:e<=90?r:n:"voc"===t?e<=40?i:e<=50?s:e<=70?o:e<=90?r:n:"pm25"===t?e<=8?i:e<=23?s:e<=37?o:r:e<=10?n:e<=18?r:e<=28?o:e<=40?s:e<=60?i:e<=72?s:e<=82?o:e<=90?r:n}renderBar(t,e){if(!e)return B``;const i=this.hass.states[e];if(!i||"unavailable"===i.state)return B``;const s=i.state,o=Number(s),r=Math.round(100*(o+Number.EPSILON))/100,n=parseFloat(r.toFixed(2)).toString(),a=i.attributes.friendly_name||t.toUpperCase(),c=bt[t],l=this.config._customThresholds?.[t]||{},h=l.min??c.min,d=l.max??c.max,p=c.absoluteMin,u=c.absoluteMax,g=c.unit,f=c.icon,m=c.gradientType,$=`${a} — healthy: ${h}–${d} ${g}`,_=Math.max(0,Math.min(100,(o-p)/(u-p)*100)),b=this.getValueColor(t,_);let y;return y="u-shaped"===m?"gradient-u-shaped":"co2"===t?"gradient-co2":"voc"===t?"gradient-voc":"pm25"===t?"gradient-pm25":"gradient-co2",B`
      <div
        class="bar-container"
        @click=${()=>ft(this,"hass-more-info",{entityId:e})}
        style="cursor: pointer;"
        title="${$}"
      >
        <ha-icon class="icon" icon="${f}"></ha-icon>
        <div class="bar-wrapper">
          <div class="value-above" style="color: ${b}; font-weight: bold;">${n} ${g}</div>
          <div class="bar">
            <div class="gradient ${y}"></div>
            <div class="marker" style="left: ${_}%;"></div>
          </div>
          <div class="tooltip">${$}</div>
        </div>
      </div>
    `}isValueHealthy(t,e,i){return t>=e&&t<=i}render(){const{title:t,entities:e}=this.config,i=this.config.show_bars??Object.keys(e),s=i.filter((t=>bt[t])).map((t=>this.renderBar(t,e[t]))),o=(i.filter((t=>bt[t])).every((t=>{const i=e[t],s=i?this.hass.states[i]:void 0;if(!s||"unavailable"===s.state)return!1;const o=parseFloat(s.state),{min:r,max:n}=bt[t];return this.isValueHealthy(o,r,n)})),e.rating);let r="",n="moderate";if(o&&this.hass.states[o]){r=this.hass.states[o].state??"";const t=r.toLowerCase().trim();t&&yt.hasOwnProperty(t)?n=t:console.warn(`[AirQualityCard] Unknown air quality rating: "${r}" — defaulting to "moderate"`)}const a=yt[n];return B`
      <ha-card style="width: ${this.config.width||"100%"}; height: ${this.config.height||"auto"};">
        <div class="card-wrapper">
          <div class="header">
            <img class="badge" src="${a}" alt="${r}" />
            <div class="title">${t||"Air Quality"}</div>
            <div class="score">${r}%</div>
          </div>
          <div class="attributes">
            ${s}
          </div>
        </div>
        ${this.config.recommendation&&this.hass.states[this.config.recommendation]?B`
              <div class="recommendation-text">
                ${this.hass.states[this.config.recommendation].state}
              </div>
            `:""}
      </ha-card>
    `}}vt.styles=r`
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
  `,_t([dt({attribute:!1})],vt.prototype,"hass",void 0),_t([dt()],vt.prototype,"config",void 0),customElements.get("air-quality-card")||customElements.define("air-quality-card",vt),window.customCards=window.customCards||[],window.customCards.some((t=>"air-quality-card"===t.type))||window.customCards.push({type:"air-quality-card",name:"Air Quality Card",description:"Displays air quality sensors with healthy ranges and gradients.",preview:!0})})();