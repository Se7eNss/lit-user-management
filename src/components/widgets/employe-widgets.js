import {LitElement, html} from 'lit';

//styles
import {EmployeeWidgetStyles} from './employee-widgets-styles';

//components
import '../elements/widget/employee-widget';
import '../../components/elements/pagination/pagination-element';

class EmployeeWidgets extends LitElement {
  static properties = {
    columns: {type: Array},
    employees: {type: Array},
    rowActions: {type: Array},
    pageSize: {type: Number},
    currentPage: {type: Number},
  };

  constructor() {
    super();
    this.employees = null;
    this.columns = null;
    this.rowActions = null;
    this.pageSize = 4;
    this.currentPage = 1;
  }

  static styles = EmployeeWidgetStyles;

  willUpdate(changedProperties) {
    if (
      changedProperties.has('employees') ||
      changedProperties.has('pageSize')
    ) {
      const totalPages =
        this.employees.length === 0 || this.pageSize === 0
          ? 0
          : Math.ceil(this.employees.length / this.pageSize);

      if (this.currentPage > totalPages && totalPages > 0) {
        this.currentPage = totalPages;
      } else if (totalPages === 0 && this.currentPage !== 1) {
        this.currentPage = 1;
      }
    }
  }

  getPaginatedData = () => {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.employees.slice(startIndex, endIndex);
  };

  _handlePageChange = (event) => {
    this.currentPage = event.detail.page;
    this.selectedIds = new Set();
    this.requestUpdate('selectedIds');
  };

  render() {
    const paginatedData = this.getPaginatedData();
    const hasData = this.employees && this.employees?.length > 0;
    return html`
      <div class="widgetWrapper">
        ${paginatedData.map(
          (employee) =>
            html`<employee-widget
              .columns=${this.columns}
              .employee=${employee}
              .rowActions=${this.rowActions}
            ></employee-widget>`
        )}
      </div>
      ${hasData
        ? html`
            <pagination-element
              .totalItems=${this.employees.length}
              .pageSize=${this.pageSize}
              .currentPage=${this.currentPage}
              @page-change=${this._handlePageChange}
            ></pagination-element>
          `
        : ''}
    `;
  }
}

customElements.define('employee-widgets', EmployeeWidgets);
