import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import '../src/components/elements/modal/modal-element';

describe('modal-element', () => {
  it('renders with provided title, message and buttons', async () => {
    const el = await fixture(html`
      <modal-element
        open
        title="Test Title"
        message="Test Message"
        confirmText="Confirm"
        cancelText="Cancel"
      ></modal-element>
    `);

    expect(el.shadowRoot.querySelector('.modal-title').textContent).to.include(
      'Test Title'
    );
    expect(
      el.shadowRoot.querySelector('.modal-message').textContent
    ).to.include('Test Message');
    expect(el.shadowRoot.textContent).to.include('Confirm');
    expect(el.shadowRoot.textContent).to.include('Cancel');
  });

  it('fires "confirm-result" event with true when confirm is clicked', async () => {
    const el = await fixture(html`
      <modal-element
        open
        title="Confirm Test"
        confirmText="Yes"
      ></modal-element>
    `);

    const confirmButton = el.shadowRoot.querySelector('button-element');
    setTimeout(() => confirmButton.click());
    const event = await oneEvent(el, 'confirm-result');

    expect(event.detail.confirmed).to.be.true;
  });

  it('fires "confirm-result" event with false when cancel is clicked', async () => {
    const el = await fixture(html`
      <modal-element
        open
        title="Cancel Test"
        confirmText="Yes"
        cancelText="No"
      ></modal-element>
    `);

    const buttons = el.shadowRoot.querySelectorAll('button-element');
    const cancelButton = buttons[1];
    setTimeout(() => cancelButton.click());
    const event = await oneEvent(el, 'confirm-result');

    expect(event.detail.confirmed).to.be.false;
  });
});
