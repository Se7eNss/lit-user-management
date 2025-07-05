import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import '../src/components/elements/select/select-box'; // path'ini kendi yapına göre ayarla

describe('select-box', () => {
  const options = [
    {label: 'Option A', value: 'a'},
    {label: 'Option B', value: 'b'},
  ];

  it('renders with label', async () => {
    const el = await fixture(html`
      <select-box label="Test Label" .options=${options}></select-box>
    `);

    expect(el.shadowRoot.textContent).to.include('Test Label');
  });

  it('sets and gets value properly', async () => {
    const el = await fixture(html`
      <select-box .options=${options}></select-box>
    `);

    el.value = 'b';
    await el.updateComplete;

    expect(el.value).to.equal('b');
    expect(el.shadowRoot.textContent).to.include('Option B');
  });

  it('opens and closes dropdown on toggle', async () => {
    const el = await fixture(html`
      <select-box .options=${options}></select-box>
    `);

    const selected = el.shadowRoot.querySelector('.selected');
    selected.click();
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(el.shadowRoot.querySelector('.dropdown')).to.exist;

    selected.click();
    await el.updateComplete;

    expect(el.open).to.be.false;
    expect(el.shadowRoot.querySelector('.dropdown')).to.be.null;
  });

  it('fires "select-changed" with correct payload when option selected', async () => {
    const el = await fixture(html`
      <select-box name="mySelect" .options=${options}></select-box>
    `);

    el.toggleDropdown();
    await el.updateComplete;

    const optionToClick = el.shadowRoot.querySelectorAll('.option')[1];
    setTimeout(() => optionToClick.click());

    const event = await oneEvent(el, 'select-changed');
    expect(event.detail).to.deep.equal({name: 'mySelect', value: 'b'});
    expect(el.value).to.equal('b');
    expect(el.open).to.be.false;
  });
});
