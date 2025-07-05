import {LitElement, html} from 'lit';

//components
import '../components/elements/dataGrid/data-grid';
import '../components/elements/modal/modal-element.js';
import '../components/widgets/employe-widgets.js';

//redux
import {store} from '../redux/store.js'; // Redux store'unuzun yolu
import {removeEmployee} from '../redux/reducers/employeeSlice.js'; // removeEmployee action creator
import {selectAllEmployees} from '../redux/reducers/employeeSlice.js'; // selectAllEmployees selector

//utils
import {Router} from '@vaadin/router';
import {t} from '../utils/localization.js';

export class Employees extends LitElement {
  static properties = {
    employees: {type: Array},
    isConfirmModalOpen: {type: Boolean},
    employeeToDelete: {type: Object},
    listType: {type: String},
  };

  constructor() {
    super();
    this.employees = [];
    this._unsubscribe = null;
    this.isConfirmModalOpen = false;
    this.employeeToDelete = null;
    this.listType = 'list';
    this.columns = [
      {key: 'firstName', label: t('firstName')},
      {key: 'lastName', label: t('lastName')},
      {key: 'dateOfEmployment', label: t('dateOfEmployment')},
      {key: 'dateOfBirth', label: t('dateOfBirth')},
      {key: 'email', label: t('email')},
      {key: 'phone', label: t('phone')},
      {key: 'department', label: t('department'), translate: true},
      {key: 'position', label: t('position'), translate: true},
    ];
  }

  connectedCallback() {
    super.connectedCallback();

    this._unsubscribe = store.subscribe(() => this._onStateChange());

    this._onStateChange();
  }

  _onStateChange() {
    const currentEmployees = selectAllEmployees(store.getState());
    const listType = store.getState().common.listType;
    this.listType = listType;
    if (JSON.stringify(currentEmployees) !== JSON.stringify(this.employees)) {
      this.employees = currentEmployees;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  openConfirmDeleteModal(employee) {
    this.employeeToDelete = employee;
    this.isConfirmModalOpen = true;
  }

  handleConfirmResult(event) {
    const {confirmed} = event.detail;
    if (confirmed && this.employeeToDelete) {
      store.dispatch(removeEmployee(this.employeeToDelete.id));
      console.log(`${this.employeeToDelete.firstName} silindi.`);
    } else {
      console.log('Silme işlemi iptal edildi.');
    }
    this.isConfirmModalOpen = false;
    this.employeeToDelete = null;
  }

  get rowActions() {
    return [
      {
        icon: 'edit',
        method: (item) => {
          Router.go(`/edit-employee?id=${item.id}`);
        },
      },
      {
        icon: 'delete',
        method: (item) => {
          this.openConfirmDeleteModal(item);
        },
      },
    ];
  }

  render() {
    return this.listType === 'list'
      ? html`
          <data-grid
            .columns=${this.columns}
            .data=${this.employees}
            .rowActions=${this.rowActions}
          >
          </data-grid>
          ${this.employeeToDelete
            ? html`
                <modal-element
                  .open=${this.isConfirmModalOpen}
                  title=${t('areYouSure')}
                  message="${t(
                    'deleteDesc',
                    this.employeeToDelete.firstName +
                      ' ' +
                      this.employeeToDelete.lastName
                  )}  "
                  confirmText=${t('proceed')}
                  cancelText=${t('cancel')}
                  @confirm-result=${this.handleConfirmResult}
                ></modal-element>
              `
            : ''}
        `
      : html`<employee-widgets
            .columns=${this.columns}
            .rowActions=${this.rowActions}
            .employees=${this.employees}
          ></employee-widgets>
          ${this.employeeToDelete
            ? html`
                <modal-element
                  .open=${this.isConfirmModalOpen}
                  title=${t('areYouSure')}
                  message="${t(
                    'deleteDesc',
                    this.employeeToDelete.firstName +
                      ' ' +
                      this.employeeToDelete.lastName
                  )}  "
                  confirmText=${t('proceed')}
                  cancelText=${t('cancel')}
                  @confirm-result=${this.handleConfirmResult}
                ></modal-element>
              `
            : ''}`;
  }
}

window.customElements.define('list-employees', Employees);
