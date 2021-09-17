import React, { useContext, useState, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import { useRecoilValue } from 'recoil';
import { videoModalAtom } from 'atom/videoModalAtom';

const VideoSection = () => {
  const videoModalState = useRecoilValue(videoModalAtom);
  const [isMuted, setMuteState] = useState<boolean>(true);
  const [isPlaying, setPlayState] = useState<boolean>(true);
  const videoRef = useRef(null!);

  const onClickPlayButton = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setPlayState((prev) => !prev);
  };

  return (
    <VideoWrapper>
      <video
        ref={videoRef}
        loop
        muted={isMuted}
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
        <source src={videoModalState.src} type="video/mp4" />
        <track kind="captions" />
      </video>
      <VideoController>
        {isPlaying ? (
          <PauseRoundedIcon
            onClick={onClickPlayButton}
            style={{ width: 30, height: 30, color: '#fff' }}
          />
        ) : (
          <PlayArrowRoundedIcon
            onClick={onClickPlayButton}
            style={{ width: 30, height: 30, color: '#fff' }}
          />
        )}

        {isMuted ? (
          <VolumeOffIcon
            onClick={() => setMuteState((prev) => !prev)}
            style={{ width: 30, height: 30, color: '#fff' }}
          />
        ) : (
          <VolumeUpRoundedIcon
            onClick={() => setMuteState((prev) => !prev)}
            style={{ width: 30, height: 30, color: '#fff' }}
          />
        )}
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
