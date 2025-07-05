import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import '../src/components/elements/button/button-element';

describe('<button-element>', () => {
  it('renders with default values', async () => {
    const el = await fixture(html`<button-element></button-element>`);
    const button = el.shadowRoot.querySelector('button');
    expect(button).to.exist;
    expect(button.type).to.equal('button');
    expect(button.disabled).to.be.false;
    expect(button.className).to.equal('primary');
  });

  it('dispatches "button-click" event on click', async () => {
    const el = await fixture(
      html`<button-element label="Click me"></button-element>`
    );
    setTimeout(() => el.shadowRoot.querySelector('button').click());
    const event = await oneEvent(el, 'button-click');
    expect(event).to.exist;
    expect(event.detail).to.have.property('originalEvent');
  });

  it('renders with a custom label', async () => {
    const customLabel = 'Send Data';
    const el = await fixture(
      html`<button-element label=${customLabel}></button-element>`
    );
    const button = el.shadowRoot.querySelector('button');
    expect(button.textContent.trim()).to.equal(customLabel);
  });

  it('sets the button type correctly', async () => {
    const el = await fixture(
      html`<button-element type="submit"></button-element>`
    );
    const button = el.shadowRoot.querySelector('button');
    expect(button.type).to.equal('submit');
  });

  it('sets the button variant correctly', async () => {
    const el = await fixture(
      html`<button-element variant="secondary"></button-element>`
    );
    const button = el.shadowRoot.querySelector('button');
    expect(button.className).to.equal('secondary');
  });
});
