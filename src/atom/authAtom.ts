import { registerDto } from 'api/auth/auth.dto';
import { atom } from 'recoil';
import { termsCheckedProps } from 'types/auth';

const initTermsData = {
  utilization: false,
  personalinformation: false,
  pushEvent: false,
};

const initUserData = {
  userId: '',
  userName: '',
  userPassword: '',
};

export const termsCheckedAtom = atom<termsCheckedProps>({
  key: 'tersCheckedAtom',
  default: initTermsData,
});

export const allAgreeTerms = atom<boolean>({
  key: 'allAgreeTerms',
  default: false,
});

export const userInfo = atom<registerDto>({
  key: 'userInfo',
  default: initUserData,
});

export const SELECT_LOL_TIER = atom({
  key: 'SELECT_LOL_TIER',
  default: 'UNRANKED',
});

export const SELECT_OVERWATCH_TIER = atom({
  key: 'SELECT_OVERWATCH_TIER',
  default: 'UNRANKED',
});

export const SELECT_PUBG_TIER = atom({
  key: 'SELECT_PUBG_TIER',
  default: 'UNRANKED',
});
