import { searchAreaAtom, searhUrl } from 'atom/searchAreaAtom';
import { useRecoilState } from 'recoil';

const useSearch = () => {
  const [keywords, setKeywords] = useRecoilState(searchAreaAtom);
  const [url, setUrl] = useRecoilState(searhUrl);

  const handleAddKeyword = (text) => {
    const keywordsArr = keywords.map((k) => k.keywords);
    if (!keywordsArr.includes(text)) {
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
    if (value.startsWith('#')) {
      const reValue = value.replaceAll('#', '%23');
      const getUrl = `/search?hashtags=${reValue}`;
      //   setUrl(getUrl);
      window.location.href = getUrl;
    }
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
