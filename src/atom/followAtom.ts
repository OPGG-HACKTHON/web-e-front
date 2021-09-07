import { followingListType, follwerListType } from 'api/profile/profile.type';
import { atom } from 'recoil';

export const followerListAtom = atom<follwerListType[]>({
  key: 'followerList',
  default: null,
});

export const followingListAtom = atom<followingListType[]>({
  key: 'followingList',
  default: null,
});

export const followerCountAtom = atom<number>({
  key: 'followerCountAtom',
  default: 0,
});

export const followingCountAtom = atom<number>({
  key: 'followingCountAtom',
  default: 0,
});

export const myFollowingListAtom = atom<followingListType[]>({
  key: 'myFollowingListAtom',
  default: null,
});
