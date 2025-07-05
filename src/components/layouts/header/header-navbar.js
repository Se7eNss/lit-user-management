import {LitElement, html} from 'lit';

//consts
import {MenuItems} from '../../../config/constants';

//styles
import {NavbarStyles} from './header-styles';

//utils
import {setLocale} from '../../../utils/localization';
import {t} from '../../../utils/localization';
import {localeLang} from '../../../utils/localization';

//icons
import '../../icons/employee-icon';
import '../../icons/plus-icon';
import '../../icons/tr-icon';
import '../../icons/uk-icon';

class HeaderNavbar extends LitElement {
  static properties = {
    activeRoute: {type: String},
    activeLang: {type: String},
  };

  constructor() {
    super();
    this.activeLang = localStorage.getItem(localeLang);
    this.activeRoute = window.location.pathname;

    window.addEventListener('popstate', () => {
      this.activeRoute = window.location.pathname;
    });
  }

  static styles = NavbarStyles;

  changeLang = () => {
    const newLang = this.activeLang === 'tr' ? 'en' : 'tr';
    setLocale(newLang);
    this.activeLang = newLang;
  };

  render() {
    const iconSelector = (icon) => {
      if (icon === 'employee-icon') {
        return html`<employee-icon
          strokeColor="primary"
          size="18"
        ></employee-icon>`;
      } else if (icon === 'plus-icon') {
        return html`<plus-icon strokeColor="primary" size="18"></plus-icon>`;
      } else {
        return html``;
      }
    };

    return html`
      <nav class="navMenu">
        <ul class="navMenuList">
          ${MenuItems.filter((x) => x.visible !== false).map(
            (menu) => html`
              <li class="${this.activeRoute === menu.href ? 'active' : ''}">
                ${iconSelector(menu.icon)}
                <a href="${menu.href}">${t(menu.title)}</a>
              </li>
            `
          )}
          <button @click=${this.changeLang} class="langButton">
            ${this.activeLang === 'tr'
              ? html`<uk-icon></uk-icon> `
              : html`<tr-icon></tr-icon>`}
          </button>
        </ul>
      </nav>
    `;
  }
}

customElements.define('header-navbar', HeaderNavbar);
