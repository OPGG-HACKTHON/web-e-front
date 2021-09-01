import React from 'react';
import queryString from 'query-string';
import { useRecoilValue } from 'recoil';
import { vListbySelectorState } from 'atom/videoListAtom';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import VideoListMain from 'common/VideoList/Main';

const Search = () => {
  const qs = window.location.search;
  console.log(queryString);
  // ?fname=johnny&lname=depp
  const urlParams = new URLSearchParams(qs);
  const hashtags = urlParams.get('hashtags');
  console.log(hashtags);

  // TODO: Fix videos
  const videos = useRecoilValue(vListbySelectorState);

  return (
    <MainWrapper>
      <VideoListMain videos={videos} isNeedDescription />
    </MainWrapper>
  );
};

export default Search;
