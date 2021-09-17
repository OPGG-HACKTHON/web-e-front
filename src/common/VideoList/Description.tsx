import Button from 'common/Button';
import useSearch from 'hooks/useSearch/useSearch';
import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import {
  FollowBtnDiv,
  PosterInfo,
} from 'styles/mainStyles/videoComponents/VideoItem';
import { typography } from 'styles/theme';
import { useHistory } from 'react-router-dom';
import profilePic from 'assets/svg/프로필사진.svg';
import { useRecoilValue } from 'recoil';
import { videoModalAtom } from 'atom/videoModalAtom';
import useFollow from 'hooks/useFollow';

type Props = {
  description: string;
  pName: string;
  pPic: string;
  pFollowNum: number;
};

const Description = ({ description, pName, pPic, pFollowNum }: Props) => {
  const themeStyle = useContext(ThemeContext);

  const descArray = description.replace('\n', ' ').split(' ');
  const regexp = /#([가-힣a-zA-Z0-9]+)/g;
  const history = useHistory();

  const { goToLink, handleAddKeyword } = useSearch();

  const onClick = (value) => {
    // 실행할 함수
    handleAddKeyword(value);
    const url = goToLink(value);
    history.push(url);
  };

  const gotoLink = (userId) => {
    console.log(userId);

    history.push(`profile/${userId}`);
  };

  const picture = pPic || profilePic;

  const videoModalState = useRecoilValue(videoModalAtom);

  const [followNumber, setFollowNumber] = useState<number>(
    videoModalState.followNumber
  );
  const [isFollow, setFollowState] = useState<boolean>(
    videoModalState.relation.isFollow
  );

  useEffect(() => {
    if (videoModalState.videoId !== -1) {
      setFollowNumber(videoModalState.followNumber);
      setFollowState(videoModalState.relation.isFollow);
    }
  }, [videoModalState]);

  const { handleFollow, handleUnFollow, followErrorStatus } = useFollow();

  const onClickFollowBtn = () => {
    if (isFollow) {
      handleUnFollow(videoModalState.uploaderId).then((res) => {
        if (res.status < 300) {
          // 왜 err 나도 catch에서 못잡지???
          setFollowState(false);
          setFollowNumber((prev) => prev - 1);
        }
      });
    } else {
      handleFollow(videoModalState.uploaderId).then((res) => {
        if (res.status < 300) {
          setFollowState(true);
          setFollowNumber((prev) => prev + 1);
        }
      });
    }
  };

  return (
    <InfoWrapper>
      {/* TODO: className */}
      <PosterInfo>
        <PosterLeft>
          <PosterImgBtn onClick={() => gotoLink(pName)}>
            <UserPicImg src={picture} alt="alt" />
          </PosterImgBtn>
          <PosterNameBtn onClick={() => gotoLink(pName)}>
            <PosterName>{pName}</PosterName>
            <div>팔로워 {pFollowNum}</div>
          </PosterNameBtn>
        </PosterLeft>
        <FollowBtnDiv>
          <Button
            text={isFollow ? '팔로우 취소' : '팔로우'}
            onClick={onClickFollowBtn}
            fontColor={themeStyle.color.white}
            bkgColor={themeStyle.color.yellow}
            padding="0.8rem 0.7rem"
            borderRadius={0.5}
            fontStyle={typography.bodySmRegular}
            hoverBkgColor={themeStyle.color.white}
            hoverFontColor={themeStyle.color.yellow}
          />
        </FollowBtnDiv>
      </PosterInfo>
      <DescriptionWrapper>
        <DescriptionText>
          {descArray.map((word: string) =>
            word.match(regexp) ? (
              <Hashtag onClick={() => onClick(word)} key={word}>
                {word}
              </Hashtag>
            ) : (
              <TextContent key={word}>{word}</TextContent>
            )
          )}
        </DescriptionText>
      </DescriptionWrapper>
    </InfoWrapper>
  );
};

export default Description;

const Hashtag = styled.a`
  cursor: pointer;
  ${({ theme }) => theme.typography.bodySmBold};
  margin: 0 2px;
`;

const TextContent = styled.span`
  ${({ theme }) => theme.typography.bodySmRegular};
  margin: 0 2px;
`;

const PosterLeft = styled.div`
  display: flex;
`;

const PosterImgBtn = styled.div`
  width: 5rem;
`;
const PosterNameBtn = styled.div``;
const PosterName = styled.div`
  ${({ theme }) => theme.typography.bodyRg}
`;
const InfoWrapper = styled.div`
  margin-top: ${({ theme }) => theme.margins.xs};
`;

const DescriptionWrapper = styled.div``;

const DescriptionText = styled.p`
  margin-top: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 3em;
  height: 3em;
`;

const UserPicImg = styled.img`
  width: 90%;
  border-radius: 5px;
  cursor: pointer;
  width: 4rem;
  height: 4rem;
`;
