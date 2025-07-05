import {LitElement, html} from 'lit';

import '../components/elements/dataGrid/data-grid';
import '../components/elements/input/input-element.js';
import '../components/forms/employee-add-edit-form.js';

export class AddEmployee extends LitElement {
  render() {
    return html`<employee-add-edit-form></employee-add-edit-form>`;
  }
}

window.customElements.define('add-employee', AddEmployee);
