import { profileType } from 'api/profile/profile.type';
import { atom } from 'recoil';

export const initFetchUserInfo = {
  userId: '',
  userName: '',
  userPhotoURL: null,
  userCoverURL: null,
  userColor: null,
  userFeed: '',
  lolTier: '',
  pubgTier: '',
  watchTier: '',
  userIntro: null,
  userLolId: null,
  userWatchId: null,
  userPubgId: null,
  userRole: '',
  followerCount: 0,
  isPro: false,
  loginAt: '',
};

export const fetchUserInfoAtom = atom<profileType>({
  key: 'fetchUserInfoAtom',
  default: initFetchUserInfo,
});
