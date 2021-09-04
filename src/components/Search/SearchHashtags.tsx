import React from 'react';
import { useRecoilValue } from 'recoil';
import VideoListMain from 'common/VideoList/Main';
import VideoSelectBar from 'components/Main/VideoSelectBar';
import { hListbySelectorState } from 'atom/searchAreaAtom';

const SearchHashtags = () => {
  const videos = useRecoilValue(hListbySelectorState);
  return (
    <>
      <VideoSelectBar />
      <VideoListMain videos={videos} isNeedDescription />
    </>
  );
};

export default SearchHashtags;
