import {css} from 'lit';

import {fontSize, fontWeight} from '../../../utils/font-size';

export const NavbarStyles = css`
  .navMenu {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;

    padding-right: 12px;
  }

  .navMenuList {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 18px;

    margin: 0;
    padding: 0;

    height: 100%;
  }
  .navMenu li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;

    opacity: 0.6;

    transition: opacity 0.3s ease;
  }

  .navMenu li:hover {
    opacity: 0.9;
  }

  .navMenu li.active {
    opacity: 1 !important;
  }

  .navMenu a {
    ${fontSize({size: 14, lineHeight: 18, weight: fontWeight.medium})};
    color: var(--color-primary);
    text-decoration: none;
  }

  .langButton {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    margin-top: 3px;

    height: 100%;

    border: none;
    background-color: transparent;

    cursor: pointer;
  }
`;

export const PageNameStyles = css`
  .pageNameWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 40px;

    background-color: var(--color-bg);
  }
  .pageName {
    ${fontSize({size: 30, lineHeight: 34, weight: fontWeight.medium})};
    color: var(--color-primary);
  }

  .listTypeSwitchWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .listTypeSwitchButton {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    height: 100%;

    border: none;
    background-color: transparent;

    cursor: pointer;

    transition: opacity 0.3s ease;

    opacity: 0.5;

    &:hover {
      opacity: 0.8;
    }
  }

  .activeButton {
    opacity: 1 !important;
  }
`;
