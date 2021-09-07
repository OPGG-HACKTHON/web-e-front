/* eslint-disable import/prefer-default-export */
import getHashtagsVideos from 'api/search/hashtags';
import getUsers from 'api/search/users';
import { atom, RecoilValue, selector } from 'recoil';
import { leftNavItemState } from './pageAtom';
import { selectorState } from './selectorAtom';

// ------------해시태그-------------------
// 검색창 input 아톰
export const searchAreaAtom = atom({
  key: 'searchAreaAtom',
  default: JSON.parse(localStorage.getItem('keywords') || '[]'),
});

// url 주소 아톰
export const searhHashtagsAtom = atom({
  key: 'searhHashtagsAtom',
  default: '/tags/search?hashtags=%23',
});

export const getHashtagsList = selector({
  key: 'getHashtagsList',
  get: async ({ get }) => {
    const url = get(searhHashtagsAtom);
    // /tags/search?hashtags=%23%ED%95%9C%EC%A1%B0
    const response = await getHashtagsVideos(url);
    return response;
  },
});

export const hListByCategoryState = selector({
  key: 'hListByCategoryState',
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

export const hListbySelectorState = selector({
  key: 'hListbySelectorState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(selectorState);
    const list = get(hListByCategoryState);
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
// ------------해시태그-------------------

// ------------유저-------------------

export const searchUserAtom = atom({
  key: 'searchUserAtom',
  default: '/users/search?user=',
});

export const getUsersList = selector({
  key: 'getUsersList',
  get: async ({ get }) => {
    const url = get(searchUserAtom);
    // `users/search?user=${reValue}`
    const response = await getUsers(url);
    return response;
  },
});
// ------------유저-------------------
