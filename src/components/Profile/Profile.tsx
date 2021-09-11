import DefaultProfile80 from 'assets/svg/defaultProfile/profile_80.svg';
import ProImg from 'assets/svg/pro.svg';

import React, { useEffect } from 'react';
import Banner from 'common/Banner';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import useProfile from 'hooks/useProfile/useProfile';
// import { myListbySelectorState } from 'atom/profileVideoAtom';
import VideoListMain from 'common/VideoList/Main';
import { useParams } from 'react-router-dom';
import { fetchUserInfoAtom } from 'atom/userAtom';
import { leftNavItemState } from 'atom/pageAtom';
import { EGameList } from 'enum/game.enum';
import { followerCountAtom, followingCountAtom } from 'atom/followAtom';
import ModalContainer from 'common/ModalContainer';
import FollowType, { EFollow } from './FollowTypeList/FollowType';
import ProfileVideo from './ProfileVideo';

const Profile = () => {
  const {
    handleMyProfile,
    handleEditProfilePage,
    handleSelectFollowingModal,
    isSelectFollowingModal,
    isSelectFollowerModal,
    handleFelectFollowerModal,
  } = useProfile();

  const [selectNavName, setSelectName] = useRecoilState(leftNavItemState);
  const userInfo = useRecoilValue(fetchUserInfoAtom);
  const { id }: { id: string } = useParams();
  const followerCount = useRecoilValue(followerCountAtom);
  const followingCount = useRecoilValue(followingCountAtom);
  const {
    userName,
    userIntro,
    userPhotoURL,
    userCoverURL,
    lolTier,
    pubgTier,
    watchTier,
    userColor,
    userLolId,
    userPubgId,
    isPro,
  } = userInfo;

  useEffect(() => {
    handleMyProfile();
  }, [handleMyProfile]);

  useEffect(() => {
    return () => {
      setSelectName(EGameList.LOL);
    };
  }, [setSelectName]);

  return (
    <>
      <ProfileWrapper>
        <Banner
          userColor={userColor}
          img={userCoverURL}
          lolTier={lolTier}
          pubgTier={pubgTier}
          watchTier={watchTier}
          userLolId={userLolId}
          userPubgId={userPubgId}
        />
        <UserWrapperPosition>
          <UserInfoWrapper>
            <UserImg src={userPhotoURL || DefaultProfile80} />
            <InfoWrapper>
              <UserNameWrapper>
                <UserName>{userName}</UserName>
                {isPro && <ProImgWrapper src={ProImg} alt="pro" />}
                {id === undefined && (
                  <EditProfile onClick={handleEditProfilePage}>
                    프로필 편집
                  </EditProfile>
                )}
              </UserNameWrapper>
              <FollowWrapper>
                <FollowTypeWrapper onClick={handleSelectFollowingModal}>
                  {followerCount} 팔로워
                </FollowTypeWrapper>
                <FollowTypeWrapper onClick={handleFelectFollowerModal}>
                  {followingCount === undefined ? 0 : followingCount} 팔로우
                </FollowTypeWrapper>
              </FollowWrapper>
            </InfoWrapper>
          </UserInfoWrapper>
          <Introdunction>
            {userIntro === null ? '자기소개가 없습니다.' : userIntro}
          </Introdunction>
        </UserWrapperPosition>
        <ProfileVideo />
      </ProfileWrapper>
      <ModalContainer
        isPopup={isSelectFollowingModal}
        contentComponent={
          <FollowType
            followType={EFollow.FOLLOWER}
            close={handleSelectFollowingModal}
          />
        }
        onClickOverlay={handleSelectFollowingModal}
        borderRadius={0.5}
      />
      <ModalContainer
        isPopup={isSelectFollowerModal}
        contentComponent={
          <FollowType
            followType={EFollow.FOLLOWING}
            close={handleFelectFollowerModal}
          />
        }
        onClickOverlay={handleFelectFollowerModal}
        borderRadius={0.5}
      />
    </>
  );
};

export default Profile;

const ProImgWrapper = styled.img`
  margin-left: 5px;
`;

const EditProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 23px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => `${theme.color.grayScale[500]}7F`};
  ${({ theme }) => theme.typography.bodySmBold}
  color:${({ theme }) => theme.color.grayScale[500]};
  margin-left: 10px;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const UserWrapperPosition = styled.div`
  position: relative;
  top: -20px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  position: relative;
`;

const UserImg = styled.img`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.color.white};
  margin-left: 30px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[250]};
`;

const InfoWrapper = styled.div`
  margin-left: 10px;
  width: 520px;
  height: 52px;
`;

const UserNameWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  ${({ theme }) => theme.typography.headRgBold}
`;

const FollowWrapper = styled.div`
  margin-top: 6px;
  display: flex;
  ${({ theme }) => theme.typography.bodyRg}
  & > * + * {
    margin-left: 20px;
  }
`;

const Introdunction = styled.div`
  margin-left: 30px;
  color: ${({ theme }) => theme.color.grayScale[500]};

  ${({ theme }) => theme.typography.bodyRg}
`;

const FollowTypeWrapper = styled.div`
  cursor: pointer;
`;
