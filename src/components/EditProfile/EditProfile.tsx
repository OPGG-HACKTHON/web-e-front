import React, { useState } from 'react';
import styled from 'styled-components';

const EditProfile = () => {
  const [isEditProfileSetting, setIsEditProfileSetting] = useState(true);

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
                <ProfileImg />
                <UploadWrapper>
                  <HiddenInput
                    type="file"
                    id="real-input"
                    className="image_inputType_file"
                    accept="img/*"
                    required
                    multiple
                  />
                  <UploadButton>사진 업로드</UploadButton>
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
  height: 23px;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  ${({ theme }) => theme.typography.bodySmBold}
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const HiddenInput = styled.input`
  display: hidden;
`;
