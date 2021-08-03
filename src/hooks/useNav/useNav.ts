import { leftNavItemState } from 'atom/pageAtom';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

const useNav = () => {
  const setLeftNavItem = useSetRecoilState(leftNavItemState);
  const handleSelectNavItem = useCallback(
    (arg: string) => {
      setLeftNavItem(arg);
    },
    [setLeftNavItem]
  );

  return { handleSelectNavItem };
};

export default useNav;
