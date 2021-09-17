import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { EUploadStep } from 'enum/uploadStep.enum';
import ModalContainer from 'common/ModalContainer';
import InfiniteStream from 'components/InfiniteStream';
import { infiniteStreamState } from 'atom/infiniteStreamAtom';
import InfiniteStreamIcon from 'assets/svg/wapple_play_icon.svg';

import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import Upload from 'components/Upload';
import { uploadModalStep } from 'atom/uploadModalStepAtom';
import { uploadModalPopState } from 'atom/uploadModalPopStateAtom';
import { videoListState, vListbySelectorState } from 'atom/videoListAtom';
import VideoListMain from 'common/VideoList/Main';
import VideoSelectBar from './VideoSelectBar';

const Main = () => {
  const videos = useRecoilValue(vListbySelectorState);

  const [currentUploadModalStep, setUploadModalStep] =
    useRecoilState(uploadModalStep);
  const [isUploadModalPoped, setUploadModalPopState] =
    useRecoilState(uploadModalPopState);
  const refechVideoList = useSetRecoilState(videoListState);
  const [isUploading, setUploadingState] = useState<boolean>(false);
  const [isInfiniteOpened, setInfiniteState] =
    useRecoilState(infiniteStreamState);

  const closeUploadModal = () => {
    if (!isUploading) {
      refechVideoList(0);
      setUploadModalPopState(false);
      setUploadModalStep(EUploadStep.FIRST_STEP);
    }
  };

  return (
    <MainWrapper>
      {isInfiniteOpened && <InfiniteStream />}
      <ModalContainer
        isPopup={isUploadModalPoped}
        onClickOverlay={closeUploadModal}
        contentComponent={
          <Upload
            onClickClose={closeUploadModal}
            isUploading={isUploading}
            setUploadingState={setUploadingState}
          />
        }
        width={currentUploadModalStep === EUploadStep.THIRD_STEP ? 45 : 75}
        height={currentUploadModalStep === EUploadStep.THIRD_STEP ? 18.6 : 53.6}
        borderRadius={0.5}
      />
      <VideoSelectBar />
      <VideoListMain videos={videos} isNeedDescription />
      <InfiniteStreamButton onClick={() => setInfiniteState(true)}>
        <img
          style={{
            opacity: 1,
            position: 'relative',
            left: 3,
          }}
          src={InfiniteStreamIcon}
          alt="무한스트리밍 플레이 아이콘"
        />
      </InfiniteStreamButton>
    </MainWrapper>
  );
};

export default Main;

const InfiniteStreamButton = styled.div`
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  position: fixed;
  bottom: 5rem;
  right: 10%;
  cursor: pointer;
  background: ${(props) => props.theme.color.yellow};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  :hover {
    background: linear-gradient(
      135deg,
      rgba(255, 210, 95, 1) 0%,
      rgba(255, 172, 95, 1) 100%
    );
  }
`;
