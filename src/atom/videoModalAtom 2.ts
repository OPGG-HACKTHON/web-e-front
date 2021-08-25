import { atom } from 'recoil';
import { IRelation } from 'common/VideoList/VideoList';

export interface IVideoModalAtom {
  src: string;
  videoId: number;
  followNumber: number;
  likeNumber: number;
  commentArray: any;
  videoIntro: string;
  uploaderId: string;
  relation: IRelation;
}

// eslint-disable-next-line import/prefer-default-export
export const videoModalAtom = atom({
  key: 'videoModalAtom',
  default: {
    src: '',
    videoId: 0,
    followNumber: 0,
    likeNumber: 0,
    commentArray: 0,
    videoIntro: '',
    uploaderId: '',
    relation: {
      isFollow: false,
      isLike: false,
    },
  },
});
