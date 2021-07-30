const color = {
  yellow: '#FFD25F',
  blackScale: {
    50: '#000000',
    500: '#262626',
  },
  red: '#F2453B',
  white: '#FFFFFF',
  grayScale: {
    50: '#F2F2F2',
    250: '#E5E5E5',
    500: '#C4C4C4',
  },
};

const typography = {
  bodySmRegular: `
    font-size: 1.2rem;
    font-weight: normal;
  `,
  bodySmBold: `
    font-size: 1.2rem;
    font-weight: bold;
  `,
  bodyRg: `
    font-size: 1.4rem;
    font-weight: normal;
  `,
  bodyRgBold: `
    font-size: 1.4rem;
    font-weight: bold;
  `,
  headRg: `
    font-size: 1.8rem;
    font-weight: normal;
  `,
  headRgBold: `
    font-size: 1.8rem;
    font-weight: bold;
  `,
};

export type Theme = typeof theme;

const theme = {
  color,
  typography,
};

export default theme;
