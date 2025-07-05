import {css} from 'lit';

import {fontSize, fontWeight} from '../../../utils/font-size';

export const SelectBoxStyles = css`
  :host {
    display: block;
    margin-bottom: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 10px;

    ${fontSize({size: 16, lineHeight: 20, weight: fontWeight.light})};
  }
  .select-wrapper {
    position: relative;
    width: 100%;
  }
  .selected {
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: var(--color-white);
    cursor: pointer;

    transition: all 0.3s ease;
  }
  .focus {
    border: 1px solid var(--color-primary);
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0px;
    width: 99%;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    max-height: 150px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .option {
    padding: 10px;
    cursor: pointer;

    transition: all 0.3s ease;
  }
  .active {
    color: var(--color-white);
    background: var(--color-primary-40);
  }

  .option:hover {
    color: var(--color-white);
    background: var(--color-primary-30);
  }

  .select-wrapper::after {
    content: '▾';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-border);
    font-size: 20px;
    pointer-events: none;
  }
`;
