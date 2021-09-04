import React from 'react';
import { useRecoilState } from 'recoil';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import { searchUserAtom, searhHashtagsAtom } from 'atom/searchAreaAtom';
import SearchUser from './SearchUser';
import SearchHashtags from './SearchHashtags';

const Search = () => {
  const qs = window.location.search;

  // ?fname=johnny&lname=depp
  const [hashtagsUrl, setHashtagsUrl] = useRecoilState(searhHashtagsAtom);
  const [userUrl, setUserUrl] = useRecoilState(searchUserAtom);
  if (qs.includes('hashtags')) {
    setHashtagsUrl(`/tags/search${qs}`);
  } else {
    setUserUrl(`/users/search${qs}`);
  }
  return (
    <MainWrapper>
      {qs.includes('hashtags') ? <SearchHashtags /> : <SearchUser />}
    </MainWrapper>
  );
};

export default Search;
