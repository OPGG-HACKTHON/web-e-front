import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { videoModalAtom } from 'atom/videoModalAtom';
// import VidoeContent from 'styles/mainStyles/videoComponents/VideoContent';
import Like from 'assets/svg/like_w.svg';
import Comment from 'assets/svg/comment_w.svg';
import { Iprops } from './LazyItem';

const LazyVideo = ({ videoModalState, src, likes, comments }: Iprops) => {
  const setVideoModalState = useSetRecoilState(videoModalAtom);

  const onClickBtn = () => {
    setVideoModalState(videoModalState);
  };

  return (
    <>
      <VidoeBtn onClick={onClickBtn}>
        <video autoPlay muted loop width="100%" height="100%">
          <source src={src} type="video/mp4" />
        </video>
        <div className="like_and_comment_div">
          <span className="like_icon">
            <img src={Like} alt={Like} />
          </span>
          <div>{likes}</div>
          <span className="comment_icon">
            <img src={Comment} alt={Comment} />
          </span>
          <div>{comments}</div>
        </div>
      </VidoeBtn>
    </>
  );
};

export default LazyVideo;

const VidoeBtn = styled.div`
  position: relative;
  display: block;
  top: 100%;
  width: 100%;
  height: 100%;
  /* z-index: 10000; */
  cursor: pointer;
`;
