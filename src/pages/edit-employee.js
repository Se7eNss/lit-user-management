import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router'; // Vaadin Router'ı import edin
import {store} from '../redux/store.js'; // Redux store'unuzu import edin
import '../components/forms/employee-add-edit-form.js'; // EmployeeAddEditForm'u import edin

export class EditEmployee extends LitElement {
  static properties = {
    employee: {type: Object},
  };

  constructor() {
    super();
    this.employee = null;
  }

  onAfterEnter(location) {
    const queryParams = new URLSearchParams(location.search);
    const employeeId = queryParams.get('id');

    if (employeeId) {
      const state = store.getState();
      const foundEmployee = state.employees?.find(
        (emp) => emp.id == employeeId
      );

      if (foundEmployee) {
        this.employee = foundEmployee;
      } else {
        console.warn(`Çalışan bulunamadı: ID ${employeeId}`);
        Router.go('/');
      }
    } else {
      this.employee = null;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`
      <employee-add-edit-form
        .employee=${this.employee}
      ></employee-add-edit-form>
    `;
  }
}

customElements.define('edit-employee', EditEmployee);
