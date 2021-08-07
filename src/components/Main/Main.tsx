import React, { useState } from 'react';
import { datas } from 'data/main';
import VideoWrapper from 'styles/mainStyles/videoComponents/videoWrapper';
import ModalContainer from 'common/ModalContainer';
import VideoModal from 'components/VideoModal';
import LazyItem from './LazyItem';
import VideoSelectBar from './VideoSelectBar';

const Main = () => {
  const { videos } = datas;
  const lVideos = videos.filter((video) => video.rank % 2 === 0);
  const rVideos = videos.filter((video) => video.rank % 2 !== 0);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (e: React.MouseEvent<HTMLElement>) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.tagName === 'VIDEO') {
      setModalOpen(true);
    }
  };

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    setModalOpen(false);
  };

  return (
    <div style={{ width: '65%', margin: 'auto' }}>
      <VideoSelectBar popularTags={datas.popularTags} />
      <ModalContainer
        isPopup={isModalOpen}
        onClickOverlay={closeModal}
        contentComponent={<VideoModal />}
      />
      <VideoWrapper onClick={openModal}>
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
