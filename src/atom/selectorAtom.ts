import { ESelectorList } from 'enum/selector.enum';
import { atom, selector } from 'recoil';

// eslint-disable-next-line import/prefer-default-export
export const selectorState = atom<ESelectorList>({
  key: 'videoSelectorState',
  default: ESelectorList.POPULAR,
});
