import React, { useState } from 'react';
import useProfile from 'hooks/useProfile/useProfile';
import { pressLike, cancelLike } from 'api/like/like';
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
      return res;
    } catch (err) {
      const { status } = err.response;
      setLikeErrorStatus(status);
      switch (status) {
        case 401:
          alert('로그인이 필요한 서비스입니다.');
          break;
        case 404:
          alert('탈퇴한 사용자입니다.');
          break;
        case 405:
        case 409:
          alert('자신을 좋아요 할 수 없습니다.');
          break;
        default:
          break;
      }
      return err;
    }
  };

  const handleCancelLike = async (likeId: string, videoId: number) => {
    try {
      const res = await cancelLike({
        userId: likeObj.userId,
        likeId,
        videoId,
      });
      const { data, status } = res;
      return res;
    } catch (err) {
      const { status } = err.response;
      setLikeErrorStatus(status);
      switch (status) {
        case 401:
          alert('로그인이 필요한 서비스입니다.');
          break;
        case 404:
          alert('탈퇴한 사용자입니다.');
          break;
        case 405:
        case 409:
          alert('자신을 좋아요 할 수 없습니다.');
          break;
        default:
          break;
      }
      return err;
    }
  };

  return {
    likeObj,
    setLikeObj,
    handlePressLike,
    handleCancelLike,
    likeErrorStatus,
  };
};

export default useLike;
