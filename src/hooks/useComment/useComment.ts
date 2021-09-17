/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { commentDto } from 'api/comment/comment.dto';
import { postComment, getComment } from 'api/comment/comment';

export interface IComment {
  videoId: number;
  userId: string;
  userName: string;
  userPhotoURL: string;
  content: string;
}

const useComment = () => {
  const [commentErrorStatus, setCommentErrorStatus] = useState<number>(0);
  const [commentList, setCommentList] = useState<IComment[]>([]);

  const handleGetCommentList = useCallback(async (videoId: number) => {
    try {
      const res = await getComment(videoId);
      const { datas, status } = res.data;
      setCommentErrorStatus(status);
      setCommentList(datas);
    } catch (err) {
      setCommentList([]);
    }
  }, []);

  const handlePostComment = useCallback(async (dto: commentDto) => {
    try {
      const res = await postComment(dto);
    } catch (err) {
      setCommentErrorStatus(err);
    }
  }, []);

  return {
    commentList,
    setCommentList,
    handleGetCommentList,
    handlePostComment,
    commentErrorStatus,
  };
};

export default useComment;
