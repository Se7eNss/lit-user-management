import {css} from 'lit';

import {fontSize, fontWeight} from '../../utils/font-size';

export const dashboardStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-bg);
  }

  main {
    margin: 0 40px;

    border-radius: 4px;
    min-height: calc(100vh - 240px);
  }
`;

export const dashboardHeaderStyles = css`
  header {
    display: flex;
    flex-direction: column;

    height: 150px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;

    padding-left: 4px;

    width: 100%;
    height: 40px;

    background-color: var(--color-white);
  }
  .logoWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;

    height: 100%;

    img {
      width: 40px;
      height: 40px;
    }

    h3 {
      margin: 0;

      ${fontSize({size: 14, lineHeight: 16, weight: fontWeight.medium})};
    }
  }
`;
