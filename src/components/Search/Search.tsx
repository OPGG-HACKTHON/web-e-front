import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import { hListbySelectorState, searhHashtagsAtom } from 'atom/searchAreaAtom';
import VideoListMain from 'common/VideoList/Main';
import VideoSelectBar from 'components/Main/VideoSelectBar';
import SearchUser from './SearchUser';
import SearchHashtags from './SearchHashtags';

const Search = () => {
  const qs = window.location.search;

  // ?fname=johnny&lname=depp
  const [url, setUrl] = useRecoilState(searhHashtagsAtom);
  if (qs.includes('hashtags')) {
    setUrl(`/tags/search${qs}`);
    console.log(qs);
  }
  // else if (qs.includes('user')) {
  //   console.log(qs);
  // setUrl(`/user/search${qs}`);
  // }
  return (
    <MainWrapper>
      {qs.includes('hashtags') ? <SearchHashtags /> : <SearchUser />}
    </MainWrapper>
  );
};

export default Search;
