import React, { useCallback, useState } from 'react';
import useProfile from 'hooks/useProfile/useProfile';
import { follow, unfollow } from 'api/follow/follow';
import { followDto } from 'api/follow/follow.dto';
import { useRecoilValue } from 'recoil';
import { myProfileAtom } from 'atom/profileAtom';

const useFollow = () => {
  const myProfile = useRecoilValue(myProfileAtom);
  const { handleMyProfile } = useProfile();

  const [followObj, setFollowObj] = useState<followDto>({
    userId: myProfile?.id,
    followingId: '',
  });
  const [followErrorStatus, setFollowErrorStatus] = useState<number>(0);

  const handleFollow = useCallback(async () => {
    try {
      const res = await follow(followObj);
      const { data, status } = res;
      await handleMyProfile();
      return data;
    } catch (err) {
      const { status } = err.response;
      setFollowErrorStatus(status);
      return err;
    }
  }, [handleMyProfile, followObj]);

  const handleUnFollow = useCallback(async () => {
    try {
      const res = await unfollow(followObj);
      const { data, status } = res;
      await handleMyProfile();
      return data;
    } catch (err) {
      const { status } = err.response;
      setFollowErrorStatus(status);
      return err;
    }
  }, [handleMyProfile, followObj]);

  return {
    followObj,
    setFollowObj,
    handleFollow,
    handleUnFollow,
    followErrorStatus,
  };
};

export default useFollow;
