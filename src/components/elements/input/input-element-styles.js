import {css} from 'lit';

import {fontSize, fontWeight} from '../../../utils/font-size';

export const InputStyles = css`
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

  input[type='text'],
  input[type='tel'],
  input[type='email'],
  input[type='date'] {
    padding: 10px;

    border: 1px solid var(--color-border);
    border-radius: 4px;
    box-sizing: border-box;
    background-color: var(--color-white);

    ${fontSize({size: 14, lineHeight: 18, weight: 100})};

    transition: all 0.3s ease;
  }

  input[type='text']:focus,
  input[type='tel']:focus,
  input[type='email']:focus,
  input[type='date']:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 18%;
    width: 20px;
    height: 100%;
  }
  .date-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .date-wrapper input {
    width: 100%;
    padding-right: 32px;
  }

  .calendar-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--primary-color);
    user-select: none;
  }
`;
