import {css} from 'lit';

import {fontSize, fontWeight} from '../../../utils/font-size';

export const ButtonStyles = css`
  button {
    padding: 10px 16px;

    width: 300px;
    height: 45px;

    border: none;
    border-radius: 6px;
    cursor: pointer;

    ${fontSize({size: 16, lineHeight: 20, weight: fontWeight.light})};

    opacity: 1;
    transition: all 0.2s ease;
  }

  button:hover:not(:disabled) {
    opacity: 0.8;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button.primary {
    background-color: var(--color-primary, #007bff);
    color: white;
  }

  button.secondary {
    background-color: transparent;
    color: var(--color-secondary);

    border: 1px solid var(--color-secondary);
  }

  button.modalButton {
    background-color: var(--color-primary, #007bff);
    color: white;
    height: 40px;
    width: 100%;
  }
  button.modalButtonSecondary {
    background-color: transparent;
    color: var(--color-secondary);

    border: 1px solid var(--color-secondary);
    height: 40px;
    width: 100%;
  }
`;
