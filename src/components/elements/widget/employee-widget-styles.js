import {css} from 'lit';

import {fontSize, fontWeight} from '../../../utils/font-size';

export const WidgetStyles = css`
  :host {
    display: block;
    margin-bottom: 1rem;
    padding: 20px;
    border: 1px solid var(--color-stroke-default);
    background-color: var(--color-white);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .employee-widget {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    width: 100%;
  }

  @media only screen and (min-width: 600px) {
    .employee-widget {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 4px;
  }

  .title {
    ${fontSize({size: 16, lineHeight: 20, weight: fontWeight.light})};
    color: var(--color-stroke-default);
  }
  .value {
    ${fontSize({size: 16, lineHeight: 20, weight: fontWeight.light})};
  }

  .actionButtonsWrapper {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 14px;
  }

  .actionButton {
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 8px;

    border: none;
    background-color: var(--color-secondary);

    border-radius: 8px;

    cursor: pointer;

    transition: opacity 0.3s ease;

    opacity: 1;

    &:hover {
      opacity: 0.9;
    }
  }

  .deleteColor {
    background-color: var(--color-primary);
  }

  .buttonText {
    ${fontSize({size: 14, lineHeight: 16, weight: fontWeight.regular})};

    color: var(--color-white);
  }
`;
