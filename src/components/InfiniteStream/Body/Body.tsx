import React, { useRef, useState, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';

interface BodyProps {
  isMuted: boolean;
  isLooping: boolean;
  onEnded: () => void;
  src: string;
}

const fade = keyframes`
from {
  transform: scale(1);
  opacity: 1;
}
to {
  transform: scale(2);
  opacity: 0;
}
`;

const Body = ({ isMuted, isLooping, onEnded, src }: BodyProps) => {
  const [isPlaying, setPlayState] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null!);

  const toggleVideoPlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else videoRef.current.play();
    setPlayState((prev) => !prev);
  };

  useEffect(() => {
    // 첫 랜더시 동영상 재생 안되는 경우 방지.
    videoRef.current.play();
  }, []);

  const iconStyle = useMemo(() => {
    return {
      height: '10rem',
      width: '10rem',
      color: '#fff',
    };
  }, []);

  return (
    <Container onClick={toggleVideoPlay}>
      <video
        onEnded={onEnded}
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop={isLooping}
        src={src}
      >
        <track kind="captions" />
      </video>
      <VideoStateIconWrapper>
        {!isPlaying ? (
          <VideoStateIcon key={+isPlaying}>
            <PauseRoundedIcon style={iconStyle} />
          </VideoStateIcon>
        ) : (
          <VideoStateIcon key={+isPlaying}>
            <PlayArrowRoundedIcon style={iconStyle} />
          </VideoStateIcon>
        )}
      </VideoStateIconWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const VideoStateIconWrapper = styled.div`
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const VideoStateIcon = styled.div`
  animation: ${fade} 1s forwards;
`;

export default Body;
