import {LitElement, html} from 'lit';

//styles
import {ModalStyles} from './modal-element-styles';

//utils
import {classMap} from 'lit/directives/class-map.js';

//icons
import '../../icons/cross-icon';

export class Modal extends LitElement {
  static properties = {
    open: {type: Boolean, reflect: true},
    title: {type: String},
    message: {type: String},
    confirmText: {type: String},
    cancelText: {type: String},
  };

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.message = '';
    this.confirmText = '';
    this.cancelText = '';
  }
  static styles = ModalStyles;

  handleAction = (confirmed) => {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('confirm-result', {
        detail: {confirmed: confirmed},
        bubbles: true,
        composed: true,
      })
    );
  };

  render() {
    const classes = {
      'modal-overlay': true,
      open: this.open,
    };

    return html`
      <div
        class=${classMap(classes)}
        aria-modal="true"
        role="dialog"
        tabindex="-1"
      >
        <div class="modal-content" @click=${(e) => e.stopPropagation()}>
          <div class="modal-title">
            ${this.title}
            <button
              @click=${() => this.handleAction(false)}
              class="crossButton"
            >
              <cross-icon strokeColor="primary" size="28"></cross-icon>
            </button>
          </div>
          <p class="modal-message">${this.message}</p>
          <div class="modal-actions">
            <button-element
              variant="modalButton"
              @click=${() => this.handleAction(true)}
            >
              ${this.confirmText}
            </button-element>
            ${this.cancelText &&
            html`
              <button-element
                variant="modalButtonSecondary"
                @click=${() => this.handleAction(false)}
              >
                ${this.cancelText}
              </button-element>
            `}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-element', Modal);
