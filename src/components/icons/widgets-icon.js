import {LitElement, html} from 'lit';
import '../elements/icon/svg-icon';

class WidgetIcon extends LitElement {
  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 -4.2 28 28"
        fill="none"
      >
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="#ff6200"
          stroke-linecap="round"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="#ff6200"
          stroke-linecap="round"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="#ff6200"
          stroke-linecap="round"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="#ff6200"
          stroke-linecap="round"
        />
      </svg>
    `;
  }
}

customElements.define('widget-icon', WidgetIcon);
