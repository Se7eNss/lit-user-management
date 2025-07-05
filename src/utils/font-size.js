// utils/fontSize.ts
import {unsafeCSS} from 'lit';

export const fontWeight = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

export const fontSize = ({size, lineHeight, letterSpacing, align, weight}) => {
  const cssString = `
  
    ${size ? `font-size: ${size}px;` : ''}
    ${lineHeight ? `line-height: ${lineHeight}px;` : ''}
    ${letterSpacing ? `letter-spacing: ${letterSpacing}px;` : ''}
    ${align ? `text-align: ${align};` : ''}
    ${weight ? `font-weight: ${weight};` : ''}
    ${weight ? `font-variation-settings: "wght" ${weight};` : ''}
  `;

  return unsafeCSS(cssString);
};
