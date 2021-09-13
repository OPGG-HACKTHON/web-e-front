/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { videoListState } from 'atom/videoListAtom';
import { debounce } from 'lodash';
import styled from 'styled-components';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const InfiniteStream = () => {
  const [isLooping, setLoopState] = useState(false);
  const [isMuted, setMuteState] = useState(true);
  const [triggerNextVideo, setTriggerState] = useState(false);

  const videos = useRecoilValue(videoListState);

  const debounceHandler = useCallback(
    debounce(() => {
      setTriggerState((prev) => !prev);
    }, 100),
    []
  );

  const handleScroll = useCallback(
    (e) => {
      const direction = e.deltaY;
      if (direction > 60) debounceHandler();
    },
    [debounceHandler]
  );

  const randomIndexOfList = (list: Array<any>) => {
    return Math.floor(Math.random() * list.length);
  };

  const randomVideo = useMemo(() => {
    return videos[randomIndexOfList(videos)];
  }, [videos, triggerNextVideo]);

  return (
    <Container onWheel={handleScroll}>
      <Header title={randomVideo.videoIntro} />
      <Body
        isLooping={isLooping}
        isMuted={isMuted}
        src={randomVideo.src}
        onEnded={() => setTriggerState((prev) => !prev)}
      />
      <Footer
        isMuted={isMuted}
        isLooping={isLooping}
        onClickLoop={() => setLoopState((prev) => !prev)}
        onClickMute={() => setMuteState((prev) => !prev)}
      />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  width: 100%;
  background-color: black;
  z-index: 100;
`;

export default InfiniteStream;

// Dispatch<SetStateAction<boolean>>
