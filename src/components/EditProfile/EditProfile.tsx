/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useMemo, useEffect } from 'react';
import Button from 'common/Button';
import useEditProfile, {
  ECancledItem,
} from 'hooks/useEditProfile/useEditProfile';
import styled from 'styled-components';
import { color, typography } from 'styles/theme';
import Input from 'common/Input';
import useInput from 'hooks/useInput/useInput';
import {
  editProfileUserInputType,
  gameNickNameType,
} from 'api/profile/profile.type';
import userCoverColorList from 'model/colorModel';
import UnderToggleLayer from 'common/UnderToggleLayer';
import SelectBox from 'common/SelectBox';

import { darken } from 'polished';
import { LOL_TIER, OVERWATCH_TIER, PUBG_TIER } from 'model/authModel';
import ModalContainer from 'common/ModalContainer';
import DonePopUp from './DonePopUp';

const EditProfile = () => {
  const [inputProfileEdit] = useInput<editProfileUserInputType>();
  const [inputGameNickName] = useInput<gameNickNameType>();

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
    handleModifyProfileEdit,
    goBakcProfileHistory,
    isEditProfileSetting,
    handleEditProfileSetting,
    selectLol,
    setSelectLol,
    selectPubg,
    setSelectPubg,
    selectWatch,
    setSelectWatch,
    gameNickName,
    setGameNickName,
    handleModifyGameTier,
    isDone,
    handleDonePopup,
    handleCancledImgWithColor,
    handleSelectColorChange,
    changeColorRef,
    chnageColorPosition,
    handleSelectUserColor,
    isSelectChangeColor,
    userCoverColor,
    setIsSelectChangeColor,
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

  const profileCancleButtonStyleProps = useMemo(() => {
    if (profileBanner64.length <= 0) {
      return {
        ...commonButtonProps,
        fontColor: color.grayScale[500],
        onClick: () => '',
        hoverBkgColor: color.grayScale[50],
      };
    }
    return {
      ...commonButtonProps,
      onClick: () => handleCancledImgWithColor(ECancledItem.USER_PROFILE),
    };
  }, [commonButtonProps, handleCancledImgWithColor, profileBanner64.length]);

  const bannerCancledButtonStyleProps = useMemo(() => {
    if (userCoverColor !== null) {
      return {
        ...commonButtonProps,
      };
    }

    if (bannerBase64.length <= 0) {
      return {
        ...commonButtonProps,
        fontColor: color.grayScale[500],
        onClick: () => '',
        hoverBkgColor: color.grayScale[50],
      };
    }
    return {
      ...commonButtonProps,
    };
  }, [bannerBase64.length, commonButtonProps, userCoverColor]);

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

  const commonButtonStyle = useMemo(
    () => ({
      width: 5.6,
      height: 3.6,
      fontStyle: typography.bodyRgBold,
      borderRadius: 0.5,
      padding: '',
    }),
    []
  );

  useEffect(() => {
    if (userCoverColor !== '') {
      setIsSelectChangeColor(false);
    }
  }, [setIsSelectChangeColor, userCoverColor]);

  return (
    <>
      <EditProfileWrapper>
        <EditProfileNav>
          <Item
            select={isEditProfileSetting === true}
            onClick={() => handleEditProfileSetting(true)}
          >
            프로필 편집
          </Item>
          <Item
            select={isEditProfileSetting === false}
            onClick={() => handleEditProfileSetting(false)}
          >
            티어 변경
          </Item>
        </EditProfileNav>
        <ProfileElementWrapper>
          {isEditProfileSetting ? (
            <>
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
                        accept="image/png, image/gif, image/jpeg"
                        required
                        multiple
                        onChange={handleProfileImgReader}
                      />
                      <ButtonElementWrapper>
                        <Button
                          {...commonButtonProps}
                          text="사진업로드"
                          width={7.6}
                          onClick={handleHiddenProfileInput}
                        />
                        <Button
                          {...profileCancleButtonStyleProps}
                          text="취소"
                          width={7.6}
                          onClick={() =>
                            handleCancledImgWithColor(ECancledItem.USER_PROFILE)
                          }
                        />
                      </ButtonElementWrapper>
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
                      <CoverSectionMock backgroundColor={userCoverColor} />
                    ) : (
                      <CoverSection src={bannerBase64} />
                    )}
                    <UploadWrapper>
                      <HiddenInput
                        ref={hiddenCoverInputRef}
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        required
                        multiple
                        onChange={handleCoverImgReader}
                      />
                      <ButtonElementWrapper>
                        {bannerBase64.length <= 0 && userCoverColor === null ? (
                          <ChangeColorButton
                            ref={changeColorRef}
                            onClick={handleSelectColorChange}
                          >
                            색상변경
                          </ChangeColorButton>
                        ) : (
                          ''
                        )}
                        <Button
                          {...commonButtonProps}
                          text="사진업로드"
                          width={7.6}
                          onClick={handleHiddenCoverInput}
                        />
                        <Button
                          {...bannerCancledButtonStyleProps}
                          text="취소"
                          width={7.6}
                          onClick={() =>
                            handleCancledImgWithColor(
                              ECancledItem.USER_COVER_WITH_COLOR
                            )
                          }
                        />
                      </ButtonElementWrapper>
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
                    onChange={(e) =>
                      inputProfileEdit(e, setEditProfileInputObj)
                    }
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
                    onChange={(e) =>
                      inputProfileEdit(e, setEditProfileInputObj)
                    }
                    name="intro"
                  />
                </IntroWrapper>
              </ProfileEditWrapper>
              <ButtonWrapper>
                <Button
                  {...commonButtonStyle}
                  text="적용"
                  bkgColor={color.yellow}
                  fontColor={color.white}
                  onClick={handleModifyProfileEdit}
                />
                <Button
                  {...commonButtonStyle}
                  onClick={goBakcProfileHistory}
                  text="취소"
                  bkgColor={color.white}
                  fontColor={color.grayScale[500]}
                />
              </ButtonWrapper>
            </>
          ) : (
            <>
              <ChangeTierWrapper>
                <LolWrapper>
                  <TitleWrapper>
                    <TopTitle>리그오브레전드</TopTitle>
                  </TitleWrapper>
                  <EditTierInputWrapper>
                    <SelectBox
                      stateValue={selectLol}
                      setStateValue={setSelectLol}
                      list={LOL_TIER}
                      width="120px"
                      height="40px"
                      borderStyle={`1px solid ${color.grayScale[250]}`}
                      backgroundColor={color.white}
                      color={color.grayScale[500]}
                      paddingStyle="10px 10px"
                    />
                    <Input
                      {...commonInputStyle}
                      width="376px"
                      name="lol"
                      value={gameNickName.lol}
                      onChange={(e) => inputGameNickName(e, setGameNickName)}
                    />
                  </EditTierInputWrapper>
                </LolWrapper>
                <OverWatchWrapper>
                  <TitleWrapper>
                    <TopTitle>오버워치</TopTitle>
                  </TitleWrapper>

                  <EditTierInputWrapper>
                    <SelectBox
                      stateValue={selectWatch}
                      setStateValue={setSelectWatch}
                      list={OVERWATCH_TIER}
                      width="120px"
                      height="40px"
                      borderStyle={`1px solid ${color.grayScale[250]}`}
                      backgroundColor={color.white}
                      color={color.grayScale[500]}
                      paddingStyle="10px 10px"
                    />
                  </EditTierInputWrapper>
                </OverWatchWrapper>
                <PubgWrapper>
                  <TitleWrapper>
                    <TopTitle>배틀그라운드</TopTitle>
                  </TitleWrapper>

                  <EditTierInputWrapper>
                    <SelectBox
                      stateValue={selectPubg}
                      setStateValue={setSelectPubg}
                      list={PUBG_TIER}
                      width="120px"
                      height="40px"
                      borderStyle={`1px solid ${color.grayScale[250]}`}
                      backgroundColor={color.white}
                      color={color.grayScale[500]}
                      paddingStyle="10px 10px"
                    />
                    <Input
                      {...commonInputStyle}
                      width="376px"
                      name="pubg"
                      value={gameNickName.pubg}
                      onChange={(e) => inputGameNickName(e, setGameNickName)}
                    />
                  </EditTierInputWrapper>
                </PubgWrapper>
              </ChangeTierWrapper>
              <ButtonWrapper>
                <Button
                  {...commonButtonStyle}
                  text="적용"
                  bkgColor={color.yellow}
                  fontColor={color.white}
                  onClick={handleModifyGameTier}
                />
                <Button
                  {...commonButtonStyle}
                  onClick={goBakcProfileHistory}
                  text="취소"
                  bkgColor={color.white}
                  fontColor={color.grayScale[500]}
                />
              </ButtonWrapper>
            </>
          )}
        </ProfileElementWrapper>
      </EditProfileWrapper>

      {isDone && (
        <ModalContainer
          width={46}
          height={13.2}
          isPopup={isDone}
          onClickOverlay={handleDonePopup}
          borderRadius={0.5}
          contentComponent={<DonePopUp onClick={handleDonePopup} />}
        />
      )}
      <UnderToggleLayer
        width={316}
        renderPosition={chnageColorPosition}
        isClick={isSelectChangeColor}
        isLeft
        onClick={handleSelectColorChange}
      >
        <ColorWrapper>
          {userCoverColorList.map((data) => {
            return (
              <ColorCircle
                onClick={() => handleSelectUserColor(data)}
                backgroundColor={data}
              />
            );
          })}
        </ColorWrapper>
      </UnderToggleLayer>
    </>
  );
};

