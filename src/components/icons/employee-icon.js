import {LitElement, html} from 'lit';
import '../elements/icon/svg-icon';

class EmployeeIcon extends LitElement {
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
        pathData="M10,11 C12.353,11 14.318,12.711 14.848,15 L14.848,15 L18,15 C19.103,15 20,15.897 20,17 L20,17 L20,19 L18,19 L18,17 L2,17 L2,19 L0,19 L0,17 C0,15.897 0.897,15 2,15 L2,15 L5.152,15 C5.682,12.711 7.647,11 10,11 Z M10,4 C11.657,4 13,5.343 13,7 C13,8.657 11.657,10 10,10 C8.343,10 7,8.657 7,7 C7,5.343 8.343,4 10,4 Z M10,0 C13.859,0 17,3.14 17,7 L17,7 L15,7 C15,4.243 12.757,2 10,2 C7.243,2 5,4.243 5,7 L5,7 L5,8 L6,8 L6,10 L4,10 C3.447,10 3,9.552 3,9 L3,9 L3,7 C3,3.14 6.141,0 10,0 Z"
        viewBox="-1 -2 22 22"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
      >
      </svg-icon>
    `;
  }
}

customElements.define('employee-icon', EmployeeIcon);
