import {css} from 'lit';
import {fontSize, fontWeight} from '../../../utils/font-size';

export const PaginationStyles = css`
  :host {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 10px 0;
    background-color: var(--color-bg);
    flex-wrap: wrap; /* Mobilde alt alta geçebilmesi için */
  }

  button {
    background-color: transparent;
    border: none;
    padding: 6px 10px;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  button:hover:not([disabled]) {
    border-color: #0056b3;
  }

  button[disabled] {
    svg {
      fill: var(--color-stroke-default);
    }
    cursor: not-allowed;
  }

  .page-numbers {
    display: flex;
    gap: 4px;
    flex-wrap: wrap; /* Küçük ekranlarda taşmasın diye */
    justify-content: center;
  }

  .page-number {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 3px;
    height: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .page-numbers button {
    background-color: transparent;
    ${fontSize({size: 16, lineHeight: 18, weight: fontWeight.medium})};
    color: var(--color-text);
    border-radius: 50%;
    min-width: 32px;
    min-height: 32px;
  }

  .page-numbers button:hover:not([disabled]) {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .page-numbers button.active {
    background-color: var(--color-primary);
    color: white;
  }

  span {
    font-size: 0.9em;
    color: #555;
  }

  /* Responsive ayarlar */
  @media (max-width: 768px) {
    :host {
      gap: 8px;
      padding: 8px 0;
      flex-direction: column;
    }

    .page-numbers {
      gap: 6px;
    }

    .page-numbers button {
      ${fontSize({size: 14, lineHeight: 16, weight: fontWeight.medium})};
      min-width: 28px;
      min-height: 28px;
    }

    button {
      padding: 5px 8px;
    }
  }

  @media (max-width: 480px) {
    .page-numbers button {
      ${fontSize({size: 12, lineHeight: 14, weight: fontWeight.medium})};
      min-width: 24px;
      min-height: 24px;
    }

    button {
      padding: 4px 6px;
    }

    span {
      font-size: 0.8em;
    }
  }
`;
