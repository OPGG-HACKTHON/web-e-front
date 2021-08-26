import React, { useEffect } from 'react';
import Banner from 'common/Banner';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { myProfileAtom } from 'atom/profileAtom';
import useProfile from 'hooks/useProfile/useProfile';
import { myListbySelectorState } from 'atom/profileVideoAtom';
import VideoListMain from 'common/VideoList/Main';

const Profile = () => {
  const { handleMyProfile, followerCount, followingCount } = useProfile();

  const userProfile = useRecoilValue(myProfileAtom);
  const { id, intro } = userProfile;

  useEffect(() => {
    handleMyProfile();
  }, [handleMyProfile]);

  // const videos = useRecoilValue(myListbySelectorState);
  // const isNeedDescription = true;

  return (
    <ProfileWrapper>
      <Banner />
      <UserWrapperPosition>
        <UserInfoWrapper>
          <UserImg />
          <InfoWrapper>
            <UserNameWrapper>
              <UserName>{id}</UserName>
            </UserNameWrapper>
            <FollowWrapper>
              <div>{followerCount} 팔로워</div>
              <div>{followingCount} 팔로우</div>
            </FollowWrapper>
          </InfoWrapper>
        </UserInfoWrapper>
        <Introdunction>
          {intro === null ? '자기소개가 없습니다.' : intro}
        </Introdunction>
      </UserWrapperPosition>
      {/* <VideoListMain videos={videos} isNeedDescription={isNeedDescription} /> */}
    </ProfileWrapper>
  );
};

export default Profile;

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
  /* top: -20px; */
`;

const UserImg = styled.div`
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
`;

const UserName = styled.div`
  ${({ theme }) => theme.typography.headRgBold}
`;

const FollowWrapper = styled.div`
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
