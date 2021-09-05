/* eslint-disable consistent-return */
import {
  fetchProfileInfo,
  findFollower,
  findFollowing,
  myProfileInfo,
} from 'api/profile/profile';
import {
  followerCountAtom,
  followerListAtom,
  followingCountAtom,
  followingListAtom,
  myFollowingListAtom,
} from 'atom/followAtom';
import { findUser, myProfileAtom } from 'atom/profileAtom';
import { fetchUserInfoAtom } from 'atom/userAtom';
import { useCallback, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const useProfile = () => {
  const setMyProfile = useSetRecoilState(myProfileAtom);
  const history = useHistory();
  const { id }: { id: string } = useParams();
  const setUserId = useSetRecoilState(findUser);
  const setFollowerCount = useSetRecoilState(followerCountAtom);
  const setFollowingCount = useSetRecoilState(followingCountAtom);
  const setFollowerList = useSetRecoilState(followerListAtom);
  const setFollowingList = useSetRecoilState(followingListAtom);
  const setMyFollowingListAtom = useSetRecoilState(myFollowingListAtom);
  const [fetchUserId, setFetchUserId] = useState<string>('');
  const [isSelectFollowingModal, setisSelectFollowingModal] =
    useState<boolean>(false);
  const [isSelectFollowerModal, setIsSelectFollowerModal] =
    useState<boolean>(false);

  const setFetchUserInfoAtom = useSetRecoilState(fetchUserInfoAtom);

  const handleSelectFollowingModal = useCallback(() => {
    setisSelectFollowingModal((prev) => !prev);
  }, []);

  const handleFelectFollowerModal = useCallback(() => {
    setIsSelectFollowerModal((prev) => !prev);
  }, []);

  const handleFindFollower = useCallback(
    async (userId: string) => {
      try {
        if (id === undefined) {
          const { data } = await findFollower(userId);
          setFollowerList(data.followers);
          setFollowerCount(data.followersCount);

          return;
        }

        const { data } = await findFollower(id);
        setFollowerList(data.followers);
        setFollowerCount(data.followersCount);
      } catch (err) {
        return err;
      }
    },
    [id, setFollowerCount, setFollowerList]
  );

  const handleFindFollowing = useCallback(
    async (userId: string) => {
      try {
        if (id === undefined) {
          const { data } = await findFollowing(userId);
          setFollowingList(data.followings);
          setFollowingCount(data.followingsCount);
          return data;
        }
        const { data } = await findFollowing(id);
        setFollowingList(data.followings);
        setFollowingCount(data.followingsCount);

        return data;
      } catch (err) {
        return err;
      }
    },
    [id, setFollowingCount, setFollowingList]
  );

  const myFollowList = useCallback(async () => {
    try {
      if (fetchUserId === '') {
        return;
      }
      const { data } = await findFollowing(fetchUserId);
      setMyFollowingListAtom(data.followings);
    } catch (err) {
      return err;
    }
  }, [fetchUserId, setMyFollowingListAtom]);

  const handleMyProfile = useCallback(async () => {
    try {
      const { data } = await myProfileInfo();
      setFetchUserId(data.id);
      setMyProfile(data);

      Promise.all([handleFindFollower(data.id), handleFindFollowing(data.id)]);

      return data;
    } catch (err) {
      return err;
    }
  }, [handleFindFollower, handleFindFollowing, setMyProfile]);

  const handleFetchMyProfile = useCallback(async () => {
    if (fetchUserId === '') {
      return;
    }
    if (id === undefined) {
      const { data } = await fetchProfileInfo(fetchUserId);

      setFetchUserInfoAtom(data);
    } else {
      const { data } = await fetchProfileInfo(id);
      setUserId(id);

      setFetchUserInfoAtom(data);
    }
  }, [fetchUserId, id, setFetchUserInfoAtom, setUserId]);

  const handleEditProfilePage = useCallback(() => {
    return history.push('profileEdit');
  }, [history]);

  useEffect(() => {
    handleFetchMyProfile();
  }, [handleFetchMyProfile]);

  useEffect(() => {
    myFollowList();
  }, [myFollowList]);

  return {
    handleMyProfile,
    handleEditProfilePage,
    handleSelectFollowingModal,
    handleFindFollower,
    handleFindFollowing,
    isSelectFollowingModal,
    fetchUserId,
    handleFelectFollowerModal,
    isSelectFollowerModal,
  };
};

export default useProfile;
