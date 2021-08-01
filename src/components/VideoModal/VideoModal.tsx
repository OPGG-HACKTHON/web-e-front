import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import VideoSection from './VideoSection';
import UploaderSection from './UploaderSection';
import CommentSection from './CommentSection';

const VideoModal = () => {
  return (
    <>
      <ModalBackGround>
        <ModalContentWrapper>
          <ModalLeftContent>
            <VideoSection />
          </ModalLeftContent>
          <ModalRightContent>
            <UploaderSection />
            <CommentSection />
          </ModalRightContent>
        </ModalContentWrapper>
      </ModalBackGround>
    </>
  );
};

const ModalBackGround = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContentWrapper = styled.div`
  position: fixed;
  height: 600px;
  width: 770px;
  border-radius: 5px;
  background: #fff;
  display: flex;
`;

const ModalLeftContent = styled.div`
  width: 100%;
`;

const ModalRightContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default VideoModal;
