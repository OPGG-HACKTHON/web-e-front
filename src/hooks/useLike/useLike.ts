import React, { useState } from 'react';
import useProfile from 'hooks/useProfile/useProfile';
import { pressLike, cancleLike } from 'api/like/like';
import { likeDto } from 'api/like/like.dto';
import { useRecoilValue } from 'recoil';
import { myProfileAtom } from 'atom/profileAtom';

const useLike = () => {
  const myProfile = useRecoilValue(myProfileAtom);
  const { handleMyProfile } = useProfile();

  const [likeObj, setLikeObj] = useState<likeDto>({
    userId: myProfile?.id,
    likeId: '',
    videoId: -1,
  });
  const [likeErrorStatus, setLikeErrorStatus] = useState<number>(0);

  const handlePressLike = async (likeId: string, videoId: number) => {
    try {
      const res = await pressLike({
        userId: likeObj.userId,
        likeId,
        videoId,
      });
      const { data, status } = res;
      return data;
    } catch (err) {
      const { status } = err.response;
      setLikeErrorStatus(status);
      return err;
    }
  };

  const handleCancleLike = async (likeId: string, videoId: number) => {
    try {
      const res = await pressLike({
        userId: likeObj.userId,
        likeId,
        videoId,
      });
      const { data, status } = res;
      return data;
    } catch (err) {
      const { status } = err.response;
      setLikeErrorStatus(status);
      return err;
    }
  };

  return {
    likeObj,
    setLikeObj,
    handlePressLike,
    handleCancleLike,
    likeErrorStatus,
  };
};

export default useLike;
