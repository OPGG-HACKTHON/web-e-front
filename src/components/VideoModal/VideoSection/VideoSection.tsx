import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import sampleVideoUrl from 'assets/video/shorts_1min.mp4';

const VideoSection = () => {
  return (
    <VideoWrapper>
      <video
        loop
        muted
        autoPlay
        playsInline
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={sampleVideoUrl} type="video/mp4" />
        <track kind="captions" />
      </video>
      <VideoController>
        <PlayButton />
        <VolumeButton />
      </VideoController>
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 5px 0 0 5px;
`;

const VideoController = styled.div`
  position: absolute;
  display: flex;
  bottom: 20px;
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
`;

const PlayButton = styled.div`
  height: 24px;
  width: 24px;
  background: #fff;
  cursor: pointer;
`;

const VolumeButton = styled.div`
  height: 24px;
  width: 24px;
  background: #fff;
  cursor: pointer;
`;

export default VideoSection;
