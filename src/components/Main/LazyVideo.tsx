import React from 'react';
import styled from 'styled-components';
// import VidoeContent from 'styles/mainStyles/videoComponents/VideoContent';
import { Iprops } from './LazyItem';

const LazyVideo = ({ src }: Iprops) => {
  return (
    <>
      <VidoeBtn onClick={() => console.log('btn')}>
        <video autoPlay muted loop width="100%" height="100%">
          <source src={src} type="video/mp4" />
        </video>
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
