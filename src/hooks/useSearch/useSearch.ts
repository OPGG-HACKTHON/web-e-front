import { searchAreaAtom } from 'atom/searchAreaAtom';
import { useRecoilState } from 'recoil';

const useSearch = () => {
  const [keywords, setKeywords] = useRecoilState(searchAreaAtom);

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
    const reValue = value.replaceAll('#', '%23');
    window.location.href = `/search?hashtags=${reValue}`;
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
