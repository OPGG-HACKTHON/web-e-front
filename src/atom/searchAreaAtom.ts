/* eslint-disable import/prefer-default-export */
import getHashtagsVideos from 'api/search/hashtags';
import { atom, RecoilValue, selector } from 'recoil';
import { leftNavItemState } from './pageAtom';
import { selectorState } from './selectorAtom';

// 검색창 input 아톰
export const searchAreaAtom = atom({
  key: 'searchAreaAtom',
  default: JSON.parse(localStorage.getItem('keywords') || '[]'),
});

// url 주소 아톰
export const searhUrl = atom({
  key: 'searhUrl',
  default: '',
});

export const getHashtagsList = selector({
  key: 'getHashtagsList',
  get: async ({ get }) => {
    const url = get(searhUrl);
    const response = await getHashtagsVideos(url);
    return response;
  },
});

export const vListByCategoryState = selector({
  key: 'vListByCategoryState',
  get: ({ get }) => {
    const selectNavName = get(leftNavItemState);
    const videos = get(getHashtagsList);
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
