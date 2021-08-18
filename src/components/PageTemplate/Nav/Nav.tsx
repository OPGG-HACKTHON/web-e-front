import React, { useContext } from 'react';
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

import { color, typography } from 'styles/theme';
import { useRecoilValue } from 'recoil';
import { myProfileAtom } from 'atom/profileAtom';
import WATPL from 'assets/svg/왓플-WATPL.svg';
import Search from 'assets/svg/Search.svg';
import UploadSvg from '../SvgElement/UploadSvg';
import AlramSvg from '../SvgElement/AlarmSvg';

const Nav = () => {
  const themeStyle = useContext(ThemeContext);
  const myProfile = useRecoilValue(myProfileAtom);
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

  const registerStatus = useRecoilValue(registerStatusAtom);

  console.log(clickAlramPosition, clickProfilePosition);
  return (
    <>
      <NavWrapper>
        <NavInnerWrapper>
          <Logo src={WATPL} alt="WATPL" />
          <SearchWrapper>
            <SearchIconWrapper>
              <SearchIcon src={Search} alt={Search} />
            </SearchIconWrapper>
            <SearchInput placeholder="사용자 이름 또는 해시태그 검색" />
          </SearchWrapper>
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
                  src=""
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
        <ItemStyle>프로필 설정</ItemStyle>
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
  background-color: ${({ theme }) => theme.color.grayScale[500]};
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
  margin-bottom: 34px;
`;

const NavInnerWrapper = styled.div`
  width: 100%;
  max-width: 930px;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid ${({ theme }) => theme.color.grayScale[500]};
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 109px;
  height: 26px;
`;

const SearchWrapper = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  max-width: 210px;
  height: 36px;
  display: flex;
  border-radius: 5px;
`;

const SearchIconWrapper = styled.div`
  width: 100%;
  max-width: 36px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.img`
  margin-left: 16px;
  width: 12px;
  height: 12px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #f2f2f2;
  border-radius: 0px 4px 4px 0px;
  &::placeholder {
    ${({ theme }) => theme.typography.bodySmRegular}
  }

  &:focus {
    outline: none;
  }
`;

export default Nav;
