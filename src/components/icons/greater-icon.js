import {LitElement, html} from 'lit';
import '../elements/icon/svg-icon';

class GreaterIcon extends LitElement {
  static properties = {
    strokeColor: {type: String},
    size: {type: Number},
  };

  constructor() {
    super();
    this.strokeColor = 'currentColor';
    this.size = 16;
  }

  render() {
    return html`
      <svg-icon
        pathData="M 42.1680 43.5625 C 43.3164 43.5625 44.1602 42.7422 44.1602 41.4531 C 44.1602 40.3750 43.5976 39.7656 42.6133 39.2969 L 17.3711 28.0703 L 17.3711 27.8125 L 42.6133 16.6797 C 43.5976 16.2110 44.1602 15.6016 44.1602 14.5235 C 44.1602 13.2813 43.2929 12.4375 42.0742 12.4375 C 41.4648 12.4375 41.0429 12.6016 40.5742 12.8359 L 14.2304 24.9532 C 12.8711 25.5625 11.8398 26.6406 11.8398 28.1172 C 11.8398 29.6172 12.8945 30.6484 14.2304 31.2813 L 40.5742 43.1172 C 41.0664 43.3516 41.5117 43.5625 42.1680 43.5625 Z"
        viewBox="0 -6 50 50"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
        .fillColor=${this.strokeColor}
      >
      </svg-icon>
    `;
  }
}

customElements.define('greater-icon', GreaterIcon);
