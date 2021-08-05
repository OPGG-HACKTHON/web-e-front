import './font.css';

const calcRem = (size: any) => `${size / 16}rem`;

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

const paddings = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const margins = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const interval = {
  base: calcRem(50),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200),
};

const verticalInterval = {
  base: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

const deviceSizes = {
  mobile: '450px',
  laptop: '1024px',
};

const device = {
  mobile: `only screen and (max-width: ${deviceSizes.mobile})`,
  laptop: `only screen and (max-width: ${deviceSizes.laptop})`,
};

export type Theme = typeof theme;

const theme = {
  color,
  typography,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
};

export default theme;
