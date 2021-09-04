import React from 'react';
import { useRecoilState } from 'recoil';
import MainWrapper from 'styles/mainStyles/videoComponents/MainWrapper';
import { searchUserAtom, searhHashtagsAtom } from 'atom/searchAreaAtom';
import { useLocation } from 'react-router-dom';
import SearchUser from './SearchUser';
import SearchHashtags from './SearchHashtags';

const Search = () => {
  const location = useLocation();
  const qs = location.search;
  console.log(qs);

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
