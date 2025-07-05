import {LitElement, html} from 'lit';

//styles
import {dashboardHeaderStyles} from './dashborad-styles';

//components
import './header/header-page-name';
import './header/header-navbar';

class DashboarHeader extends LitElement {
  static properties = {
    activeRoute: {type: String},
    activeLang: {type: String},
  };

  constructor() {
    super();
    this.activeLang = document.documentElement.lang || 'en';
    this.activeRoute = window.location.pathname;

    window.addEventListener('popstate', () => {
      this.activeRoute = window.location.pathname;
    });
  }

  static styles = dashboardHeaderStyles;

  render() {
    const IngLogo = new URL('../../assets/images/ing-logo.png', import.meta.url)
      .href;

    return html` <header>
      <div class="navbar">
        <div class="logoWrapper">
          <img src="${IngLogo}" alt="Ing" />
          <h3>ING</h3>
        </div>
        <header-navbar></header-navbar>
      </div>
      <header-page-name activeRoute="${this.activeRoute}"></header-page-name>
    </header>`;
  }
}

customElements.define('dashboard-header', DashboarHeader);
