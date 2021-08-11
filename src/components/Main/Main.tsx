import React, { useState } from 'react';
// import { datas } from 'data/main';
import VideoWrapper from 'styles/mainStyles/videoComponents/videoWrapper';
import ModalContainer from 'common/ModalContainer';
import VideoModal from 'components/VideoModal';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import VideoSelectBar from './VideoSelectBar';
import VideoList from './VideoList';

const Main = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [videoModalSrc, setVideoModalSrc] = useState('');

  const openModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).tagName === 'VIDEO') {
      setModalOpen(true);
      setVideoModalSrc((e.target as HTMLMediaElement).currentSrc);
    }
  };

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    setModalOpen(false);
  };
  return (
    <MainWrapper>
      <VideoSelectBar />
      <ModalContainer
        isPopup={isModalOpen}
        onClickOverlay={closeModal}
        contentComponent={<VideoModal videoSrc={videoModalSrc} />}
      />
      <VideoWrapper onClick={openModal}>
        <VideoList />
      </VideoWrapper>
    </MainWrapper>
  );
};

export default Main;
