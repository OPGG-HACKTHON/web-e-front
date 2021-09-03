import { searchAreaAtom } from 'atom/searchAreaAtom';
import Button from 'common/Button';
import useSearch from 'hooks/useSearch/useSearch';
import React, { useContext } from 'react';
import { useRecoilState } from 'recoil';
import styled, { ThemeContext } from 'styled-components';
import {
  FollowBtnDiv,
  PosterInfo,
} from 'styles/mainStyles/videoComponents/VideoItem';
import { typography } from 'styles/theme';

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

  const { goToLink, handleAddKeyword } = useSearch();

  const onClick = (value) => {
    // 실행할 함수
    handleAddKeyword(value);
    goToLink(value);
  };

  return (
    <InfoWrapper>
      {/* TODO: className */}
      <PosterInfo>
        <PosterImgBtn onClick={() => console.log('posteruserspage')}>
          <UserPicImg src={pPic} alt="alt" />
        </PosterImgBtn>
        <PosterNameBtn onClick={() => console.log('posteruserspage')}>
          <div>{pName}</div>
          <div>팔로워 {pFollowNum}</div>
        </PosterNameBtn>
        <FollowBtnDiv>
          <Button
            text="팔로우"
            onClick={() => console.log('팔로우')}
            fontColor={themeStyle.color.white}
            bkgColor={themeStyle.color.yellow}
            padding="0.8rem 0.7rem"
            width={5.5}
            height={2.3}
            borderRadius={0.5}
            fontStyle={typography.bodyRgBold}
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

const PosterImgBtn = styled.div`
  width: 5rem;
`;
const PosterNameBtn = styled.div``;
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
`;
