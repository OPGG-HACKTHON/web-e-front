/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export const searchAreaAtom = atom({
  key: 'searchAreaAtom',
  default: JSON.parse(localStorage.getItem('keywords') || '[]'),
});
