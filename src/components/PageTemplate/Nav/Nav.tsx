import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import WATPL from 'assets/svg/왓플-WATPL.svg';
import Search from 'assets/svg/Search.svg';
import Button from 'common/Button';
import { typography } from 'styles/theme';

const Nav = () => {
  const themeStyle = useContext(ThemeContext);

  return (
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
          <Button
            text="로그인"
            onClick={() => console.log('LOGIN BUTTON')}
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
            onClick={() => console.log('REGISTER BUTTON')}
            fontColor={themeStyle.color.white}
            bkgColor={themeStyle.color.yellow}
            padding="0.8rem 0.7rem"
            width={7}
            height={3.6}
            borderRadius={0.5}
            fontStyle={typography.bodyRgBold}
          />
        </ButtonWrapper>
      </NavInnerWrapper>
    </NavWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 160px;

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
  max-width: 940px;
  height: 60px;
  display: flex;
  align-items: center;
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
