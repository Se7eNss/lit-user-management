import {LitElement, html} from 'lit';
import '../elements/icon/svg-icon';

class DeleteIcon extends LitElement {
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
        pathData="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2   s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2   S37.438,5.668,36.335,5.668z M16.168,3h9v2.668h-9V3z"
        viewBox="0 0 44 44"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
        .fillColor=${this.strokeColor}
      >
      </svg-icon>
    `;
  }
}

customElements.define('delete-icon', DeleteIcon);
