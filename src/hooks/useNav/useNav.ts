/* eslint-disable consistent-return */
import { leftNavItemState } from 'atom/pageAtom';
import { EGameList } from 'enum/game.enum';
import { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getBoundingRefObj } from 'types/underToggleLayer.types';
import { searchAreaAtom } from 'atom/searchAreaAtom';

const useNav = () => {
  const history = useHistory();
  const [keywordsItem, setKeywordItem] = useRecoilState(searchAreaAtom);

  const setLeftNavItem = useSetRecoilState(leftNavItemState);
  const profileRef = useRef(document.createElement('img'));
  const [isClickProfile, setIsClickProfile] = useState(false);
  const location = useLocation();

  const alramRef = useRef(document.createElement('div'));
  const [isClickAlram, setIsClickAlram] = useState(false);

  const [clickProfilePosition, setClickProfilePosition] =
    useState<getBoundingRefObj>();
  const [clickAlramPosition, setClickAlramPosition] =
    useState<getBoundingRefObj>();

  const isKeywordsItemExist = useMemo(
    () => keywordsItem.length > 0,
    [keywordsItem.length]
  );

  const isLocationProfile = useMemo(() => {
    return location.pathname === '/profile';
  }, [location]);

  const handleSelectNavItem = useCallback(
    (arg: EGameList) => {
      if (isKeywordsItemExist) {
        return;
      }

      if (isLocationProfile) {
        return setLeftNavItem(EGameList.NONE);
      }

      setLeftNavItem(arg);
    },
    [isKeywordsItemExist, isLocationProfile, setLeftNavItem]
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

  const handleGoMyProfile = useCallback(() => {
    history.push('/profile');
  }, [history]);

  useEffect(() => {
    return () => {
      setKeywordItem([]);
    };
  }, [setKeywordItem]);

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
    handleGoMyProfile,
    isLocationProfile,
    isKeywordsItemExist,
  };
};

export default useNav;
