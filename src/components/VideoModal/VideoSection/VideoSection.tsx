import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';

type Props = {
  videoSrc: string;
};

const VideoSection = ({ videoSrc }: Props) => {
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
          objectFit: 'contain',
          zIndex: 0,
          background: '#000',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        <track kind="captions" />
      </video>
      <VideoController>
        <PlayArrowRoundedIcon
          style={{ width: 30, height: 30, color: '#fff' }}
        />
        <VolumeUpRoundedIcon style={{ width: 30, height: 30, color: '#fff' }} />
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

export default VideoSection;
