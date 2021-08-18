import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import VideoSection from './VideoSection';
import UploaderSection from './UploaderSection';
import CommentSection from './CommentSection';

type Props = {
  videoSrc: string;
};

const VideoModal = ({ videoSrc }: Props) => {
  return (
    <ModalContentWrapper>
      <ModalLeftContent>
        <VideoSection videoSrc={videoSrc} />
      </ModalLeftContent>
      <ModalRightContent>
        <UploaderSection />
        <CommentSection />
      </ModalRightContent>
    </ModalContentWrapper>
  );
};

const ModalContentWrapper = styled.div`
  display: contents;
`;

const ModalLeftContent = styled.div`
  width: 100%;
  position: relative;
`;

const ModalRightContent = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  flex-direction: column;
`;

export default VideoModal;
