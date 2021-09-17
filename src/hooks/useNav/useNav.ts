/* eslint-disable consistent-return */
import { leftNavItemState } from 'atom/pageAtom';
import { EGameList } from 'enum/game.enum';
import { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getBoundingRefObj } from 'types/underToggleLayer.types';
import { searchAreaAtom } from 'atom/searchAreaAtom';
import { myProfileAtom } from 'atom/profileAtom';
import { newLike } from 'api/like/like';
import { newFollower } from 'api/follow/follow';
import { uploadModalPopState } from 'atom/uploadModalPopStateAtom';

type alermListType = {
  userId: string;
  text: string;
};

const useNav = () => {
  const history = useHistory();
  const [keywordsItem, setKeywordItem] = useRecoilState(searchAreaAtom);
  const myProfile = useRecoilValue(myProfileAtom);
  const setLeftNavItem = useSetRecoilState(leftNavItemState);
  const profileRef = useRef(document.createElement('img'));
  const [isClickProfile, setIsClickProfile] = useState(false);
  const location = useLocation();
  const { id }: { id: string } = useParams();
  const [isUploadModalPoped, setUploadModalPopstate] =
    useRecoilState(uploadModalPopState);
  const alramRef = useRef(document.createElement('div'));
  const [isClickAlram, setIsClickAlram] = useState(false);

  const [clickProfilePosition, setClickProfilePosition] =
    useState<getBoundingRefObj>();
  const [clickAlramPosition, setClickAlramPosition] =
    useState<getBoundingRefObj>();
  const [followerAlermList, setFollowerAlermList] = useState<alermListType[]>(
    []
  );
  const [likeAlermList, setLikeAlermList] = useState<alermListType[]>([]);
  const [alermList, setAlermList] = useState<alermListType[]>([]);

  const isKeywordsItemExist = useMemo(
    () => keywordsItem.length > 0,
    [keywordsItem.length]
  );

  const isLocationProfile = useMemo(() => {
    return (
      location.pathname === '/profile' || location.pathname.includes('/profile')
    );
  }, [location]);

  const isOtherUserProfile = useMemo(() => {
    return id === undefined;
  }, [id]);

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

  const handleNewLike = useCallback(async () => {
    if (myProfile.id === null) {
      return;
    }

    const data = await newLike(myProfile.id);
    for (let i = 0; i < data.newLikeList.length; i += 1) {
      const temp = {
        userId: data.newLikeList[i].userId,
        text: `${data.newLikeList[i].userId}님이 회원님의 동영상을 좋아합니다.`,
      };
      setLikeAlermList((prev) => [...prev, temp]);
    }
  }, [myProfile.id]);

  const handleNewFollowerList = useCallback(async () => {
    setFollowerAlermList([]);
    if (myProfile.id === null) {
      return;
    }

    const data = await newFollower(myProfile.id);

    for (let i = 0; i < data?.followers?.length; i += 1) {
      const temp = {
        userId: data.followers[i].userId,
        text: `${data.followers[i].userId}님이 회원님을 팔로우 합니다.`,
      };
      setFollowerAlermList((prev) => [...prev, temp]);
    }
  }, [myProfile.id]);

  const handleGoMyProfile = useCallback(() => {
    history.push('/profile');
  }, [history]);

  const handleGoMain = useCallback(() => {
    history.push('/');
  }, [history]);

  const handleClickAlermItem = useCallback(
    (userId: string) => {
      history.push(`/profile/${userId}`);
    },
    [history]
  );

  const handleAlermList = useCallback(() => {
    setAlermList([...followerAlermList, ...likeAlermList]);
  }, [followerAlermList, likeAlermList]);

  const handleUploadModal = useCallback(() => {
    setUploadModalPopstate(true);
  }, [setUploadModalPopstate]);

  useEffect(() => {
    return () => {
      setKeywordItem([]);
    };
  }, [setKeywordItem]);

  useEffect(() => {
    Promise.all([handleNewLike(), handleNewFollowerList()]);
  }, [handleNewFollowerList, handleNewLike]);

  useEffect(() => {
    handleAlermList();
  }, [handleAlermList]);

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
    handleGoMain,
    alermList,
    handleClickAlermItem,
    myProfile,
    isOtherUserProfile,
    handleUploadModal,
  };
};

export default useNav;
