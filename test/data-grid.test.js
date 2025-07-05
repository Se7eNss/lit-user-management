import {fixture, html, expect} from '@open-wc/testing';
import '../src/components/elements/dataGrid/data-grid';

describe('<data-grid>', () => {
  let element;

  const mockData = Array.from({length: 20}, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
  }));

  const mockColumns = [{key: 'name'}];

  const mockRowActions = [
    {
      icon: 'edit',
      method: (item) => {
        item.edited = true;
      },
    },
  ];

  beforeEach(async () => {
    element = await fixture(html`
      <data-grid
        .data=${mockData}
        .columns=${mockColumns}
        .rowActions=${mockRowActions}
        .pageSize=${5}
        .currentPage=${1}
      ></data-grid>
    `);
  });

  it('renders 5 rows on first page', () => {
    const rows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(5);
    expect(rows[0].textContent).to.include('User 1');
  });

  it('renders pagination element', () => {
    const pagination = element.shadowRoot.querySelector('pagination-element');
    expect(pagination).to.exist;
    expect(pagination.totalItems).to.equal(20);
    expect(pagination.pageSize).to.equal(5);
    expect(pagination.currentPage).to.equal(1);
  });

  it('selects all visible rows when "select all" is checked', async () => {
    const selectAllCheckbox =
      element.shadowRoot.querySelector('thead check-box');
    selectAllCheckbox.checked = true;
    selectAllCheckbox.dispatchEvent(new Event('change'));
    await element.updateComplete;

    const visibleIds = mockData.slice(0, 5).map((d) => d.id);
    for (const id of visibleIds) {
      expect(element.selectedIds.has(id)).to.be.true;
    }

    expect(element.selectedIds.size).to.equal(20);
  });

  it('switches to page 2 correctly', async () => {
    const pagination = element.shadowRoot.querySelector('pagination-element');
    pagination.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {page: 2},
      })
    );
    await element.updateComplete;

    const rows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(rows[0].textContent).to.include('User 6');
  });
});
