import { myProfileType } from 'api/profile/profile.type';
import { atom } from 'recoil';

const initData = {
  email: '',
  feed: '',
  id: null,
  intro: null,
  lolTier: 'UNRANKED',
  photo: null,
  pubgTier: 'UNRANKED',
  role: 'USER',
  watchTier: 'UNRANKED',
};

// eslint-disable-next-line import/prefer-default-export
export const myProfileAtom = atom<myProfileType>({
  key: 'myProfileAtom',
  default: initData,
});

export const findUser = atom<string>({
  key: 'findUser',
  default: undefined,
});
