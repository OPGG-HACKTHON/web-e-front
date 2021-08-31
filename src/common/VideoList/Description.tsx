import Button from 'common/Button';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { typography } from 'styles/theme';

type Props = {
  description: string;
  pName: string;
  pPic: string;
  pFollowNum: number;
};

const Description = ({ description, pName, pPic, pFollowNum }: Props) => {
  const themeStyle = useContext(ThemeContext);
  const descArray = description.split(' ');
  const regexp = /#([가-힣a-zA-Z0-9]+)/g;
  return (
    <InfoWrapper>
      <div className="poster_info">
        <PosterImgBtn
          className="poster_img"
          onClick={() => console.log('posteruserspage')}
        >
          <img src={pPic} alt="alt" className="userPicImg" />
        </PosterImgBtn>
        <PosterNameBtn onClick={() => console.log('posteruserspage')}>
          <div className="poster_name">{pName}</div>
          <div className="poster_followers">팔로워 {pFollowNum}</div>
        </PosterNameBtn>
        <div className="follow_btn_div">
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
        </div>
      </div>
      <div className="desc_div">
        <span className="description_span">
          {descArray.map((word: string) =>
            word.match(regexp) ? (
              <Hashtag onClick={() => console.log(word)} key={word}>
                {word}
              </Hashtag>
            ) : (
              <TextContent>{word}</TextContent>
            )
          )}
        </span>
      </div>
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

const PosterImgBtn = styled.div``;
const PosterNameBtn = styled.div``;
const InfoWrapper = styled.div`
  margin-top: ${({ theme }) => theme.margins.xs};
`;
