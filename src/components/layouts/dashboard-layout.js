import {LitElement, html} from 'lit';
import './dashboard-header';
import {dashboardStyles} from './dashborad-styles';

export class DashboardLayout extends LitElement {
  static styles = dashboardStyles;

  render() {
    return html`
      <dashboard-header></dashboard-header>
      <main>
        <slot></slot>
      </main>
    `;
  }
}

customElements.define('dashboard-layout', DashboardLayout);
