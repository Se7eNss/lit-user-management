import {LitElement, html} from 'lit';

//styles
import {InputStyles} from './input-element-styles';

//icons
import '../../icons/calendar-icon';

class Input extends LitElement {
  static properties = {
    name: {type: String},
    label: {type: String},
    type: {type: String},
    value: {type: String},
    placeholder: {type: String},
  };

  constructor() {
    super();
    this.label = '';
    this.type = 'text';
    this.value = '';
    this.placeholder = '';
  }

  static styles = InputStyles;

  handleInput(e) {
    this.value = e.target.value;

    this.dispatchEvent(
      new CustomEvent('input-changed', {
        detail: {
          name: this.name,
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <label>
        ${this.label}
        ${this.type === 'date'
          ? html`
              <div class="date-wrapper">
                <input
                  name=${this.name}
                  type="date"
                  .value=${this.value}
                  placeholder=${this.placeholder}
                  @input=${this.handleInput}
                />
                <span class="calendar-icon">
                  <calendar-icon
                    strokeColor="primary"
                    size="20"
                  ></calendar-icon>
                </span>
              </div>
            `
          : html`
              <input
                name=${this.name}
                .type=${this.type}
                .value=${this.value}
                placeholder=${this.placeholder}
                @input=${this.handleInput}
              />
            `}
      </label>
    `;
  }
}

customElements.define('input-element', Input);
