import React, { useEffect } from 'react';
import Banner from 'common/Banner';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import useProfile from 'hooks/useProfile/useProfile';
import { fetchUserInfoAtom } from 'atom/userAtom';

const Profile = () => {
  const { handleMyProfile, followingCount, handleEditProfilePage } =
    useProfile();
  const userInfo = useRecoilValue(fetchUserInfoAtom);
  const {
    userName,
    userIntro,
    userPhotoURL,
    followerCount,
    userCoverURL,
    lolTier,
    pubgTier,
    watchTier,
  } = userInfo;

  useEffect(() => {
    handleMyProfile();
  }, [handleMyProfile]);

  return (
    <ProfileWrapper>
      <Banner
        img={userCoverURL}
        lolTier={lolTier}
        pubgTier={pubgTier}
        watchTier={watchTier}
      />
      <UserWrapperPosition>
        <UserInfoWrapper>
          <UserImg src={userPhotoURL} />
          <InfoWrapper>
            <UserNameWrapper>
              <UserName>{userName}</UserName>
              <EditProfile onClick={handleEditProfilePage}>
                프로필 편집
              </EditProfile>
            </UserNameWrapper>
            <FollowWrapper>
              <div>{followerCount} 팔로워</div>
              <div>
                {followingCount === undefined ? 0 : followingCount} 팔로우
              </div>
            </FollowWrapper>
          </InfoWrapper>
        </UserInfoWrapper>
        <Introdunction>
          {userIntro === null ? '자기소개가 없습니다.' : userIntro}
        </Introdunction>
      </UserWrapperPosition>
    </ProfileWrapper>
  );
};

export default Profile;

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
