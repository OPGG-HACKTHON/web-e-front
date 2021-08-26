import { atom, RecoilValue, selector } from 'recoil';
import { datas } from 'data/main';
import getVideos from 'api/video/video';
import { leftNavItemState } from './pageAtom';
import { selectorState } from './selectorAtom';

export const getVideoTrigger = atom({
  key: '_getVideoTrigger',
  default: 0,
});

export const videoListState = selector({
  key: 'videoListState',
  get: async ({ get }) => {
    get(getVideoTrigger);
    const response = await getVideos();
    return response;
  },
  set: ({ set }) => {
    set(getVideoTrigger, (v) => v + 1);
  },
});

export const vListByCategoryState = selector({
  key: 'vListByCategoryState',
  get: ({ get }) => {
    const selectNavName = get(leftNavItemState);
    const videos = get(videoListState);
    let returnArr: any[] | Promise<any[]> | RecoilValue<any[]> = [];
    if (selectNavName === 'lol') {
      returnArr = videos.filter(
        (data: { category: string }) => data.category === 'lol'
      );
    } else if (selectNavName === 'pubg') {
      returnArr = videos.filter(
        (data: { category: string }) => data.category === 'pubg'
      );
    } else if (selectNavName === 'overwatch') {
      returnArr = videos.filter(
        (data: { category: string }) => data.category === 'overwatch'
      );
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
