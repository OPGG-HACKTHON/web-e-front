import { atom } from 'recoil';

// eslint-disable-next-line import/prefer-default-export
export const leftNavItemState = atom<string>({
  key: 'leftNavItemState',
  default: 'lol',
});
