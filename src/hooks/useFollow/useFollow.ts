import React, { useCallback, useState } from 'react';
import useProfile from 'hooks/useProfile/useProfile';
import { follow, unfollow } from 'api/follow/follow';
import { followDto } from 'api/follow/follow.dto';
import { useRecoilValue } from 'recoil';
import { myProfileAtom } from 'atom/profileAtom';

const useFollow = () => {
  const myProfile = useRecoilValue(myProfileAtom);
  const { handleMyProfile, handleFindFollower, handleFindFollowing } =
    useProfile();

  const [followObj, setFollowObj] = useState<followDto>({
    userId: myProfile?.id,
    followingId: '',
  });
  const [followErrorStatus, setFollowErrorStatus] = useState<number>(0);

  const handleFollow = async (followingId: string) => {
    try {
      const res = await follow({
        userId: followObj.userId,
        followingId,
      });

      const { data, status } = res;
      await handleMyProfile();

      return data;
    } catch (err) {
      const { status } = err.response;
      setFollowErrorStatus(status);
      return err;
    }
  };

  const handleUnFollow = async (followingId: string) => {
    try {
      const res = await unfollow({
        userId: followObj.userId,
        followingId,
      });

      const { data, status } = res;
      await handleMyProfile();

      return data;
    } catch (err) {
      const { status } = err.response;
      setFollowErrorStatus(status);
      return err;
    }
  };

  return {
    followObj,
    setFollowObj,
    handleFollow,
    handleUnFollow,
    followErrorStatus,
  };
};

export default useFollow;
