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
    recommends,
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

  useEffect(() => {
    handleRecommend();
    // console.log(lolRecommends);
  }, []);

  // useEffect(() => {
  //   const fetchRecommendVideos = async () => {
  //     try {
  //       const res = await getRecommendVideos();
  //       const data = res.datas;
  //       if (res.statusCode !== 200) {
  //         throw new Error(
  //           '네트워크 오류가 발생했습니다. 잠시 후 시도해주세요.'
  //         );
  //       }
  //       console.log(data);
  //       const isLoggedIn = myProfile?.id !== null;
  //       // if (isLoggedIn) {
  //       //   if (selectNavName === 'lol') {
  //       //     setLolRecommends(data.lolRecommand);
  //       //   }
  //       //   if (selectNavName === 'overwatch') {
  //       //     setOverwatchRecommends(res?.datas?.watchRecommand);
  //       //   }
  //       //   if (selectNavName === 'pubg') {
  //       //     setBgRecommends(res?.datas?.pubgRecommand);
  //       //   }
  //       // }
  //     } catch (err) {
  //       alert(err);
  //     }
  //   };
  //   fetchRecommendVideos();
  // }, []);

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

  const currentVideo = useMemo(() => {
    return randomVideo;

    if (infState.category === 'random' || !myProfile.id) {
      return randomVideo;
    }
    // const lolRecommends = await handleRecommend().then(
    //   (res) => res.lolRecommand
    // );

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
      return overwatchRecommends[recommendIndex];
    }
    if (pubgRecommends?.length < 5) {
      return randomVideo;
    }
    if (index === pubgRecommends?.length - 1) {
      setRecommendIndex(0);
    } else {
      setRecommendIndex((prev) => prev + 1);
    }
    return pubgRecommends[recommendIndex];
  }, [
    selectNavName,
    recommendIndex,
    lolRecommends,
    overwatchRecommends,
    pubgRecommends,
    triggerNextVideo,
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
