import React from 'react';
import { EGameList } from 'enum/game.enum';
import LazyItem from './LazyItem';
import { Props } from './Main';

export interface IPoster {
  name: string;
  picture?: string;
  followNum: number;
}

export interface IRelation {
  isFollow: boolean;
  isLike: boolean;
}

export interface IVideoPayload {
  id: number;
  createTime: string;
  updateTime: string;
  views: number;
  videoName: string;
  src: string;
  category: EGameList;
  videoIntro: string;
  likes: number;
  comments: number; // this should be comment type array
  poster: IPoster;
  relation: IRelation;
}

const VideoList = ({ videos, isNeedDescription }: Props) => {
  // const list = useRecoilValue(vListbySelectorState);
  return (
    <>
      <div>
        {videos[0].map(
          (
            data: IVideoPayload
            //   {
            //   id: React.Key | null | undefined;
            //   src: string;
            //   description: string;
            //   hashtag: string;
            //   likes: number;
            //   comments: number;
            //   poster: { name: string; picture: string; followNum: number };
            // }
          ) => (
            <LazyItem
              videoModalState={{
                src: data.src,
                videoId: data.id,
                followNumber: data.poster.followNum,
                likeNumber: data.likes,
                commentArray: [], // empty array for now
                videoIntro: data.videoIntro,
                uploaderId: data.poster.name,
                relation: data.relation,
              }}
              key={data.id}
              src={data.src}
              description={data.videoIntro}
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
          (
            data: IVideoPayload
            //   {
            //   id: React.Key | null | undefined;
            //   src: string;
            //   description: string;
            //   hashtag: string;
            //   likes: number;
            //   comments: number;
            //   poster: { name: string; picture: string; followNum: number };
            // }
          ) => (
            <LazyItem
              videoModalState={{
                src: data.src,
                videoId: data.id,
                followNumber: data.poster.followNum,
                likeNumber: data.likes,
                commentArray: [], // empty array for now
                videoIntro: data.videoIntro,
                uploaderId: data.poster.name,
                relation: data.relation,
              }}
              key={data.id}
              src={data.src}
              description={data.videoIntro}
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
