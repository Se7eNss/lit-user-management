import {css} from 'lit';
import {fontSize, fontWeight} from '../../../utils/font-size';

export const DataGridStyles = css`
  .wrapper {
    background-color: var(--color-white);
    overflow-x: auto; /* Tüm tablo için yatay scroll */
  }

  table {
    width: 100%;
    min-width: 600px; /* Tablo içeriğinin dar ekranlarda taşmaması için */
    border-collapse: collapse;
  }

  th,
  td {
    border-bottom: 1px solid var(--color-stroke-default);
    padding: 18px 6px;
    text-align: center;
  }

  th {
    ${fontSize({size: 14, lineHeight: 16, weight: fontWeight.regular})};
    color: var(--color-primary);
  }

  tr {
    ${fontSize({size: 14, lineHeight: 16, weight: fontWeight.regular})};
  }

  .selectBoxCell {
    width: 60px;
    text-align: center;
  }

  .actionButtonsWrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .actionButton {
    display: flex;
    align-items: center;
    height: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: opacity 0.3s ease;
    opacity: 0.7;
  }

  .actionButton:hover {
    opacity: 1;
  }

  /* Responsive davranışlar */
  @media (max-width: 768px) {
    table {
      min-width: unset;
    }

    th,
    td {
      padding: 12px 4px;
      font-size: 12px;
    }

    .selectBoxCell {
      width: 40px;
    }

    .actionButtonsWrapper {
      flex-direction: column;
      gap: 4px;
    }

    .wrapper {
      overflow-x: auto;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      font-size: 11px;
      padding: 10px 2px;
    }

    .actionButton {
      font-size: 11px;
    }
  }
`;
