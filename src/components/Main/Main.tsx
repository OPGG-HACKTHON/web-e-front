import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { EUploadStep } from 'enum/uploadStep.enum';
import VideoWrapper from 'styles/mainStyles/videoComponents/videoWrapper';
import ModalContainer from 'common/ModalContainer';
import VideoModal from 'components/VideoModal';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import Upload from 'components/Upload';
import { uploadModalStep } from 'atom/uploadModalStepAtom';
import { uploadModalPopState } from 'atom/uploadModalPopStateAtom';
import { videoListState } from 'atom/videoListAtom';
import VideoSelectBar from './VideoSelectBar';
import VideoList from './VideoList';

const Main = () => {
  const [currentUploadModalStep, setUploadModalStep] =
    useRecoilState(uploadModalStep);
  const [isUploadModalPoped, setUploadModalPopState] =
    useRecoilState(uploadModalPopState);
  const [_, refechVideoList] = useRecoilState(videoListState);

  const closeUploadModal = () => {
    refechVideoList(0);
    setUploadModalPopState(false);
    setUploadModalStep(EUploadStep.FIRST_STEP);
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
        isPopup={isUploadModalPoped}
        onClickOverlay={closeUploadModal}
        contentComponent={<Upload onClickClose={closeUploadModal} />}
        width={currentUploadModalStep === EUploadStep.THIRD_STEP ? 45 : 75}
        height={currentUploadModalStep === EUploadStep.THIRD_STEP ? 18.6 : 53.6}
        borderRadius={0.5}
      />
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
