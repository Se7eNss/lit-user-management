import {css} from 'lit';

import {fontSize, fontWeight} from '../../../utils/font-size';

export const ModalStyles = css`
  :host {
    display: block;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }

  .modal-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 90%;

    transform: translateY(10px);
    opacity: 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .modal-overlay.open .modal-content {
    transform: translateY(0);
    opacity: 1;
  }

  .modal-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    ${fontSize({
      size: 20,
      lineHeight: 22,
      align: 'left',
      weight: fontWeight.semiBold,
    })};
    color: var(--color-primary);
  }

  .modal-message {
    margin-bottom: 30px;

    ${fontSize({
      size: 14,
      lineHeight: 16,
      align: 'left',
      weight: fontWeight.light,
    })};
  }

  .modal-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  .crossButton {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    height: 100%;

    border: none;
    background-color: transparent;

    cursor: pointer;

    transition: opacity 0.3s ease;

    opacity: 1;

    &:hover {
      opacity: 0.8;
    }
  }

  @media only screen and (min-width: 600px) {
    .modal-content {
      width: 70%;
    }
  }
  @media only screen and (min-width: 1200px) {
    .modal-content {
      width: 27%;
    }
  }
`;
