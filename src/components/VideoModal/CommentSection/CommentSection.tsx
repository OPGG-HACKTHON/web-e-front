import React, { useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { typography } from 'styles/theme';
import { useRecoilValue } from 'recoil';
import { videoModalAtom } from 'atom/videoModalAtom';
import { pressLike, cancleLike } from 'api/like/like';
import { likeDto } from 'api/like/like.dto';
import useLike from 'hooks/useLike';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

const dummyComments = [
  {
    id: 0,
    name: '레오나 장인',
    comment: '굿!',
  },
  {
    id: 1,
    name: '아칼리장인123',
    comment: '이건 아칼리가 못했네.',
  },
  {
    id: 2,
    name: 'edin',
    comment:
      '솔라리 성전사 레오나는 천공의 검과 여명의 방패로 타곤 산을 수호한다.',
  },
  {
    id: 3,
    name: '트위치',
    comment: 'Good!',
  },
  {
    id: 4,
    name: '레오나 장인',
    comment: '굿!',
  },
  {
    id: 5,
    name: '아칼리장인123',
    comment: '이건 아칼리가 못했네.',
  },
  {
    id: 6,
    name: 'edin',
    comment:
      '솔라리 성전사 레오나는 천공의 검과 여명의 방패로 타곤 산을 수호한다.',
  },
  {
    id: 7,
    name: '트위치',
    comment: 'Good!',
  },
];

const CommentSection = () => {
  const themeStyle = useContext(ThemeContext);
  const videoModalState = useRecoilValue(videoModalAtom);
  const { handlePressLike, handleCancleLike, likeErrorStatus } = useLike();

  const getLikeButtonFill = (() => {
    if (videoModalState.relation.isLike) {
      return 'red';
    }
    return themeStyle.color.grayScale[500];
  })();

  const onClickLikeBtn = () => {
    const { uploaderId, videoId } = videoModalState;

    if (videoModalState.relation.isLike) {
      handleCancleLike(uploaderId, videoId);
    } else {
      handlePressLike(uploaderId, videoId);
    }
  };

  useEffect(() => {
    switch (likeErrorStatus) {
      case 401:
        alert('로그인이 필요한 서비스입니다');
        break;
      case 404:
        alert('탈퇴한 사용자입니다');
        break;
      case 405:
        alert('자신의 비디오에 좋아요를 하실 수 없습니다');
        break;
      default:
        break;
    }
  }, [likeErrorStatus]);

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
        >{`좋아요 ${videoModalState.likeNumber}`}</LikeText>
      </LikeWrapper>
      <CommentScrollSection>
        {dummyComments.map((data) => (
          <CommentWrapper key={data.id}>
            <ProfileImage />
            <CommentTextWrapper>
              <CommentAuthor>{data.name}</CommentAuthor>
              <CommentContent>{data.comment}</CommentContent>
            </CommentTextWrapper>
            <FavoriteRoundedIcon
              style={{
                width: 24,
                height: 24,
                fill: themeStyle.color.grayScale[500],
              }}
            />
          </CommentWrapper>
        ))}
      </CommentScrollSection>
      <CommentInputWrapper gray={themeStyle.color.grayScale[250]}>
        <InputField placeholder="댓글 달기 ..." />
        <SubmitButton>게시</SubmitButton>
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

const ProfileImage = styled.div`
  height: 40px;
  width: 40px;
  background-color: gray;
  border-radius: 5px;
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
  width: 240px;
  padding: 1rem;
  border: none;
`;

const SubmitButton = styled.div`
  ${typography.bodyRg};
`;

export default CommentSection;
