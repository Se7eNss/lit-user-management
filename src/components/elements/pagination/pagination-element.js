import {LitElement, html} from 'lit';

//styles
import {PaginationStyles} from './pagination-element-styles';

//icons
import '../../icons/greater-icon';
import '../../icons/less-icon';

export class Pagination extends LitElement {
  static properties = {
    totalItems: {type: Number},
    pageSize: {type: Number},
    currentPage: {type: Number},
  };

  constructor() {
    super();
    this.totalItems = 0;
    this.pageSize = 10;
    this.currentPage = 1;
  }

  static styles = PaginationStyles;

  get totalPages() {
    if (this.totalItems === 0 || this.pageSize === 0) {
      return 0;
    }
    return Math.ceil(this.totalItems / this.pageSize);
  }

  _goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.dispatchEvent(
        new CustomEvent('page-change', {
          detail: {page: pageNumber},
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  render() {
    const hasPagination = this.totalPages > 1;

    if (!hasPagination) {
      return html``;
    }

    return html`
      <button
        @click=${() => this._goToPage(this.currentPage - 1)}
        ?disabled=${this.currentPage === 1}
      >
        <greater-icon size="20" strokeColor="primary"></greater-icon>
      </button>

      <div class="page-numbers">
        ${Array.from({length: this.totalPages}, (_, i) => i + 1).map(
          (page) => html`
            <button
              class="${this.currentPage === page
                ? 'page-number active'
                : 'page-number'}"
              @click=${() => this._goToPage(page)}
            >
              ${page}
            </button>
          `
        )}
      </div>

      <button
        @click=${() => this._goToPage(this.currentPage + 1)}
        ?disabled=${this.currentPage === this.totalPages}
      >
        <less-icon size="20" strokeColor="primary"></less-icon>
      </button>
    `;
  }
}
customElements.define('pagination-element', Pagination);
