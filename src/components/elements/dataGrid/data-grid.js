import {LitElement, html} from 'lit';

//styles
import {DataGridStyles} from './data-grid-styles';

//components
import '../checkbox/check-box';
import '../pagination/pagination-element';

//icons
import '../../icons/edit-icon';
import '../../icons/delete-icon';

//utils
import {t} from '../../../utils/localization';

export class DataGrid extends LitElement {
  static properties = {
    data: {type: Array},
    columns: {type: Array},
    rowActions: {type: Array},
    selectedIds: {type: Array},
    pageSize: {type: Number},
    currentPage: {type: Number},
  };

  constructor() {
    super();
    this.data = null;
    this.columns = null;
    this.rowActions = null;
    this.selectedIds = new Set();
    this.pageSize = 10;
    this.currentPage = 1;
  }

  static styles = DataGridStyles;

  handleRowClick = (id) => {
    const newSet = new Set(this.selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    this.selectedIds = newSet;
  };

  isChecked = (id) => {
    return this.selectedIds.has(id);
  };

  handleSelectAll = (e) => {
    if (e.target.checked) {
      this.selectedIds = new Set(this.data.map((d) => d.id));
    } else {
      this.selectedIds = new Set();
    }
  };

  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.data.slice(startIndex, endIndex);
  }

  _handlePageChange = (event) => {
    this.currentPage = event.detail.page;
    this.selectedIds = new Set();
    this.requestUpdate('selectedIds');
  };

  willUpdate(changedProperties) {
    if (changedProperties.has('data') || changedProperties.has('pageSize')) {
      const totalPages =
        this.data.length === 0 || this.pageSize === 0
          ? 0
          : Math.ceil(this.data.length / this.pageSize);

      if (this.currentPage > totalPages && totalPages > 0) {
        this.currentPage = totalPages;
      } else if (totalPages === 0 && this.currentPage !== 1) {
        this.currentPage = 1;
      }
    }
  }

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
    const paginatedData = this.getPaginatedData();
    const hasData = this.data && this.data.length > 0;

    return html`
      <div class="wrapper">
        <table>
          <thead>
            <tr>
              <th class="selectBoxCell">
                <check-box
                  @change=${(e) => this.handleSelectAll(e)}
                  .checked=${this.selectedIds.size === this.data?.length}
                ></check-box>
              </th>
              ${this.columns.map((col) => html`<th>${t(col.key)}</th>`)}
              ${this.rowActions.length > 0 &&
              html` <th class="selectBoxCell">${t('action')}</th> `}
            </tr>
          </thead>
          <tbody>
            ${paginatedData?.map(
              (item) => html`
                <tr>
                  <td class="selectBoxCell">
                    <check-box
                      @change=${() => this.handleRowClick(item?.id)}
                      .checked=${this.selectedIds.size === this.data.length}
                    ></check-box>
                  </td>
                  ${this.columns.map(
                    (col) => html`<td>${t(item[col.key])}</td>`
                  )}
                  <td class="actionButtonsWrapper">
                    ${this.rowActions.map(
                      (action) => html`
                        <button
                          class="actionButton"
                          @click=${() => action.method(item)}
                        >
                          ${action.icon === 'edit'
                            ? html`<edit-icon
                                strokeColor="primary"
                                size="20"
                              ></edit-icon>`
                            : action.icon === 'delete'
                            ? html`<delete-icon
                                strokeColor="primary"
                                size="20"
                              ></delete-icon>`
                            : ''}
                        </button>
                      `
                    )}
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
      ${hasData
        ? html`
            <pagination-element
              .totalItems=${this.data.length}
              .pageSize=${this.pageSize}
              .currentPage=${this.currentPage}
              @page-change=${this._handlePageChange}
            ></pagination-element>
          `
        : ''}
    `;
  }
}

window.customElements.define('data-grid', DataGrid);
