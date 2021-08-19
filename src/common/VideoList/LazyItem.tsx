import React, { lazy } from 'react';
import styled from 'styled-components';
import VideoItem from 'styles/mainStyles/videoComponents/VideoItem';
import Description from './Description';

export interface Iprops {
  src: string;
  description?: string;
  // hashtag?: string;
  likes: number;
  comments: number;
  pName?: string;
  pPic?: string;
  pFollowNum?: number;
  isNeedDescription?: boolean;
}

const LazyVideo = lazy(() => import('./LazyVideo'));

const LazyItem = ({
  src,
  description,
  // hashtag,
  likes,
  comments,
  pName,
  pPic,
  pFollowNum,
  isNeedDescription,
}: Iprops) => {
  // const splitedHashtags = hashtag.split(' ');
  return (
    <VideoItem>
      {/* <Suspense fallback={<div>...loading</div>}> */}
      <LazyVideo src={src} likes={likes} comments={comments} />
      {isNeedDescription ? (
        <Description
          description={description}
          pName={pName}
          pPic={pPic}
          pFollowNum={pFollowNum}
        />
      ) : (
        <></>
      )}
      <Line />
      {/* </Suspense> */}
    </VideoItem>
  );
};

export default LazyItem;

const Line = styled.hr`
  margin-top: ${({ theme }) => theme.margins.xs};
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[250]};
  opacity: 0.4;
`;
