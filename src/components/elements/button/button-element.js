import {LitElement, html} from 'lit';

//styles
import {ButtonStyles} from './button-element-styles';

export class Button extends LitElement {
  static properties = {
    type: {type: String},
    variant: {type: String},
    disabled: {type: Boolean},
    label: {type: String},
  };

  constructor() {
    super();
    this.type = 'button';
    this.variant = 'primary';
    this.disabled = false;
    this.label = '';
  }

  static styles = ButtonStyles;

  _handleClick = (e) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this.type === 'submit') {
      const form = this.closest('form');
      if (form) {
        form.requestSubmit();
      }
    } else {
      e.preventDefault();
    }

    this.dispatchEvent(
      new CustomEvent('button-click', {
        detail: {originalEvent: e},
        bubbles: true,
        composed: true,
      })
    );
  };

  render() {
    return html`
      <button
        class=${this.variant}
        ?disabled=${this.disabled}
        type=${this.type}
        @click=${this._handleClick}
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }
}

customElements.define('button-element', Button);
