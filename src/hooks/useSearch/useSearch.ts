import {
  searchAreaAtom,
  searchUserAtom,
  searhHashtagsAtom,
} from 'atom/searchAreaAtom';
import { fetchUserInfoAtom } from 'atom/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

const useSearch = () => {
  const [keywords, setKeywords] = useRecoilState(searchAreaAtom);
  const [url, setUrl] = useRecoilState(searchUserAtom);
  const userInfo = useRecoilValue(fetchUserInfoAtom);
  const { userId } = userInfo;

  const handleAddKeyword = (text: string | string[]) => {
    const keywordsArr = keywords.map((k: { keywords: any }) => k.keywords);
    if (userId) {
      if (!keywordsArr.includes(text) && text.includes('#')) {
        const newKeyword = {
          id: Date.now(),
          keywords: text,
          user: userId,
        };
        setKeywords([newKeyword, ...keywords]);
      }
    }
  };

  const handldeClearKeyword = () => {
    setKeywords([]);
  };

  const handleRemoveKeyword = (id: any) => {
    const nextKeyword = keywords.filter((thisKeyword: { id: any }) => {
      return thisKeyword.id !== id;
    });
    console.log(id);

    setKeywords(nextKeyword);
  };

  const goToLink = (value: string) => {
    // 실행할 함수
    const plusValue = value.replaceAll(' ', '%2B');
    let getUrl = '';
    if (value.startsWith('#')) {
      const reValue = plusValue.replaceAll('#', '%23');
      getUrl = `/search?hashtags=${reValue}`;
    } else if (value.startsWith('@')) {
      const reValue = value.replaceAll('@', '');
      getUrl = `/search?user=${reValue}`;
    } else {
      alert(`@유저 혹은 #해시태그로 검색해주세요!`);
    }
    return getUrl;
  };

  return {
    keywords,
    setKeywords,
    handleAddKeyword,
    handldeClearKeyword,
    handleRemoveKeyword,
    goToLink,
  };
};

export default useSearch;
