import React from 'react';
import LazyItem from './LazyItem';
import { Props } from './Main';

const VideoList = ({ videos, isNeedDescription }: Props) => {
  // const list = useRecoilValue(vListbySelectorState);
  return (
    <>
      <div>
        {videos[0].map(
          (data: {
            id: React.Key | null | undefined;
            src: string;
            description: string;
            hashtag: string;
            likes: number;
            comments: number;
            poster: { name: string; picture: string; followNum: number };
          }) => (
            <LazyItem
              key={data.id}
              src={data.src}
              description={data.description}
              // hashtag={data.hashtag}
              likes={data.likes}
              comments={data.comments}
              pName={data.poster.name}
              pPic={data.poster.picture}
              pFollowNum={data.poster.followNum}
              isNeedDescription={isNeedDescription}
            />
          )
        )}
      </div>
      <div>
        {videos[1].map(
          (data: {
            id: React.Key | null | undefined;
            src: string;
            description: string;
            hashtag: string;
            likes: number;
            comments: number;
            poster: { name: string; picture: string; followNum: number };
          }) => (
            <LazyItem
              key={data.id}
              src={data.src}
              description={data.description}
              // hashtag={data.hashtag}
              likes={data.likes}
              comments={data.comments}
              pName={data.poster.name}
              pPic={data.poster.picture}
              pFollowNum={data.poster.followNum}
              isNeedDescription={isNeedDescription}
            />
          )
        )}
      </div>
    </>
  );
};

export default VideoList;
