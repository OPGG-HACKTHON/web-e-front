import { vListbySelectorState } from 'atom/videoListAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import LazyItem from './LazyItem';

const VideoList = () => {
  const list = useRecoilValue(vListbySelectorState);
  return (
    <>
      <div>
        {list[0].map(
          (data: {
            id: React.Key | null | undefined;
            src: string;
            describe: string;
            hashtag: string;
            likes: number;
            comments: number;
            poster: { name: string; picture: string; followNum: number };
          }) => (
            <LazyItem
              key={data.id}
              src={data.src}
              describe={data.describe}
              // hashtag={data.hashtag}
              likes={data.likes}
              comments={data.comments}
              pName={data.poster.name}
              pPic={data.poster.picture}
              pFollowNum={data.poster.followNum}
            />
          )
        )}
      </div>
      <div>
        {list[1].map(
          (data: {
            id: React.Key | null | undefined;
            src: string;
            describe: string;
            hashtag: string;
            likes: number;
            comments: number;
            poster: { name: string; picture: string; followNum: number };
          }) => (
            <LazyItem
              key={data.id}
              src={data.src}
              describe={data.describe}
              // hashtag={data.hashtag}
              likes={data.likes}
              comments={data.comments}
              pName={data.poster.name}
              pPic={data.poster.picture}
              pFollowNum={data.poster.followNum}
            />
          )
        )}
      </div>
    </>
  );
};

export default VideoList;
