import {LitElement, html} from 'lit';
import '../elements/icon/svg-icon';

class PlusIcon extends LitElement {
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
        pathData="M3.54199 8.93783H8.50033M13.4587 8.93783H8.50033M8.50033 8.93783V3.97949M8.50033 8.93783V13.8962"
        viewBox="0 0 15 15"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
      >
      </svg-icon>
    `;
  }
}

customElements.define('plus-icon', PlusIcon);
