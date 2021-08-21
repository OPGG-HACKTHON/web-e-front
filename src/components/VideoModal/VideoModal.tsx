import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import VideoSection from './VideoSection';
import UploaderSection from './UploaderSection';
import CommentSection from './CommentSection';

const VideoModal = () => {
  return (
    <>
      <ModalLeftContent>
        <VideoSection />
      </ModalLeftContent>
      <ModalRightContent>
        <UploaderSection />
        <CommentSection />
      </ModalRightContent>
    </>
  );
};

const ModalContentWrapper = styled.div`
  position: fixed;
  height: 682px;
  width: 770px;
  border-radius: 5px;
  background: #fff;
  display: flex;
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
