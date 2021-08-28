/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useMemo } from 'react';
import Button from 'common/Button';
import useEditProfile from 'hooks/useEditProfile/useEditProfile';
import styled from 'styled-components';
import { color, typography } from 'styles/theme';
import Input from 'common/Input';
import useInput from 'hooks/useInput/useInput';
import { editProfileUserInputType } from 'api/profile/profile.type';

const EditProfile = () => {
  const [isEditProfileSetting, setIsEditProfileSetting] = useState(true);
  const [inputProfileEdit] = useInput<editProfileUserInputType>();

  const {
    handleProfileImgReader,
    profileBanner64,
    handleHiddenProfileInput,
    handleHiddenCoverInput,
    hiddenProfileInputRef,
    hiddenCoverInputRef,
    handleCoverImgReader,
    bannerBase64,
    editProfileInputObj,
    setEditProfileInputObj,
  } = useEditProfile();

  const commonButtonProps = useMemo(
    () => ({
      height: 2.3,
      bkgColor: color.grayScale[50],
      fontStyle: typography.bodySmBold,
      borderRadius: 0.5,
      fontColor: color.blackScale[50],
      padding: '',
    }),
    []
  );

  const commonInputStyle = useMemo(() => {
    return {
      height: '40px',
      placeHolderFontSize: '1.2rem',
      borderRadius: '5px',
      borderStyle: `1px solid ${color.grayScale[250]}`,
      backgroundColor: color.grayScale[50],
      placeHolderColor: color.grayScale[500],
      fontSize: '1.2rem',
      focusBackgroundColor: color.white,
      focusOutline: `1px solid ${color.yellow}`,
      paddingStyle: '9px 11px',
    };
  }, []);

  return (
    <EditProfileWrapper>
      <EditProfileNav>
        <Item select={isEditProfileSetting === true}>프로필 편집</Item>
        <Item select={isEditProfileSetting === false}>티어 변경</Item>
      </EditProfileNav>
      <ProfileElementWrapper>
        {isEditProfileSetting ? (
          <ProfileEditWrapper>
            <ProfileUploadWrapper>
              <TitleWrapper>
                <TopTitle>프로필 사진</TopTitle>
                <SubTitle>권장규격 80 x 80</SubTitle>
              </TitleWrapper>
              <div>
                {profileBanner64.length <= 0 ? (
                  <ProfileImgMock />
                ) : (
                  <ProfileImg src={profileBanner64} />
                )}

                <UploadWrapper>
                  <HiddenInput
                    ref={hiddenProfileInputRef}
                    type="file"
                    accept="img/*"
                    required
                    multiple
                    onChange={handleProfileImgReader}
                  />
                  <Button
                    {...commonButtonProps}
                    text="사진업로드"
                    width={7.6}
                    onClick={handleHiddenProfileInput}
                  />
                </UploadWrapper>
              </div>
            </ProfileUploadWrapper>
            <CoverImgWarpper>
              <TitleWrapper>
                <TopTitle>커버 사진</TopTitle>
                <SubTitle>권장규격 640 x 100</SubTitle>
              </TitleWrapper>
              <div>
                {bannerBase64.length <= 0 ? (
                  <CoverSectionMock />
                ) : (
                  <CoverSection src={bannerBase64} />
                )}
                <UploadWrapper>
                  <HiddenInput
                    ref={hiddenCoverInputRef}
                    type="file"
                    accept="img/*"
                    required
                    multiple
                    onChange={handleCoverImgReader}
                  />
                  <Button
                    {...commonButtonProps}
                    text="사진업로드"
                    width={7.6}
                    onClick={handleHiddenCoverInput}
                  />
                </UploadWrapper>
              </div>
            </CoverImgWarpper>
            <NameWrapper>
              <TitleWrapper>
                <TopTitle>닉네임</TopTitle>
              </TitleWrapper>
              <Input
                width="200px"
                {...commonInputStyle}
                value={editProfileInputObj.userName}
                onChange={(e) => inputProfileEdit(e, setEditProfileInputObj)}
                name="userName"
              />
            </NameWrapper>
            <IntroWrapper>
              <TitleWrapper>
                <TopTitle>자기소개</TopTitle>
              </TitleWrapper>
              <Input
                {...commonInputStyle}
                value={editProfileInputObj.intro}
                onChange={(e) => inputProfileEdit(e, setEditProfileInputObj)}
                name="intro"
              />
            </IntroWrapper>
          </ProfileEditWrapper>
        ) : null}
      </ProfileElementWrapper>
    </EditProfileWrapper>
  );
};

export default EditProfile;

const EditProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
`;

const EditProfileNav = styled.div`
  margin-top: 25px;
  max-width: 210px;
  min-width: 210px;
  height: 100px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Item = styled.div<{ select: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  border-left: ${({ theme, select }) =>
    select ? `3px solid ${theme.color.yellow}` : 'none'};
  padding: 0px 30px;
  margin: 10px 0px;
  color: ${({ theme, select }) =>
    select ? theme.color.blackScale[50] : theme.color.grayScale[500]};
  ${({ theme, select }) =>
    select ? theme.typography.bodyRgBold : theme.typography.bodyRg}
`;

const ProfileElementWrapper = styled.div`
  margin-top: 25px;
  width: 100%;
  margin-left: 30px;
`;

const ProfileEditWrapper = styled.div`
  width: 100%;
  height: 442px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  padding: 20px 30px;
`;

const ProfileUploadWrapper = styled.div`
  width: 100%;
  height: 113px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[50]};
`;

const CoverImgWarpper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 131px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[50]};
`;

const NameWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 59px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[50]};
`;

const IntroWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: 39px;
`;

const TitleWrapper = styled.div`
  max-width: 132px;
  min-width: 132px;
  height: 100%;
`;

const TopTitle = styled.div`
  ${({ theme }) => theme.typography.headRgBold}
`;

const SubTitle = styled.div`
  ${({ theme }) => theme.typography.bodySmRegular}
  color:${({ theme }) => theme.color.grayScale[500]};
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[250]};
`;

const ProfileImgMock = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.grayScale[500]};
`;

const UploadWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const CoverSection = styled.img`
  width: 498px;
  height: 78px;
  border-radius: 5px;
`;

const CoverSectionMock = styled.div`
  width: 498px;
  height: 78px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.grayScale[500]};
`;
