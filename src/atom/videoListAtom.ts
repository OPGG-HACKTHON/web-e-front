import { atom, RecoilValue, selector } from 'recoil';
import { datas } from 'data/main';
import { leftNavItemState } from './pageAtom';
import { selectorState } from './selectorAtom';

// eslint-disable-next-line import/prefer-default-export
export const videoListState = atom({
  key: 'videoListState',
  default: datas.videos,
});

export const vListByCategoryState = selector({
  key: 'vListByCategoryState',
  get: ({ get }) => {
    const selectNavName = get(leftNavItemState);
    let returnArr: any[] | Promise<any[]> | RecoilValue<any[]> = [];
    if (selectNavName === 'lol') {
      returnArr = datas.videos.filter((data) => data.category === 'lol');
    } else if (selectNavName === 'pubg') {
      returnArr = datas.videos.filter((data) => data.category === 'pubg');
    } else if (selectNavName === 'overwatch') {
      returnArr = datas.videos.filter((data) => data.category === 'overwatch');
    }
    return returnArr;
  },
});

export const vListbySelectorState = selector({
  key: 'vListbySelectorState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(selectorState);
    const list = get(vListByCategoryState);
    const videoAr = list.slice();
    const lVideo: any[] = [];
    const rVideo: any[] = [];
    if (text === 'popular') {
      videoAr.sort((a, b) => b.views - a.views);
    }
    if (text === 'new') {
      videoAr.sort(
        (a, b) =>
          new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
      );
    }
    if (text === 'like') {
      videoAr.sort((a, b) => b.likes - a.likes);
    }
    for (let i = 0; i < videoAr.length; i += 1) {
      if (i % 2 === 0) {
        lVideo.push(videoAr[i]);
      } else {
        rVideo.push(videoAr[i]);
      }
    }

    return [lVideo, rVideo];
  },
});

export const popTagsState = selector({
  key: 'popTagsState',
  get: ({ get }) => {
    const selectNavName = get(leftNavItemState);
    let returnArr: any[] | Promise<any[]> | RecoilValue<any[]> = [];
    if (selectNavName === 'lol') {
      returnArr = datas.popularTags.lol;
    } else if (selectNavName === 'pubg') {
      returnArr = datas.popularTags.pubg;
    } else if (selectNavName === 'overwatch') {
      returnArr = datas.popularTags.overwatch;
    }
    return returnArr;
  },
});
