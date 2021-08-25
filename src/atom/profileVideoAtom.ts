import { getMyVideoList } from 'api/profileVideo/profileVideo';
import { selector } from 'recoil';
import { myProfileAtom } from './profileAtom';

// eslint-disable-next-line import/prefer-default-export
export const myVideoListState = selector({
  key: 'myVideoListState',
  get: async ({ get }) => {
    const userProfile = get(myProfileAtom);
    const { id } = userProfile;
    // FIX ME: delete
    console.log(`id is ${id}`);

    const data = await getMyVideoList(id);
    return data;
  },
});
