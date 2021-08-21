import { atom } from 'recoil';

// eslint-disable-next-line import/prefer-default-export
export const videoModalAtom = atom({
  key: 'videoModalState',
  default: {
    src: '',
    videoId: 0,
    followNumber: 0,
    likeNumber: 0,
    commentArray: [],
    videoIntro: '',
  },
});
