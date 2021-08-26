import getMyVideoList from 'api/profile/profileVideo';
import { RecoilValue, selector } from 'recoil';
import { leftNavItemState } from './pageAtom';
import { myProfileAtom } from './profileAtom';
import { videoListState } from './videoListAtom';

export const myVideoSelector = selector({
  key: 'myVideoSelector',
  get: async ({ get }) => {
    const videos = get(videoListState);

    const userProfile = get(myProfileAtom);
    const userId = userProfile.id;

    const profileVideos = videos.filter((video) => video.userId === userId);

    // const lVideo: any[] = [];
    // const rVideo: any[] = [];
    // if (profileVideos) {
    //   for (let i = 0; i < profileVideos.length; i += 1) {
    //     if (i % 2 === 0) {
    //       lVideo.push(profileVideos[i]);
    //     } else {
    //       rVideo.push(profileVideos[i]);
    //     }
    //   }
    // }
    // return [lVideo, rVideo];
    return profileVideos;
  },
});

export const myListByCategoryState = selector({
  key: 'myListByCategoryState',
  get: ({ get }) => {
    const selectNavName = get(leftNavItemState);
    const videos = get(myVideoSelector);
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

export const myListbySelectorState = selector({
  key: 'myListbySelectorState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const list = get(myListByCategoryState);
    const lVideo: any[] = [];
    const rVideo: any[] = [];
    if (list) {
      for (let i = 0; i < list.length; i += 1) {
        if (i % 2 === 0) {
          lVideo.push(list[i]);
        } else {
          rVideo.push(list[i]);
        }
      }
    }
    return [lVideo, rVideo];
  },
});
