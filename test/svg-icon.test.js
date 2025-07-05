import {fixture, html, expect} from '@open-wc/testing';
import '../src/components/elements/icon/svg-icon'; // kendi dosya yolunu yaz

describe('<svg-icon>', () => {
  it('renders an SVG with default properties', async () => {
    const el = await fixture(
      html`<svg-icon pathData="M0 0h24v24H0z"></svg-icon>`
    );
    const svg = el.shadowRoot.querySelector('svg');
    const path = svg.querySelector('path');

    expect(svg).to.exist;
    expect(svg.getAttribute('width')).to.equal('16');
    expect(svg.getAttribute('height')).to.equal('16');
    expect(svg.getAttribute('viewBox')).to.equal('0 0 24 24');
    expect(svg.getAttribute('stroke')).to.equal('currentColor');
    expect(path.getAttribute('d')).to.equal('M0 0h24v24H0z');
  });

  it('uses CSS variable if strokeColor is not hex', async () => {
    const el = await fixture(
      html`<svg-icon pathData="M0 0h24v24H0z" strokeColor="primary"></svg-icon>`
    );
    const svg = el.shadowRoot.querySelector('svg');
    expect(svg.getAttribute('stroke')).to.equal('var(--color-primary)');
  });

  it('uses given hex strokeColor directly', async () => {
    const el = await fixture(
      html`<svg-icon pathData="M0 0h24v24H0z" strokeColor="#ff0000"></svg-icon>`
    );
    const svg = el.shadowRoot.querySelector('svg');
    expect(svg.getAttribute('stroke')).to.equal('#ff0000');
  });

  it('renders with custom size and viewBox', async () => {
    const el = await fixture(html`
      <svg-icon
        pathData="M0 0h10v10H0z"
        size="32"
        viewBox="0 0 10 10"
      ></svg-icon>
    `);
    const svg = el.shadowRoot.querySelector('svg');
    expect(svg.getAttribute('width')).to.equal('32');
    expect(svg.getAttribute('height')).to.equal('32');
    expect(svg.getAttribute('viewBox')).to.equal('0 0 10 10');
  });
});
