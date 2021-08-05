import { leftNavItemState } from 'atom/pageAtom';
import { EGameList } from 'enum/game.enum';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

const useNav = () => {
  const setLeftNavItem = useSetRecoilState(leftNavItemState);
  const handleSelectNavItem = useCallback(
    (arg: EGameList) => {
      setLeftNavItem(arg);
    },
    [setLeftNavItem]
  );

  return { handleSelectNavItem };
};

export default useNav;
