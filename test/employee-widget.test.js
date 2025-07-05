import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/elements/widget/employee-widget';
import {t} from '../src/utils/localization';

describe('<employee-widget>', () => {
  const columns = [
    {key: 'firstName'},
    {key: 'lastName'},
    {key: 'dateOfEmployment'},
    {key: 'dateOfBirth'},
    {key: 'phone'},
    {key: 'email'},
    {key: 'department'},
    {key: 'position'},
  ];

  const employee = {
    id: 1,
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    dateOfEmployment: '2020-01-15',
    dateOfBirth: '1990-05-20',
    phone: '5551234567',
    email: 'ahmet@example.com',
    department: 'softwareDeveloper',
    position: 'junior',
  };

  const editMethod = sinon.spy();
  const deleteMethod = sinon.spy();

  const rowActions = [
    {icon: 'edit', method: editMethod},
    {icon: 'delete', method: deleteMethod},
  ];

  it('renders correctly with detailed employee data', async () => {
    const el = await fixture(html`
      <employee-widget
        .columns=${columns}
        .employee=${employee}
      ></employee-widget>
    `);

    const titles = el.shadowRoot.querySelectorAll('.title');
    expect(titles.length).to.equal(columns.length);
    columns.forEach((col, i) => {
      console.log(titles[i].textContent);
      expect(titles[i].textContent).to.equal(t(col.key));
    });

    const values = el.shadowRoot.querySelectorAll('.value');
    expect(values.length).to.equal(columns.length);
    expect(values[0].textContent.trim()).to.equal('Ahmet');
    expect(values[1].textContent.trim()).to.equal('Yılmaz');
    expect(values[2].textContent.trim()).to.equal('2020-01-15');
    expect(values[3].textContent.trim()).to.equal('1990-05-20');
    expect(values[4].textContent.trim()).to.equal('5551234567');
    expect(values[5].textContent.trim()).to.equal('ahmet@example.com');
    expect(values[6].textContent.trim()).to.equal('Software Developer');
    expect(values[7].textContent.trim()).to.equal('Junior');
  });

  it('renders action buttons and calls methods on click', async () => {
    const el = await fixture(html`
      <employee-widget
        .columns=${columns}
        .employee=${employee}
        .rowActions=${rowActions}
      ></employee-widget>
    `);

    const buttons = el.shadowRoot.querySelectorAll('button.actionButton');
    expect(buttons.length).to.equal(2);

    buttons[0].click();
    expect(editMethod.calledOnce).to.be.true;
    expect(editMethod.calledWith(employee)).to.be.true;

    buttons[1].click();
    expect(deleteMethod.calledOnce).to.be.true;
    expect(deleteMethod.calledWith(employee)).to.be.true;
  });

  it('updates when locale-changed event is fired', async () => {
    const el = await fixture(html`
      <employee-widget
        .columns=${columns}
        .employee=${employee}
      ></employee-widget>
    `);

    const updateSpy = sinon.spy(el, 'requestUpdate');
    window.dispatchEvent(new CustomEvent('locale-changed'));
    await el.updateComplete;

    expect(updateSpy.called).to.be.true;

    updateSpy.restore();
  });
});
