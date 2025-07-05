import {LitElement, html} from 'lit';

import {SelectBoxStyles} from './selec-box-styles'; // Yazım hatası olabilir: selec-box-styles.js
import {t} from '../../../utils/localization';

class SelectBox extends LitElement {
  static properties = {
    name: {type: String}, // Yeni eklendi: name property'si
    label: {type: String},
    options: {type: Array},
    _selectedValue: {type: String}, // Dahili değeri tutacak, doğrudan .value'yu kullanmayacağız
    open: {type: Boolean},
  };

  constructor() {
    super();
    this.name = '';
    this.label = '';
    this.options = null;
    this._selectedValue = '';
    this.open = false;

    this._boundHandleOutsideClick = this._handleOutsideClick.bind(this);
  }

  static styles = SelectBoxStyles;

  set value(val) {
    const oldVal = this._selectedValue;
    if (val !== oldVal) {
      this._selectedValue = val;
      this.requestUpdate('value', oldVal);
    }
  }

  get value() {
    return this._selectedValue;
  }

  connectedCallback = () => {
    super.connectedCallback();
    document.addEventListener('click', this._boundHandleOutsideClick);
  };

  disconnectedCallback = () => {
    document.removeEventListener('click', this._boundHandleOutsideClick);
    super.disconnectedCallback();
  };

  _handleOutsideClick = (e) => {
    if (this.open && !e.composedPath().includes(this)) {
      this.open = false;
    }
  };

  toggleDropdown = () => {
    this.open = !this.open;
  };

  selectOption = (optionValue) => {
    this.value = optionValue;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('select-changed', {
        detail: {
          name: this.name,
          value: optionValue,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  render() {
    const selectedOptionLabel =
      this.options.find((opt) => opt.value === this.value)?.label ||
      t('pleaseSelect');

    return html`
      <label>
        ${this.label}
        <div class="select-wrapper">
          <div
            class=${this.open ? 'selected focus' : 'selected'}
            @click=${this.toggleDropdown}
          >
            ${selectedOptionLabel}
          </div>
          ${this.open
            ? html`
                <div class="dropdown" @click=${(e) => e.stopPropagation()}>
                  ${this.options.map(
                    (opt) =>
                      html`<div
                        class="option ${opt.value === this.value
                          ? 'active'
                          : ''}"
                        @click=${() => this.selectOption(opt.value)}
                      >
                        ${opt.label}
                      </div>`
                  )}
                </div>
              `
            : ''}
        </div>
      </label>
    `;
  }
}

customElements.define('select-box', SelectBox);
