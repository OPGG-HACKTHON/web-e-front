import './font.css';

export const color = {
  brown: '#1D1400',
  yellow: '#FFD25F',
  blackScale: {
    50: '#000000',
    500: '#262626',
  },
  red: '#F2453B',
  white: '#FFFFFF',
  grayScale: {
    50: '#F2F2F2',
    100: '#B2B2B2',
    250: '#E5E5E5',
    500: '#C4C4C4',
  },
};

export const typography = {
  bodySmRegular: `
    font-size: 1.2rem;
    font-weight: normal;
    font-family:NotoSansKR-Regular;
  `,
  bodySmBold: `
    font-size: 1.2rem;
    font-weight: bold;
    font-family:NotoSansKR-Bold;
  `,
  bodyRg: `
    font-size: 1.4rem;
    font-weight: normal;
    font-family:NotoSansKR-Regular;
  `,
  bodyRgBold: `
    font-size: 1.4rem;
    font-weight: bold;
    font-family:NotoSansKR-Bold;
  `,
  headRg: `
    font-size: 1.8rem;
    font-weight: normal;
    font-family:NotoSansKR-Regular;
  `,
  headRgBold: `
    font-size: 1.8rem;
    font-weight: bold;
    font-family:NotoSansKR-Bold;
  `,
};

export type Theme = typeof theme;

const theme = {
  color,
  typography,
};

export default theme;
