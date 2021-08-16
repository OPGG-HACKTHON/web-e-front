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
