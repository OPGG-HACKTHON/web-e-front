import Banner from 'common/Banner';
import React from 'react';
import styled from 'styled-components';
import { getTextOfJSDocComment } from 'typescript';

const Profile = () => {
  return (
    <ProfileWrapper>
      <Banner />
      <UserWrapperPosition>
        <UserInfoWrapper>
          <UserImg />
          <InfoWrapper>
            <UserNameWrapper>
              <UserName>사용자1</UserName>
            </UserNameWrapper>
            <FollowWrapper>
              <div>0 팔로워</div>
              <div>0 팔로우</div>
            </FollowWrapper>
          </InfoWrapper>
        </UserInfoWrapper>
        <Introdunction>자기소개</Introdunction>
      </UserWrapperPosition>
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
  background-color: ${({ theme }) => theme.color.grayScale[250]};
  margin-left: 30px;
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
