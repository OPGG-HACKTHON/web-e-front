import React from 'react';
import { datas } from 'data/main';
import VideoWrapper from 'styles/mainStyles/videoComponents/videoWrapper';
import Modal from 'common/Modal';
import VideoModal from 'components/VideoModal';
import LazyItem from './LazyItem';
import VideoSelectBar from './VideoSelectBar';

const Main = () => {
  const { videos } = datas;
  const lVideos = videos.filter((video) => video.rank % 2 === 0);
  const rVideos = videos.filter((video) => video.rank % 2 !== 0);
  return (
    <div style={{ width: '65%', margin: 'auto' }}>
      <VideoSelectBar popularTags={datas.popularTags} />
      <Modal
        isOverlayOn
        isPopup
        width="50%"
        height="50%"
        borderRadius={5}
        borderStyle="none"
        contentComponent={<VideoModal />}
      />
      <VideoWrapper>
        <div>
          {lVideos.map((data) => (
            <LazyItem
              key={data.id}
              src={data.src}
              describe={data.describe}
              hashtag={data.hashtag}
              likes={data.likes}
              comments={data.comments}
              pName={data.poster.name}
              pPic={data.poster.picture}
              pFollowNum={data.poster.followNum}
            />
          ))}
        </div>
        <div>
          {rVideos.map((data) => (
            <LazyItem
              key={data.id}
              src={data.src}
              describe={data.describe}
              hashtag={data.hashtag}
              likes={data.likes}
              comments={data.comments}
              pName={data.poster.name}
              pPic={data.poster.picture}
              pFollowNum={data.poster.followNum}
            />
          ))}
        </div>
      </VideoWrapper>
    </div>
  );
};

export default Main;
