import { selectCategory } from 'atom/profileVideoAtom';
import { useRecoilState } from 'recoil';

const useProfileVideo = () => {
  const [sCategory, setSelectCategory] = useRecoilState(selectCategory);

  const setCategory = (category: string) => {
    setSelectCategory(category);
  };
  const getCategory = () => {
    return sCategory;
  };
};

export default useProfileVideo;
