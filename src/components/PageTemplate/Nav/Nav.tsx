import DefaultProfile32 from 'assets/svg/defaultProfile/profile_32.svg';
import WATPL from 'assets/svg/WAPPLE_LOGO.svg';

import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useNav from 'hooks/useNav';
import Button from 'common/Button';
import useAuth from 'hooks/useAuth';
import Login from 'components/Auth/Login/Login';
import Register from 'components/Auth/Register';
import ModalContainer from 'common/ModalContainer';
import UnderToggleLayer from 'common/UnderToggleLayer';
import { ItemStyle } from 'common/UnderToggleLayer/UnderToggleLayer';
import { registerStatusAtom } from 'atom/authAtom';
import Welcome from 'components/Auth/Welcome';
import useProfile from 'hooks/useProfile/useProfile';
import { fetchUserInfoAtom } from 'atom/userAtom';
import { color, typography } from 'styles/theme';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { myProfileAtom } from 'atom/profileAtom';
import { searchAreaAtom } from 'atom/searchAreaAtom';
import useSearch from 'hooks/useSearch/useSearch';
import UploadSvg from '../SvgElement/UploadSvg';
import AlramSvg from '../SvgElement/AlarmSvg';
import SearchBar from './SearchBar';

const Nav = () => {
  const themeStyle = useContext(ThemeContext);
  const myProfile = useRecoilValue(myProfileAtom);
  const userInfo = useRecoilValue(fetchUserInfoAtom);
  const { userPhotoURL } = userInfo;
  const isLogin = myProfile.id !== null;

  const {
    handleClickProfile,
    isClickProfile,
    profileRef,
    clickProfilePosition,
    alramRef,
    handleClickAlram,
    isClickAlram,
    clickAlramPosition,
    handleGoMyProfile,
    handleGoMain,
  } = useNav();

  const {
    isLoginModal,
    handleLoginModal,
    loginObj,
    setLoginObj,
    handleLogin,
    loginErrorStatus,
    handleLogout,
    handleRegisterModal,
    isRegisterModal,
    handleGoToLoginModal,
    handleGoToRegisterModal,
    handleSuccessRegisterModal,
    isRegisterSuccess,
    closeWelcomModalGoToLoginModal,
  } = useAuth();

  const { handleMyProfile } = useProfile();

  const { keywords, handleAddKeyword } = useSearch();

  useEffect(() => {
    handleMyProfile();
    localStorage.setItem('keywords', JSON.stringify(keywords));
    // setRKeword(keywords);
  }, [handleMyProfile, keywords]);

  const registerStatus = useRecoilValue(registerStatusAtom);
  return (
    <>
      <NavWrapper>
        <NavInnerWrapper>
          <Logo src={WATPL} alt="WATPL" onClick={handleGoMain} />
          <SearchBar />
          <ButtonWrapper>
            {isLogin ? (
              <RightItemWrapper>
                <UploadSvg
                  width={20.25}
                  height={24}
                  color={color.grayScale[500]}
                />
                <AlramWrapper ref={alramRef} onClick={handleClickAlram}>
                  <AlramSvg
                    width={20.21}
                    height={24}
                    color={color.grayScale[500]}
                  />
                </AlramWrapper>
                <ProfileImg
                  ref={profileRef}
                  src={userPhotoURL || DefaultProfile32}
                  alt=""
                  onClick={handleClickProfile}
                />
              </RightItemWrapper>
            ) : (
              <>
                <Button
                  text="로그인"
                  onClick={handleLoginModal}
                  fontColor={themeStyle.color.yellow}
                  bkgColor={themeStyle.color.white}
                  padding="0.8rem 0.7rem"
                  width={7}
                  height={3.6}
                  borderRadius={0.5}
                  fontStyle={typography.bodyRgBold}
                  hoverBkgColor={themeStyle.color.yellow}
                  hoverFontColor={themeStyle.color.white}
                />
                <Button
                  text="회원가입"
                  onClick={handleRegisterModal}
                  fontColor={themeStyle.color.white}
                  bkgColor={themeStyle.color.yellow}
                  padding="0.8rem 0.7rem"
                  width={7}
                  height={3.6}
                  borderRadius={0.5}
                  fontStyle={typography.bodyRgBold}
                />
              </>
            )}
          </ButtonWrapper>
        </NavInnerWrapper>
      </NavWrapper>

      <ModalContainer
        isPopup={isLoginModal}
        onClickOverlay={handleLoginModal}
        width={46}
        borderRadius={0.5}
        contentComponent={
          <Login
            closeModal={handleLoginModal}
            value={loginObj}
            setValue={setLoginObj}
            login={handleLogin}
            status={loginErrorStatus}
            goToRegister={handleGoToRegisterModal}
          />
        }
      />

      {registerStatus === 201 && (
        <ModalContainer
          width={46}
          height={19.4}
          isPopup={isRegisterSuccess}
          onClickOverlay={handleSuccessRegisterModal}
          borderRadius={0.5}
          contentComponent={
            <Welcome onClick={closeWelcomModalGoToLoginModal} />
          }
        />
      )}
      <ModalContainer
        isPopup={isRegisterModal}
        onClickOverlay={handleRegisterModal}
        width={46}
        borderRadius={0.5}
        contentComponent={<Register goToLogin={handleGoToLoginModal} />}
      />
      <UnderToggleLayer
        width={84}
        isClick={isClickProfile}
        renderPosition={clickProfilePosition}
      >
        <ItemStyle onClick={handleGoMyProfile}>내 프로필</ItemStyle>
        <ItemStyle onClick={handleLogout}>로그아웃</ItemStyle>
      </UnderToggleLayer>

      <UnderToggleLayer
        width={264}
        isClick={isClickAlram}
        renderPosition={clickAlramPosition}
      >
        <ItemStyle>00님이 회원님의 플레이를 좋아합니다.</ItemStyle>
      </UnderToggleLayer>
    </>
  );
};

const AlramWrapper = styled.div``;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 5px;
`;

const RightItemWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  & > * {
    cursor: pointer;
  }
  & > * + * {
    margin-left: 18px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 160px;
  justify-content: flex-end;

  & > * + * {
    margin-left: 20px;
  }
`;

const NavWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NavInnerWrapper = styled.div`
  width: 100%;
  max-width: 940px;
  background-color: ${({ theme }) => theme.color.white};
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid ${({ theme }) => theme.color.grayScale[500]};
  justify-content: space-between;
  padding-right: 10px;
`;

const Logo = styled.img`
  margin-left: 10px;
  cursor: pointer;
`;

export default Nav;
