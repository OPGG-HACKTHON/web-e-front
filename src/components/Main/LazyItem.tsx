import React, { lazy, Suspense } from 'react';
import VideoItem from 'styles/mainStyles/videoComponents/VideoItem';

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
        <div>{likes}</div>
        <div>{comments}</div>
        <div className="poster_info">
          <div className="poster_img">
            <img src={pPic} alt="alt" className="userPicImg" />
          </div>
          <div className="poster_name">{pName}</div>
          <div className="poster_followers">{pFollowNum}</div>
        </div>
      </Suspense>
      {describe}
      {hashtag}
    </VideoItem>
  );
};

export default LazyItem;
