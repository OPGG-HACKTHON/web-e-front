import './font.css';

const calcRem = (size: any) => `${size}rem`;

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
  xxs: calcRem(0.4),
  // 10px
  xs: calcRem(1),
  small: calcRem(1.5),
  base: calcRem(2),
  lg: calcRem(3),
  xl: calcRem(4),
  xxl: calcRem(5),
};

const margins = {
  xxs: calcRem(0.4),
  // 10px
  xs: calcRem(1),
  small: calcRem(1.5),
  base: calcRem(2),
  lg: calcRem(3),
  xl: calcRem(4),
  xxl: calcRem(5),
};

const interval = {
  xxs: calcRem(0.4),
  // 10px
  xs: calcRem(1),
  small: calcRem(1.5),
  base: calcRem(2),
  lg: calcRem(3),
  xl: calcRem(4),
  xxl: calcRem(5),
};

const verticalInterval = {
  xxs: `${calcRem(0.4)} 0 ${calcRem(0.4)} 0`,
  // 10px
  xs: `${calcRem(1)} 0 ${calcRem(1)} 0`,
  small: `${calcRem(1.5)} 0 ${calcRem(1.5)} 0`,
  base: `${calcRem(2)} 0 ${calcRem(2)} 0`,
  lg: `${calcRem(3)} 0 ${calcRem(3)} 0`,
  xl: `${calcRem(4)} 0 ${calcRem(4)} 0`,
  xxl: `${calcRem(5)} 0 ${calcRem(5)} 0`,
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
