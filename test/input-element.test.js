import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import '../src/components/elements/input/input-element';

describe('<input-element>', () => {
  it('renders with label and placeholder', async () => {
    const el = await fixture(html`
      <input-element
        name="testInput"
        label="deneme"
        placeholder="deneme"
      ></input-element>
    `);

    const label = el.shadowRoot.querySelector('label');
    const input = el.shadowRoot.querySelector('input');

    expect(label).to.exist;
    expect(label.textContent).to.include('deneme');
    expect(input.placeholder).to.equal('deneme');
  });

  it('renders a normal text input by default', async () => {
    const el = await fixture(html`<input-element name="test" />`);
    const input = el.shadowRoot.querySelector('input');
    expect(input.type).to.equal('text');
  });

  it('renders a date input with calendar icon when type is "date"', async () => {
    const el = await fixture(html`
      <input-element name="birthDate" type="date"></input-element>
    `);

    const input = el.shadowRoot.querySelector('input');
    const icon = el.shadowRoot.querySelector('calendar-icon');

    expect(input.type).to.equal('date');
    expect(icon).to.exist;
  });

  it('emits "input-changed" event with correct detail on input', async () => {
    const el = await fixture(html`
      <input-element name="username"></input-element>
    `);

    const input = el.shadowRoot.querySelector('input');
    input.value = 'Oğuzhan';
    setTimeout(() => input.dispatchEvent(new Event('input')));

    const event = await oneEvent(el, 'input-changed');
    expect(event.detail).to.deep.equal({
      name: 'username',
      value: 'Oğuzhan',
    });
  });
});
