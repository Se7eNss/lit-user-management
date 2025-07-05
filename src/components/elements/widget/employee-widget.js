import {LitElement, html} from 'lit';

//styles
import {WidgetStyles} from './employee-widget-styles';

//utils
import {t} from '../../../utils/localization';

class EmployeeWidget extends LitElement {
  static properties = {
    columns: {type: Array},
    employee: {type: Object},
    rowActions: {type: Array},
  };

  constructor() {
    super();
    this.employee = null;
    this.columns = [];
    this.rowActions = [];
  }

  static styles = WidgetStyles;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('locale-changed', this._onLocaleChange);
  }

  disconnectedCallback() {
    window.removeEventListener('locale-changed', this._onLocaleChange);
    super.disconnectedCallback();
  }

  _onLocaleChange = () => {
    this.requestUpdate();
  };

  render() {
    return html`
      <div class="employee-widget">
        ${this.columns.map(
          (column) =>
            html`<div class="item">
              <span class="title">${t(column.key)}</span>
              <div class="value">${t(this.employee[column.key]) || '-'}</div>
            </div> `
        )}
        <div class="actionButtonsWrapper">
          ${this.rowActions.map(
            (action) => html`
              <button
                class=${action.icon === 'delete'
                  ? 'actionButton deleteColor'
                  : 'actionButton'}
                @click=${() => action.method(this.employee)}
              >
                ${action.icon === 'edit'
                  ? html` <edit-icon strokeColor="white" size="20"></edit-icon>
                      <div class="buttonText">${t('edit')}</div>`
                  : action.icon === 'delete'
                  ? html`<delete-icon
                        strokeColor="white"
                        size="20"
                      ></delete-icon>
                      <div class="buttonText">${t('delete')}</div>`
                  : ''}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('employee-widget', EmployeeWidget);
