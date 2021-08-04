import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import OVERWATCH_LOGO from 'assets/svg/image 2.svg';
import useNav from 'hooks/useNav';
import { useRecoilValue } from 'recoil';
import { leftNavItemState } from 'atom/pageAtom';
import { convertToObject } from 'typescript';
import { color } from 'styles/theme';
import { ReactComponent as LOL_LOGO } from 'assets/svg/lol(gray).svg';
import { ReactComponent as PUBG_LOGO } from 'assets/svg/pubg(gray).svg';
import LolSvg from '../SvgElement/LolSvg';
import PubgSvg from '../SvgElement/PubgSvg';
import OverWatchSvg from '../SvgElement/OverWatchSvg';

const LeftNav = () => {
  const { handleSelectNavItem } = useNav();
  const selectNavName = useRecoilValue(leftNavItemState);

  const isSelectedGameArg = useCallback(
    (arg: string) => {
      return arg === selectNavName;
    },
    [selectNavName]
  );

  console.log(selectNavName);
  // TODO: 일단 컴포넌트 다 만들고 생각해야겠당 잠와..
  return (
    <LeftNavWrapper>
      <UserWrapper>
        <UserProfileImg />
        <UserName>로그인을 해주세요.</UserName>
      </UserWrapper>
      <GameListWrapper>
        <GameList
          onClick={() => handleSelectNavItem('lol')}
          isSelected={isSelectedGameArg('lol')}
        >
          <IconWrapper>
            <LolSvg
              width={32}
              height={34.16}
              color={
                selectNavName === 'lol' ? color.brown : color.grayScale[100]
              }
            />
          </IconWrapper>
          <GameName isSelected={isSelectedGameArg('lol')}>
            리그오브레전드
          </GameName>
        </GameList>
        <GameList
          onClick={() => handleSelectNavItem('pubg')}
          isSelected={isSelectedGameArg('pubg')}
        >
          <IconWrapper>
            <PubgSvg
              width={43}
              height={27}
              color={
                selectNavName === 'pubg' ? color.brown : color.grayScale[100]
              }
            />
          </IconWrapper>
          <GameName isSelected={isSelectedGameArg('pubg')}>
            배틀그라운드
          </GameName>
        </GameList>
        <GameList
          onClick={() => handleSelectNavItem('overwatch')}
          isSelected={isSelectedGameArg('overwatch')}
        >
          <IconWrapper>
            <OverWatchSvg
              width={32}
              height={32}
              color={
                selectNavName === 'overwatch'
                  ? color.brown
                  : color.grayScale[100]
              }
            />
          </IconWrapper>
          <GameName isSelected={isSelectedGameArg('overwatch')}>
            오버워치
          </GameName>
        </GameList>
      </GameListWrapper>
      <HashTagWrapper>
        <HashTagTitle>인기 해시태그</HashTagTitle>
        <HashTagItemWrapper>
          <HashTagItem>
            <HashTagName>#Tag</HashTagName>
            <CountPosts>게시물 1,102개</CountPosts>
          </HashTagItem>
        </HashTagItemWrapper>
      </HashTagWrapper>
      <LastWrapper />
    </LeftNavWrapper>
  );
};

export default LeftNav;

const LeftNavWrapper = styled.section`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 290px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[500]};

  & > * + * {
    margin-left: 10px;
  }
`;

const UserProfileImg = styled.div`
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserName = styled.div`
  ${({ theme }) => theme.typography.bodyRg};
  color: ${({ theme }) => theme.color.blackScale[500]};
`;

const GameListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin-top: 14px;
`;

const GameList = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.yellow : theme.color.white};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: red;
`;

const IconWrapper = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
`;

const GameIcon = styled.img`
  object-fit: cover;
`;

const GameName = styled.div<{ isSelected: boolean }>`
  ${({ theme, isSelected }) =>
    isSelected ? theme.typography.bodyRgBold : theme.typography.bodyRg};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.blackScale[50] : theme.color.grayScale[500]};
`;

const HashTagWrapper = styled.div`
  margin-top: 19px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.color.grayScale[500]};
  width: 100%;
  max-width: 290px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[500]};
`;

const HashTagTitle = styled.div`
  ${({ theme }) => theme.typography.bodySmRegular};
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-bottom: 20px;
`;

const HashTagItemWrapper = styled.div``;

const HashTagItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HashTagName = styled.div`
  ${({ theme }) => theme.typography.headRg};
`;

const CountPosts = styled.div`
  ${({ theme }) => theme.typography.bodySmRegular};
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const LastWrapper = styled.div`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  width: 100%;
  max-width: 290px;
  height: 100px;
`;
