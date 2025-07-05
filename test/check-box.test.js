import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import '../src/components/elements/checkbox/check-box'; // path'ini kendi yapına göre ayarla

describe('<check-box>', () => {
  it('renders the checkbox input', async () => {
    const el = await fixture(html`<check-box></check-box>`);
    const input = el.shadowRoot.querySelector('input[type="checkbox"]');
    expect(input).to.exist;
    expect(input.checked).to.be.false;
  });

  it('reflects the checked property correctly', async () => {
    const el = await fixture(html`<check-box checked></check-box>`);
    const input = el.shadowRoot.querySelector('input[type="checkbox"]');
    expect(el.checked).to.be.true;
    expect(input.checked).to.be.true;
  });

  it('toggles "checked" on click and dispatches "change" event', async () => {
    const el = await fixture(html`<check-box></check-box>`);
    const label = el.shadowRoot.querySelector('label');

    setTimeout(() => label.click());
    const event = await oneEvent(el, 'change');

    expect(event).to.exist;
    expect(event.detail.checked).to.be.true;
    expect(el.checked).to.be.true;
  });

  it('toggles off when clicked again', async () => {
    const el = await fixture(html`<check-box checked></check-box>`);
    const label = el.shadowRoot.querySelector('label');

    setTimeout(() => label.click());
    const event = await oneEvent(el, 'change');

    expect(event).to.exist;
    expect(event.detail.checked).to.be.false;
    expect(el.checked).to.be.false;
  });
});
