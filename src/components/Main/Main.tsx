import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { EUploadStep } from 'enum/uploadStep.enum';
import ModalContainer from 'common/ModalContainer';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import Upload from 'components/Upload';
import { uploadModalStep } from 'atom/uploadModalStepAtom';
import { uploadModalPopState } from 'atom/uploadModalPopStateAtom';
import {
  getVideoTrigger,
  videoList,
  videoListState,
  vListbySelectorState,
} from 'atom/videoListAtom';
import VideoListMain from 'common/VideoList/Main';
import getVideos from 'api/video/video';
import VideoSelectBar from './VideoSelectBar';

const Main = () => {
  const [currentUploadModalStep, setUploadModalStep] =
    useRecoilState(uploadModalStep);
  const [isUploadModalPoped, setUploadModalPopState] =
    useRecoilState(uploadModalPopState);
  const refechVideoList = useSetRecoilState(videoListState);
  const [refech, setRefetch] = useRecoilState(getVideoTrigger);
  const setFetchre = () => setRefetch((n) => n + 1);
  const closeUploadModal = () => {
    // setRefetch(0);
    refechVideoList(0);
    setRefetch((v) => {
      // if (!v) {
      //   console.log(`inone${v}`);
      //   return 1000;
      // }
      return v + 1;
    });
    console.log(refech);

    setUploadModalPopState(false);
    setUploadModalStep(EUploadStep.FIRST_STEP);
  };
  const [v, setV] = useRecoilState(videoListState);
  const videos = useRecoilValue(vListbySelectorState);
  console.log(refech, v, videos);

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
      <VideoListMain videos={videos} isNeedDescription />
    </MainWrapper>
  );
};

export default Main;
