import { atom } from 'recoil';

export interface IInfiniteStream {
  isOpened: boolean;
  category: string;
}

const initInfiniteSteam = {
  isOpened: false,
  category: 'random',
};

export const infiniteStreamState = atom<IInfiniteStream>({
  key: 'infiniteStreamState',
  default: initInfiniteSteam,
});
