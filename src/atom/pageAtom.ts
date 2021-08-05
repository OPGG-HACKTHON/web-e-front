import { EGameList } from 'enum/game.enum';
import { atom } from 'recoil';

// eslint-disable-next-line import/prefer-default-export
export const leftNavItemState = atom<EGameList>({
  key: 'leftNavItemState',
  default: EGameList.LOL,
});
