import React, { lazy } from 'react';
import styled from 'styled-components';
import { VideoItem } from 'styles/mainStyles/videoComponents/VideoItem';
import { IVideoModalAtom } from 'atom/videoModalAtom';
import Description from './Description';

export interface Iprops {
  videoModalState?: IVideoModalAtom;
  src: string;
  description?: string;
  // hashtag?: string;
  likes: number;
  comments: number;
  pName?: string;
  pPic?: string;
  pFollowNum?: number;
  isFollow?: any;
  isNeedDescription?: boolean;
}

const LazyVideo = lazy(() => import('./LazyVideo'));

const LazyItem = ({
  videoModalState,
  src,
  description,
  // hashtag,
  likes,
  comments,
  pName,
  pPic,
  pFollowNum,
  isFollow,
  isNeedDescription,
}: Iprops) => {
  return (
    <VideoItem>
      <LazyVideo
        videoModalState={videoModalState}
        src={src}
        likes={likes}
        comments={comments}
      />
      {isNeedDescription ? (
        <Description
          description={description}
          pName={pName}
          pPic={pPic}
          pFollowNum={pFollowNum}
          isFollow={isFollow}
        />
      ) : (
        <></>
      )}
      <Line />
    </VideoItem>
  );
};

export default LazyItem;

const Line = styled.hr`
  margin-top: ${({ theme }) => theme.margins.xs};
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[250]};
  opacity: 0.4;
`;