export default EditProfile;

const ColorWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  flex-wrap: wrap;
  padding: 10px;
  align-items: center;
  justify-items: center;
  grid-gap: 10px 0px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  justify-content: center;

  & > * + * {
    margin-left: 20px;
  }
`;

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
  cursor: pointer;
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

const CoverSectionMock = styled.div<{ backgroundColor: string | null }>`
  width: 498px;
  height: 78px;
  border-radius: 5px;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor === null ? theme.color.grayScale[500] : backgroundColor};
`;
//

const ChangeTierWrapper = styled.div`
  width: 100%;
  height: 240px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LolWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[500]};
`;

const OverWatchWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[500]};
`;

const PubgWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
`;

const EditTierInputWrapper = styled.div`
  display: flex;
  margin-left: 5px;
  justify-content: space-between;
  width: 100%;
`;

const ButtonElementWrapper = styled.div`
  display: flex;
  & > * + * {
    margin-left: 11px;
  }
`;

const ChangeColorButton = styled.div`
  cursor: pointer;
  width: 7rem;
  height: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.bodySmBold};
  border-radius: 0.5rem;
  text-align: center;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  transition: all 0.1s ease-out;

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.color.grayScale[50])};
  }
`;

const ColorCircle = styled.div<{ backgroundColor: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
