import {css} from 'lit';

export const FormStyles = css`
  :host {
    display: block;
    padding: 20px;

    background-color: var(--color-white);
  }

  .form-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    width: 100%;
  }

  .form-item {
  }

  .form-buttons-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 70px;

    margin-top: 100px;
  }

  @media only screen and (min-width: 600px) {
    :host {
      padding: 30px;
    }
    .form-container {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }
  @media only screen and (min-width: 900px) {
    :host {
      padding: 40px 100px;
    }
    .form-container {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 70px;
      column-gap: 130px;
    }
  }
`;
