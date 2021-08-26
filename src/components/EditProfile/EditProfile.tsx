/* eslint-disable react/jsx-props-no-spreading */
import Button from 'common/Button';
import useEditProfile from 'hooks/useEditProfile/useEditProfile';
import React, { useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { color, typography } from 'styles/theme';

const EditProfile = () => {
  const [isEditProfileSetting, setIsEditProfileSetting] = useState(true);

  const {
    imgFile,
    imgBase64,
    handleHiddenInput,
    hiddenInputRef,
    handleChangeFile,
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
                <ProfileImg src={imgBase64} />
                <UploadWrapper>
                  <HiddenInput
                    ref={hiddenInputRef}
                    type="file"
                    accept="img/*"
                    required
                    multiple
                    onChange={handleChangeFile}
                  />
                  <Button
                    {...commonButtonProps}
                    text="사진업로드"
                    width={7.6}
                    onClick={handleHiddenInput}
                  />
                </UploadWrapper>
              </div>
            </ProfileUploadWrapper>
            <CoverImgWarpper>
              <TitleWrapper>
                <TopTitle>커버 사진</TopTitle>
                <SubTitle>권장규격 640 x 100</SubTitle>
              </TitleWrapper>
            </CoverImgWarpper>
            <NameWrapper>
              <TitleWrapper>
                <TopTitle>닉네임</TopTitle>
              </TitleWrapper>
            </NameWrapper>
            <IntroWrapper>
              <TitleWrapper>
                <TopTitle>자기소개</TopTitle>
              </TitleWrapper>
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
  width: 132px;
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

const UploadWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const UploadButton = styled.div`
  width: 76px;
`;

const HiddenInput = styled.input`
  display: none;
`;
