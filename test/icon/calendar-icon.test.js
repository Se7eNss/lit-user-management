import {fixture, html, expect} from '@open-wc/testing';
import '../../src/components/icons/calendar-icon.js';

describe('<calendar-icon>', () => {
  it('renders svg-icon with correct props', async () => {
    const el = await fixture(
      html`<calendar-icon strokeColor="red" size="32"></calendar-icon>`
    );
    const svgIcon = el.shadowRoot.querySelector('svg-icon');

    expect(svgIcon).to.exist;
    expect(svgIcon.getAttribute('pathData')).to.be.a('string');
    expect(svgIcon.getAttribute('viewBox')).to.equal('0 0 24 24');
    expect(svgIcon.strokeColor).to.equal('red');
    expect(svgIcon.size).to.equal(32);
  });

  it('matches snapshot', async () => {
    const el = await fixture(html`<calendar-icon></calendar-icon>`);
    expect(el).shadowDom.to.equalSnapshot();
  });
});
