import {css} from 'lit';

export const EmployeeWidgetStyles = css`
  .widgetWrapper {
    display: block;

    display: grid;
    grid-template-columns: 1fr;
    column-gap: 150px;
    row-gap: 30px;
    width: 100%;
    margin-bottom: 0;

    background-color: var(--color-bg);

    padding: 0 5%;

    width: 90%;
  }

  @media only screen and (min-width: 1100px) {
    .widgetWrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
