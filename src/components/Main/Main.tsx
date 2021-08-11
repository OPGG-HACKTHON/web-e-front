import React, { useState } from 'react';
// import { datas } from 'data/main';
import VideoWrapper from 'styles/mainStyles/videoComponents/videoWrapper';
import ModalContainer from 'common/ModalContainer';
import VideoModal from 'components/VideoModal';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import Upload from 'components/Upload';
import VideoSelectBar from './VideoSelectBar';
import VideoList from './VideoList';

const Main = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  const openUploadModal = (e: React.MouseEvent<HTMLElement>) => {
    setUploadModalOpen(true);
  };

  const closeUploadModal = (e: React.MouseEvent<HTMLElement>) => {
    setUploadModalOpen(false);
  };

  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [videoModalSrc, setVideoModalSrc] = useState('');

  const openVideoModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).tagName === 'VIDEO') {
      setVideoModalOpen(true);
      setVideoModalSrc((e.target as HTMLMediaElement).currentSrc);
    }
  };

  const closeVideoModal = (e: React.MouseEvent<HTMLElement>) => {
    setVideoModalOpen(false);
  };
  return (
    <MainWrapper>
      <ModalContainer
        isPopup={isUploadModalOpen}
        onClickOverlay={closeUploadModal}
        contentComponent={<Upload />}
        width={75}
        height={53.6}
        borderRadius={0.5}
      />
      <button type="button" onClick={openUploadModal}>
        upload
      </button>
      <VideoSelectBar />
      <ModalContainer
        isPopup={isVideoModalOpen}
        onClickOverlay={closeVideoModal}
        contentComponent={<VideoModal videoSrc={videoModalSrc} />}
        width={77}
        height={68.2}
        borderRadius={0.5}
      />
      <VideoWrapper onClick={openVideoModal}>
        <VideoList />
      </VideoWrapper>
    </MainWrapper>
  );
};

export default Main;
