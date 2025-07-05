import {LitElement, html} from 'lit';

class SvgIcon extends LitElement {
  static properties = {
    pathData: {type: String | Array},
    viewBox: {type: String},
    fillColor: {type: String},
    strokeColor: {type: String},
    size: {type: Number},
  };

  constructor() {
    super();
    this.strokeColor = 'currentColor';
    this.fillColor = '#fff';
    this.viewBox = '0 0 24 24';
    this.size = 16;
  }

  get computedStrokeColor() {
    if (!this.strokeColor || this.strokeColor === 'currentColor')
      return 'currentColor';
    if (this.strokeColor.startsWith('#')) {
      return this.strokeColor;
    } else {
      return `var(--color-${this.strokeColor})`;
    }
  }
  get computedFillColor() {
    if (!this.fillColor || this.fillColor === 'currentColor')
      return 'currentColor';
    if (this.fillColor.startsWith('#')) {
      return this.fillColor;
    } else {
      return `var(--color-${this.fillColor})`;
    }
  }

  render() {
    return html`
      <svg
        width="${this.size}"
        height="${this.size}"
        viewBox=${this.viewBox}
        fill="${this.computedFillColor}"
        stroke="${this.computedStrokeColor}"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="${this.pathData}" fill=${this.computedFillColor}></path>
      </svg>
    `;
  }
}

customElements.define('svg-icon', SvgIcon);
