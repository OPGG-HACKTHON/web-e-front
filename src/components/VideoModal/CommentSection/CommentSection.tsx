/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { typography } from 'styles/theme';
import { useRecoilValue } from 'recoil';
import { findUser, myProfileAtom } from 'atom/profileAtom';
import { videoModalAtom } from 'atom/videoModalAtom';
import useLike from 'hooks/useLike';
import useComment from 'hooks/useComment/useComment';
import { useHistory } from 'react-router-dom';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DefaultProfile40 from 'assets/svg/defaultProfile/profile_40.svg';

export interface IComment {
  videoId: number;
  userId: string;
  userName: string;
  userPhotoURL: string;
  content: string;
}

const CommentSection = () => {
  const themeStyle = useContext(ThemeContext);
  const videoModalState = useRecoilValue(videoModalAtom);
  const [commentInput, setCommentInput] = useState<string>('');
  const history = useHistory();
  const {
    handleGetCommentList,
    commentList,
    handlePostComment,
    commentErrorStatus,
  } = useComment();
  const myProfile = useRecoilValue(myProfileAtom);

  const { handlePressLike, handleCancelLike, likeErrorStatus } = useLike();
  const [likeNumber, setLikeNumber] = useState<number>(
    videoModalState.likeNumber
  );
  const [isLike, setLikeState] = useState<boolean>(
    videoModalState.relation.isLike
  );

  useEffect(() => {
    if (videoModalState.videoId !== -1) {
      handleGetCommentList(videoModalState.videoId);
      setLikeNumber(videoModalState.likeNumber);
      setLikeState(videoModalState.relation.isLike);
    }
  }, [videoModalState]);

  const getLikeButtonFill = useMemo(() => {
    if (isLike) {
      return 'red';
    }
    return themeStyle.color.grayScale[500];
  }, [isLike, themeStyle]);

  const onClickLikeBtn = () => {
    const { uploaderId, videoId } = videoModalState;

    if (isLike) {
      handleCancelLike(uploaderId, videoId).then((res) => {
        if (res.status < 300) {
          setLikeState(false);
          setLikeNumber((prev) => prev - 1);
        }
      });
    } else {
      handlePressLike(uploaderId, videoId).then((res) => {
        if (res.status < 300) {
          setLikeState(true);
          setLikeNumber((prev) => prev + 1);
        }
      });
    }
  };

  const onClickSubitComment = async () => {
    if (!myProfile.id) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    const { videoId, uploaderId } = videoModalState;
    await handlePostComment({
      videoId,
      userId: myProfile.id,
      content: commentInput,
    });
    await handleGetCommentList(videoId);
    setCommentInput('');
  };

  return (
    <ContentWrapper>
      <LikeWrapper>
        <FavoriteRoundedIcon
          onClick={onClickLikeBtn}
          style={{
            width: 30,
            height: 30,
            fill: getLikeButtonFill,
            cursor: 'pointer',
          }}
        />
        <LikeText
          gray={themeStyle.color.grayScale[500]}
        >{`좋아요 ${likeNumber}`}</LikeText>
      </LikeWrapper>
      <CommentScrollSection>
        {commentList.map((data) => (
          <CommentWrapper key={data.userId + data.content}>
            <ProfileImage
              src={data.userPhotoURL || DefaultProfile40}
              onClick={() => {
                console.log(data);
                history.push(`/profile/${data.userName}`);
              }}
            />
            <CommentTextWrapper>
              <CommentAuthor>{data.userName}</CommentAuthor>
              <CommentContent>{data.content}</CommentContent>
            </CommentTextWrapper>
          </CommentWrapper>
        ))}
      </CommentScrollSection>
      <CommentInputWrapper gray={themeStyle.color.grayScale[250]}>
        <InputField
          placeholder="댓글 달기 ..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <SubmitButton
          onClick={onClickSubitComment}
          disabled={!commentInput}
          color={
            commentInput
              ? themeStyle.color.yellow
              : themeStyle.color.grayScale[100]
          }
        >
          게시
        </SubmitButton>
      </CommentInputWrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div``;

const LikeWrapper = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  gap: 1rem;
`;

const LikeText = styled.div<{ gray: string }>`
  color: ${(props) => props.gray};
  font-size: 1.4rem;
`;

const CommentScrollSection = styled.div`
  height: 360px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  scrollbar-width: none; /** firefox **/
  -ms-overflow-style: none; /** IE */
  /** chrome, safari, opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  background-color: gray;
  border-radius: 5px;
  cursor: pointer;
`;

const CommentTextWrapper = styled.div`
  width: 275px;
  padding: 0.3rem 0;
  display: flex;
  flex-direction: column;
`;

const CommentAuthor = styled.div`
  ${typography.bodyRgBold};
`;

const CommentContent = styled.div`
  ${typography.bodyRg};
`;

const CommentInputWrapper = styled.div<{ gray: string }>`
  border-top: ${(props) => `1px solid ${props.gray}`};
  display: flex;
  margin-top: 1rem;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
`;

const InputField = styled.input`
  width: 80%;
  padding: 1rem;
  border: none;
`;

const SubmitButton = styled.button<{ color: string }>`
  ${typography.bodyRg};
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  color: ${(props) => props.color};
  cursor: pointer;
`;

export default CommentSection;
