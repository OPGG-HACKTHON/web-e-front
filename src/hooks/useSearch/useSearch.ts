import {
  searchAreaAtom,
  searchUserAtom,
  searhHashtagsAtom,
} from 'atom/searchAreaAtom';
import { useRecoilState } from 'recoil';

const useSearch = () => {
  const [keywords, setKeywords] = useRecoilState(searchAreaAtom);
  // const [url, setUrl] = useRecoilState(searhHashtagsAtom);
  const [url, setUrl] = useRecoilState(searchUserAtom);
  // setUrl(`/users/search${qs}`);

  const handleAddKeyword = (text) => {
    const keywordsArr = keywords.map((k) => k.keywords);
    if (!keywordsArr.includes(text) && text.includes('#')) {
      const newKeyword = {
        id: Date.now(),
        keywords: text,
      };
      setKeywords([newKeyword, ...keywords]);
    }
  };

  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
      return thisKeyword.id !== id;
    });
    console.log(id);

    setKeywords(nextKeyword);
  };

  const goToLink = (value) => {
    // 실행할 함수
    const plusValue = value.replaceAll(' ', '%2B');
    if (value.startsWith('#')) {
      const reValue = plusValue.replaceAll('#', '%23');
      const getUrl = `/search?hashtags=${reValue}`;
      window.location.href = getUrl;
    } else if (value.startsWith('@')) {
      const reValue = value.replaceAll('@', '');
      const getUrl = `/search?user=${reValue}`;
      window.location.href = getUrl;
    }
    // TODO: 다른 검색어 입력시
  };

  return {
    keywords,
    setKeywords,
    handleAddKeyword,
    handleRemoveKeyword,
    goToLink,
  };
};

export default useSearch;
