import React from 'react';
import VidoeContent from 'styles/mainStyles/videoComponents/VideoContent';
import { Iprops } from './LazyItem';

const LazyVideo = ({ src }: Iprops) => {
  return (
    <VidoeContent>
      <div className="video_btn" />
      <video autoPlay muted loop width="100%" height="100%" controls>
        <source src={src} type="video/mp4" />
      </video>
    </VidoeContent>
  );
};

export default LazyVideo;
