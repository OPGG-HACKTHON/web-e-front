import { atom } from 'recoil';

// eslint-disable-next-line import/prefer-default-export
export const infiniteStreamState = atom<boolean>({
  key: 'infiniteStreamState',
  default: false,
});
