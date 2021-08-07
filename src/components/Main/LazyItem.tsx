import React, { lazy, Suspense, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import VideoItem from 'styles/mainStyles/videoComponents/VideoItem';
import Button from 'common/Button';
import { typography } from 'styles/theme';

export interface Iprops {
  src: string;
  describe: string;
  hashtag: string;
  likes: number;
  comments: number;
  pName: string;
  pPic: string;
  pFollowNum: number;
}

const LazyVideo = lazy(() => import('./LazyVideo'));

const LazyItem = ({
  src,
  describe,
  hashtag,
  likes,
  comments,
  pName,
  pPic,
  pFollowNum,
}: Iprops) => {
  const themeStyle = useContext(ThemeContext);
  const splitedHashtags = hashtag.split(' ');
  return (
    <VideoItem>
      <Suspense fallback={<div>...loading</div>}>
        <LazyVideo
          src={src}
          describe={describe}
          hashtag={hashtag}
          likes={likes}
          comments={comments}
          pName={pName}
          pPic={pPic}
          pFollowNum={pFollowNum}
        />
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
            <span className="describe_span">{describe}</span>
            {splitedHashtags.map((tag: string) => (
              <Hashtag onClick={() => console.log('팔로우')}>{tag}</Hashtag>
            ))}
          </div>
        </InfoWrapper>
      </Suspense>
    </VideoItem>
  );
};

export default LazyItem;

const Hashtag = styled.span`
  cursor: pointer;
  ${({ theme }) => theme.typography.bodySmBold};
`;

const PosterImgBtn = styled.div``;
const PosterNameBtn = styled.div``;
const InfoWrapper = styled.div`
  margin-top: ${({ theme }) => theme.margins.xs};
`;
