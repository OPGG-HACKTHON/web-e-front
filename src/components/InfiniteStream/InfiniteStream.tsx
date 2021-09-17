/* eslint-disable */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { videoListState } from 'atom/videoListAtom';
import { debounce } from 'lodash';
import { leftNavItemState } from 'atom/pageAtom';
import { findUser, myProfileAtom } from 'atom/profileAtom';
import useProfile from 'hooks/useProfile/useProfile';
import { getRecommendVideos } from 'api/recommend/recommend';
import { infiniteStreamState } from 'atom/infiniteStreamAtom';
import useRecommend from 'hooks/useRecommend/useRecommend';
import styled from 'styled-components';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const InfiniteStream = () => {
  const [infState, setInfState] = useRecoilState(infiniteStreamState);
  const myProfile = useRecoilValue(myProfileAtom);
  const {
    handleRecommend,
    lolRecommends,
    overwatchRecommends,
    pubgRecommends,
  } = useRecommend();

  const [isLooping, setLoopState] = useState(false);
  const [isMuted, setMuteState] = useState(true);
  const [triggerNextVideo, setTriggerState] = useState(false);
  const [recommendIndex, setRecommendIndex] = useState(0);
  const [selectNavName, setSelectName] = useRecoilState(leftNavItemState);

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

  useEffect(() => {
    setRecommendIndex(0);
  }, []);

  const randomIndexOfList = (list: Array<any>) => {
    return Math.floor(Math.random() * list.length);
  };

  const randomVideo = useMemo(() => {
    return videos[randomIndexOfList(videos)];
  }, [videos, triggerNextVideo]);

  const currentVideo = useMemo(() => {
    // console.log(handleRecommend());

    // return randomVideo;

    if (infState.category === 'random' || !myProfile.id) {
      return randomVideo;
    }
    // const lolRecommends = await handleRecommend().then(
    //   (res) => res.lolRecommand
    // );

    // const lolRecommends = handleRecommend().lol;

    const index = recommendIndex;
    if (selectNavName === 'lol') {
      if (lolRecommends?.length < 5) {
        return randomVideo;
      }
      if (index === lolRecommends?.length - 1) {
        setRecommendIndex(0);
      } else {
        setRecommendIndex((prev) => prev + 1);
      }
      return lolRecommends[index];
    }
    if (selectNavName === 'overwatch') {
      if (overwatchRecommends?.length < 5) {
        return randomVideo;
      }
      if (index === overwatchRecommends?.length - 1) {
        setRecommendIndex(0);
      } else {
        setRecommendIndex((prev) => prev + 1);
      }
      return overwatchRecommends[index];
    }
    if (pubgRecommends?.length < 5) {
      return randomVideo;
    }
    if (index === pubgRecommends?.length - 1) {
      setRecommendIndex(0);
    } else {
      setRecommendIndex((prev) => prev + 1);
    }
    return pubgRecommends[index];
  }, [
    selectNavName,
    triggerNextVideo,
    lolRecommends,
    overwatchRecommends,
    pubgRecommends,
    handleRecommend,
  ]);

  return (
    <Container onWheel={handleScroll}>
      <Header title={currentVideo.videoIntro} />
      <Body
        isLooping={isLooping}
        isMuted={isMuted}
        src={currentVideo.src}
        onEnded={() => setTriggerState((prev) => !prev)}
      />
      <Footer
        isLiked={currentVideo.relation.isLike}
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
