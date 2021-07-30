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

export type Theme = typeof theme;

const theme = {
  color,
};

export default theme;
