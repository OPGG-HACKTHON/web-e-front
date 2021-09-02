import React from 'react';
import queryString from 'query-string';
import { useRecoilState, useRecoilValue } from 'recoil';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import VideoListMain from 'common/VideoList/Main';
import VideoSelectBar from 'components/Main/VideoSelectBar';
import { hListbySelectorState, searhUrl } from 'atom/searchAreaAtom';

const Search = () => {
  const qs = window.location.search;
  // ?fname=johnny&lname=depp
  const [url, setUrl] = useRecoilState(searhUrl);
  setUrl(`/tags/search${qs}`);

  const videos = useRecoilValue(hListbySelectorState);

  return (
    <MainWrapper>
      <VideoSelectBar />
      <VideoListMain videos={videos} isNeedDescription />
    </MainWrapper>
  );
};

export default Search;
