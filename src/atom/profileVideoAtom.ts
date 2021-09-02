import getProfileVideo from 'api/profile/profileVideo';
import { atom, RecoilValue, selector } from 'recoil';
import { leftNavItemState } from './pageAtom';
import { myProfileAtom } from './profileAtom';
import { videoListState } from './videoListAtom';

export const userIdAtom = atom({
  key: 'userIdAtom',
  default: '',
});

export const selectCategory = atom({
  key: 'selectCategory',
  default: '전체',
});

export const myVideoSelector = selector({
  key: 'myVideoSelector',
  get: async ({ get }) => {
    const userId = get(userIdAtom);
    const data = await getProfileVideo(userId);
    return data;
  },
});

export const myListByCategoryState = selector({
  key: 'myListByCategoryState',
  get: ({ get }) => {
    const selectNavName = get(selectCategory);
    const videos = get(myVideoSelector);
    let returnArr: any[] = [];
    if (selectNavName === '리그오브레전드') {
      returnArr = videos.filter(
        (data: { category: string }) => data.category === 'lol'
      );
    } else if (selectNavName === '배틀그라운드') {
      returnArr = videos.filter(
        (data: { category: string }) => data.category === 'pubg'
      );
    } else if (selectNavName === '오버워치') {
      returnArr = videos.filter(
        (data: { category: string }) => data.category === 'overwatch'
      );
    } else if (selectNavName === '전체') {
      returnArr = videos;
    }

    const lVideo: any[] = [];
    const rVideo: any[] = [];
    if (returnArr) {
      for (let i = 0; i < returnArr.length; i += 1) {
        if (i % 2 === 0) {
          lVideo.push(returnArr[i]);
        } else {
          rVideo.push(returnArr[i]);
        }
      }
    }
    return [lVideo, rVideo];
  },
});
