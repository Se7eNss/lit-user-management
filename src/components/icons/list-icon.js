import {LitElement, html} from 'lit';
import '../elements/icon/svg-icon';

class ListIcon extends LitElement {
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="2 1 100 100"
        fill="none"
      >
        <path
          d="M100.25 55H19.75C17.1266 55 15 57.1266 15 59.75V60.25C15 62.8734 17.1266 65 19.75 65H100.25C102.873 65 105 62.8734 105 60.25V59.75C105 57.1266 102.873 55 100.25 55Z"
          fill="#F24E1E"
        />
        <path
          d="M100.25 80H19.75C17.1266 80 15 82.1267 15 84.75V85.25C15 87.8733 17.1266 90 19.75 90H100.25C102.873 90 105 87.8733 105 85.25V84.75C105 82.1267 102.873 80 100.25 80Z"
          fill="#F24E1E"
        />
        <path
          d="M100.25 30H19.75C17.1266 30 15 32.1266 15 34.75V35.25C15 37.8734 17.1266 40 19.75 40H100.25C102.873 40 105 37.8734 105 35.25V34.75C105 32.1266 102.873 30 100.25 30Z"
          fill="#F24E1E"
        />
      </svg>
    `;
  }
}

customElements.define('list-icon', ListIcon);
