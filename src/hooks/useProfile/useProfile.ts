import {
  findFollower,
  findFollowing,
  myProfileInfo,
} from 'api/profile/profile';
import { myProfileAtom } from 'atom/profileAtom';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';

const useProfile = () => {
  const setMyProfile = useSetRecoilState(myProfileAtom);

  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  const handleFindFollower = useCallback(async (userId: string) => {
    try {
      const { data } = await findFollower(userId);
      setFollowerCount(data.followersCount);

      return data;
    } catch (err) {
      return err;
    }
  }, []);

  const handleFindFollowing = useCallback(async (userId: string) => {
    try {
      const { data } = await findFollowing(userId);
      setFollowingCount(data.followingsCounts);

      return data;
    } catch (err) {
      return err;
    }
  }, []);

  const handleMyProfile = useCallback(async () => {
    try {
      const { data } = await myProfileInfo();
      setMyProfile(data);
      Promise.all([handleFindFollower(data.id), handleFindFollowing(data.id)]);

      return data;
    } catch (err) {
      return err;
    }
  }, [handleFindFollower, handleFindFollowing, setMyProfile]);

  return { handleMyProfile, followerCount, followingCount };
};

export default useProfile;
