import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { EUploadStep } from 'enum/uploadStep.enum';
import ModalContainer from 'common/ModalContainer';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import Upload from 'components/Upload';
import { uploadModalStep } from 'atom/uploadModalStepAtom';
import { uploadModalPopState } from 'atom/uploadModalPopStateAtom';
import { videoListState, vListbySelectorState } from 'atom/videoListAtom';
import VideoListMain from 'common/VideoList/Main';
import VideoSelectBar from './VideoSelectBar';

const Main = () => {
  const [currentUploadModalStep, setUploadModalStep] =
    useRecoilState(uploadModalStep);
  const [isUploadModalPoped, setUploadModalPopState] =
    useRecoilState(uploadModalPopState);
  const refechVideoList = useSetRecoilState(videoListState);

  const closeUploadModal = () => {
    refechVideoList(0);
    setUploadModalPopState(false);
    setUploadModalStep(EUploadStep.FIRST_STEP);
  };

  const videos = useRecoilValue(vListbySelectorState);
  const isNeedDescription = true;
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
      <VideoListMain videos={videos} isNeedDescription={isNeedDescription} />
    </MainWrapper>
  );
};

export default Main;
