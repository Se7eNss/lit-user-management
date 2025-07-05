import {fixture, html, expect} from '@open-wc/testing';
import '../../src/components/icons/list-icon.js';

describe('<list-icon>', () => {
  it('renders the SVG element', async () => {
    const el = await fixture(html`<list-icon></list-icon>`);
    const svg = el.shadowRoot.querySelector('svg');
    expect(svg).to.exist;
  });

  it('renders 3 <path> elements', async () => {
    const el = await fixture(html`<list-icon></list-icon>`);
    const paths = el.shadowRoot.querySelectorAll('svg path');
    expect(paths.length).to.equal(3);
  });

  it('has default width and height attributes set to 33', async () => {
    const el = await fixture(html`<list-icon></list-icon>`);
    const svg = el.shadowRoot.querySelector('svg');
    expect(svg.getAttribute('width')).to.equal('33');
    expect(svg.getAttribute('height')).to.equal('33');
  });

  it('has correct viewBox attribute', async () => {
    const el = await fixture(html`<list-icon></list-icon>`);
    const svg = el.shadowRoot.querySelector('svg');
    expect(svg.getAttribute('viewBox')).to.equal('2 1 100 100');
  });
});
