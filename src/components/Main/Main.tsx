import React from 'react';
// import { datas } from 'data/main';
import VideoWrapper from 'styles/mainStyles/videoComponents/videoWrapper';
import VideoSelectBar from './VideoSelectBar';
import VideoList from './VideoList';

const Main = () => {
  return (
    <div style={{ width: '65%', margin: '0 auto' }}>
      <VideoSelectBar />
      <VideoWrapper>
        <VideoList />
      </VideoWrapper>
    </div>
  );
};

export default Main;