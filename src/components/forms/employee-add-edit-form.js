import {LitElement, html} from 'lit';

//styles
import {FormStyles} from './forms-styles.js';

//componetns
import '../../components/elements/input/input-element.js';
import '../../components/elements/select/select-box.js';
import '../../components/elements/button/button-element.js';

//utils
import {t} from '../../utils/localization.js';
import {Router} from '@vaadin/router';

//redux
import {store} from '../../redux/store.js';
import {addEmployee, editEmployee} from '../../redux/reducers/employeeSlice.js';

export class EmployeeAddEditForm extends LitElement {
  static properties = {
    employee: {type: Object},
    validationError: {type: Array},
    confirmModal: {type: Boolean},
    newEmployeeData: {type: Object},
  };
  constructor() {
    super();
    this.validationError = [];
    this.confirmModal = false;
    this.newEmployeeData = null;
  }

  static styles = FormStyles;

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('employee') && this.employee) {
      this._fillFormWithEmployeeData(this.employee);
    }
  }

  _fillFormWithEmployeeData = (employeeData) => {
    if (!employeeData) return;
    const inputFirstName = this.shadowRoot.querySelector(
      'input-element[name="firstName"]'
    );
    if (inputFirstName) inputFirstName.value = employeeData.firstName || '';

    const inputLastName = this.shadowRoot.querySelector(
      'input-element[name="lastName"]'
    );
    if (inputLastName) inputLastName.value = employeeData.lastName || '';

    const inputDateOfEmployment = this.shadowRoot.querySelector(
      'input-element[name="dateOfEmployment"]'
    );
    if (inputDateOfEmployment)
      inputDateOfEmployment.value = employeeData.dateOfEmployment || '';

    const inputDateOfBirth = this.shadowRoot.querySelector(
      'input-element[name="dateOfBirth"]'
    );
    if (inputDateOfBirth)
      inputDateOfBirth.value = employeeData.dateOfBirth || '';

    const inputPhone = this.shadowRoot.querySelector(
      'input-element[name="phone"]'
    );
    if (inputPhone) inputPhone.value = employeeData.phone || '';

    const inputEmail = this.shadowRoot.querySelector(
      'input-element[name="email"]'
    );
    if (inputEmail) inputEmail.value = employeeData.email || '';

    const inputDepartment = this.shadowRoot.querySelector(
      'select-box[name="department"]'
    );
    if (inputDepartment) inputDepartment.value = employeeData.department || '';

    const selectPosition = this.shadowRoot.querySelector(
      'select-box[name="position"]'
    );
    if (selectPosition) selectPosition.value = employeeData.position || '';
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const firstName = this.shadowRoot.querySelector(
      'input-element[name="firstName"]'
    ).value;
    const lastName = this.shadowRoot.querySelector(
      'input-element[name="lastName"]'
    ).value;
    const dateOfEmployment = this.shadowRoot.querySelector(
      'input-element[name="dateOfEmployment"]'
    ).value;
    const dateOfBirth = this.shadowRoot.querySelector(
      'input-element[name="dateOfBirth"]'
    ).value;
    const phone = this.shadowRoot.querySelector(
      'input-element[name="phone"]'
    ).value;
    const email = this.shadowRoot.querySelector(
      'input-element[name="email"]'
    ).value;
    const department = this.shadowRoot.querySelector(
      'select-box[name="department"]'
    ).value;
    const position = this.shadowRoot.querySelector(
      'select-box[name="position"]'
    ).value;

    let validationArray = [];

    if (!firstName) validationArray.push(t('firstName'));
    if (!lastName) validationArray.push(t('lastName'));
    if (!dateOfEmployment) validationArray.push(t('dateOfEmployment'));
    if (!dateOfBirth) validationArray.push(t('dateOfBirth'));
    if (!phone) validationArray.push(t('phone'));
    if (!email) validationArray.push(t('email'));
    if (!department) validationArray.push(t('department'));
    if (!position) validationArray.push(t('position'));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      validationArray.push(t('invalidEmail'));
    }

    const phoneRegex = /^\d{10,11}$/;
    if (phone && !phoneRegex.test(phone)) {
      validationArray.push(t('invalidPhone'));
    }

    if (validationArray.length) {
      this.validationError = validationArray;
      return;
    }

    if (validationArray.length > 0) {
      this.validationError = validationArray;
      return;
    }

    this.newEmployeeData = {
      id: this.employee?.id || Date.now(),
      firstName,
      lastName,
      dateOfEmployment,
      dateOfBirth,
      phone,
      email,
      department,
      position,
    };

    if (this.employee) {
      console.log('object');
      this.confirmModal = true;
    } else {
      store.dispatch(addEmployee(this.newEmployeeData));
      Router.go('/');
    }
  };

  handleCancel = (e) => {
    e.preventDefault();
    Router.go('/');
  };

  handleConfirmResult = () => {
    this.validationError = [];
  };

  handleConfirmEdit = (event) => {
    const {confirmed} = event.detail;
    this.confirmModal = false;
    if (this.newEmployeeData && confirmed) {
      store.dispatch(editEmployee(this.newEmployeeData));
      Router.go('/');
    }
  };

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
      <form @submit=${this.handleSubmit}>
        <div class="form-container">
          <div class="form-item">
            <input-element
              name="firstName"
              label=${t('firstName')}
              .value=${''}
            ></input-element>
          </div>
          <div class="form-item">
            <input-element
              name="lastName"
              label=${t('lastName')}
              .value=${''}
            ></input-element>
          </div>
          <div class="form-item">
            <input-element
              name="dateOfEmployment"
              type="date"
              label=${t('dateOfEmployment')}
              .value=${''}
            ></input-element>
          </div>

          <div class="form-item">
            <input-element
              name="dateOfBirth"
              type="date"
              label=${t('dateOfBirth')}
              .value=${''}
            ></input-element>
          </div>
          <div class="form-item">
            <input-element
              name="phone"
              type="tel"
              label=${t('phone')}
              .value=${''}
            ></input-element>
          </div>
          <div class="form-item">
            <input-element
              name="email"
              label=${t('email')}
              .value=${''}
            ></input-element>
          </div>
          <div class="form-item">
            <select-box
              name="department"
              label=${t('department')}
              .options=${[
                {value: 'softwareDeveloper', label: t('softwareDeveloper')},
                {value: 'dataAnalyst', label: t('dataAnalyst')},
                {value: 'projectManager', label: t('projectManager')},
                {value: 'hrSpecialist', label: t('hrSpecialist')},
                {
                  value: 'marketing-specialist',
                  label: t('marketingSpecialist'),
                },
              ]}
              .value=${''}
            ></select-box>
          </div>
          <div class="form-item">
            <select-box
              name="position"
              label=${t('position')}
              .options=${[
                {value: 'junior', label: t('junior')},
                {value: 'medior', label: t('medior')},
                {value: 'senior', label: t('senior')},
              ]}
              .value=${''}
            ></select-box>
          </div>
        </div>
        <div class="form-buttons-wrapper">
          <button-element
            type="submit"
            variant="primary"
            label=${t('save')}
          ></button-element>
          <button-element
            @button-click=${(e) => this.handleCancel(e)}
            variant="secondary"
            label=${t('cancel')}
          ></button-element>
        </div>
      </form>
      ${this.validationError
        ? html`
            <modal-element
              .open=${this.validationError.length > 0}
              title=${t('fillBlank')}
              message="${this.validationError.map((x) => x + ' ') +
              '' +
              t('validationDesc')}"
              confirmText=${t('ok')}
              @confirm-result=${this.handleConfirmResult}
            ></modal-element>
          `
        : ''}
      ${this.confirmModal
        ? html`
            <modal-element
              .open=${this.confirmModal}
              title=${t('areYouSure')}
              message="${t(
                'editDesc',
                this.employee.firstName + ' ' + this.employee.lastName
              )}"
              confirmText=${t('ok')}
              cancelText=${t('cancel')}
              @confirm-result=${this.handleConfirmEdit}
            ></modal-element>
          `
        : ''}
    `;
  }
}

window.customElements.define('employee-add-edit-form', EmployeeAddEditForm);
