import React, { useCallback, useState } from 'react';
import useProfile from 'hooks/useProfile/useProfile';
import { follow, unfollow } from 'api/follow/follow';
import { followDto } from 'api/follow/follow.dto';
import { useRecoilValue } from 'recoil';
import { myProfileAtom } from 'atom/profileAtom';

const useFollow = () => {
  const myProfile = useRecoilValue(myProfileAtom);
  const {
    handleMyProfile,
    handleFindFollower,
    handleFindFollowing,
    myFollowList,
  } = useProfile();

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
      setFollowErrorStatus(status);
      console.log(status);
      await handleMyProfile();
      await myFollowList();

      return res;
    } catch (err) {
      const { status } = err.response;
      setFollowErrorStatus(status);
      switch (status) {
        case 401:
          alert('로그인이 필요한 서비스입니다.');
          break;
        case 404:
          alert('탈퇴한 사용자입니다.');
          break;
        case 405:
        case 409:
          alert('자신을 팔로우 할 수 없습니다.');
          break;
        default:
          break;
      }
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
      setFollowErrorStatus(status);
      console.log(status);
      await handleMyProfile();
      await myFollowList();
      return res;
    } catch (err) {
      const { status } = err.response;
      setFollowErrorStatus(status);
      switch (status) {
        case 401:
          alert('로그인이 필요한 서비스입니다.');
          break;
        case 404:
          alert('탈퇴한 사용자입니다.');
          break;
        case 405:
        case 409:
          alert('자신을 팔로우 취소 할 수 없습니다.');
          break;
        default:
          break;
      }
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
