import {LitElement, html} from 'lit';

//styles
import {CheckBoxStyles} from './check-box-styles';

//icons
import '../../icons/list-icon';
import '../../icons/widgets-icon';

class CheckBox extends LitElement {
  static properties = {
    checked: {type: Boolean, reflect: true},
  };

  constructor() {
    super();
    this.checked = false;
  }

  static styles = CheckBoxStyles;

  handleClick = (e) => {
    e.preventDefault();
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {checked: this.checked},
        bubbles: true,
        composed: true,
      })
    );
  };

  render() {
    return html`
      <label class="custom-checkbox" @click=${this.handleClick}>
        <input type="checkbox" .checked=${this.checked} />
        <span class="checkmark"></span>
      </label>
    `;
  }
}

customElements.define('check-box', CheckBox);
