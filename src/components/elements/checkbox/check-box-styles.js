import {css} from 'lit';

export const CheckBoxStyles = css`
  .custom-checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .custom-checkbox input[type='checkbox'] {
    display: none;
  }

  .custom-checkbox .checkmark {
    width: 16px;
    height: 16px;
    border-radius: 6px;
    background-color: white;
    border: 2px solid var(--color-stroke-default);
    position: relative;
  }

  .custom-checkbox input[type='checkbox']:checked + .checkmark {
    background-color: var(--color-primary);
  }

  .custom-checkbox input[type='checkbox']:checked + .checkmark::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 5px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
