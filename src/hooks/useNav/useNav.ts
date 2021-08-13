import { leftNavItemState } from 'atom/pageAtom';
import { EGameList } from 'enum/game.enum';
import { useCallback, useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { getBoundingRefObj } from 'types/underToggleLayer.types';

const useNav = () => {
  const setLeftNavItem = useSetRecoilState(leftNavItemState);
  const profileRef = useRef(document.createElement('img'));
  const [isClickProfile, setIsClickProfile] = useState(false);

  const alramRef = useRef(document.createElement('div'));
  const [isClickAlram, setIsClickAlram] = useState(false);

  const [clickProfilePosition, setClickProfilePosition] =
    useState<getBoundingRefObj>();
  const [clickAlramPosition, setClickAlramPosition] =
    useState<getBoundingRefObj>();
  const handleSelectNavItem = useCallback(
    (arg: EGameList) => {
      setLeftNavItem(arg);
    },
    [setLeftNavItem]
  );

  const handleClickProfile = useCallback(() => {
    setIsClickAlram(false);

    setIsClickProfile((prev) => !prev);
    setClickProfilePosition(profileRef.current.getBoundingClientRect());
  }, []);

  const handleClickAlram = useCallback(() => {
    setIsClickProfile(false);

    setIsClickAlram((prev) => !prev);
    setClickAlramPosition(alramRef.current.getBoundingClientRect());
  }, []);

  return {
    handleSelectNavItem,
    handleClickProfile,
    profileRef,
    isClickProfile,
    clickProfilePosition,
    alramRef,
    handleClickAlram,
    isClickAlram,
    clickAlramPosition,
  };
};

export default useNav;
