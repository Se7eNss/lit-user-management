import {LitElement, html} from 'lit';

//consts
import {MenuItems} from '../../../config/constants';

//redux
import {changeListType} from '../../../redux/reducers/employeeSlice.js';
import {store} from '../../../redux/store.js';

//styles
import {PageNameStyles} from './header-styles';

//utils
import {t} from '../../../utils/localization';

//icons
import '../../icons/list-icon';
import '../../icons/widgets-icon';

class HeaderPageName extends LitElement {
  static properties = {
    activeRoute: {type: String},
    listType: {type: String},
  };

  constructor() {
    super();
    this.activeRoute = '/';
    this.listType = 'list';
  }

  static styles = PageNameStyles;

  connectedCallback = () => {
    super.connectedCallback();

    this._unsubscribe = store.subscribe(() => this._onStateChange());

    this._onStateChange();
  };

  _onStateChange = () => {
    const listType = store.getState().common.listType;
    this.listType = listType;
  };

  disconnectedCallback = () => {
    super.disconnectedCallback();
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  };

  changeListType = (type) => {
    store.dispatch(changeListType(type));
  };

  render() {
    const basePath = '/' + this.activeRoute.split('/')[1];
    const activeMenu = MenuItems.find((menu) => menu.href === basePath);

    return html` <div class="pageNameWrapper">
      <h3 class="pageName">${t(activeMenu?.title || '')}</h3>
      ${activeMenu.hasDataGrid
        ? html` <div class="listTypeSwitchWrapper">
            <button
              @click=${() => this.changeListType('list')}
              class=${`listTypeSwitchButton ${
                this.listType === 'list' ? 'activeButton' : ''
              }`}
            >
              <list-icon></list-icon>
            </button>
            <button
              @click=${() => this.changeListType('widget')}
              class=${`listTypeSwitchButton ${
                this.listType === 'widget' ? 'activeButton' : ''
              }`}
            >
              <widget-icon></widget-icon>
            </button>
          </div>`
        : undefined}
    </div>`;
  }
}

customElements.define('header-page-name', HeaderPageName);
