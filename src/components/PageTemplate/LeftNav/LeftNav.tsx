/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */

import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useNav from 'hooks/useNav';
import useProfile from 'hooks/useProfile/useProfile';
import Button from 'common/Button';
import useFollow from 'hooks/useFollow';
import { useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import { leftNavItemState } from 'atom/pageAtom';
import { uploadModalPopState } from 'atom/uploadModalPopStateAtom';
import { color, typography } from 'styles/theme';
import { EGameList } from 'enum/game.enum';
import { findUser, myProfileAtom } from 'atom/profileAtom';
import { fetchUserInfoAtom } from 'atom/userAtom';
import { myFollowingListAtom } from 'atom/followAtom';
import NotionSvg from 'assets/svg/Notion.svg';
import InstagramSvg from 'assets/svg/Instagram.svg';

import WhiteProImg from 'assets/svg/proWhite.svg';
import YellowProImg from 'assets/svg/pro.svg';
import DefaultProfile40 from 'assets/svg/defaultProfile/profile_40.svg';
import LolSvg from '../SvgElement/LolSvg';
import PubgSvg from '../SvgElement/PubgSvg';
import OverWatchSvg from '../SvgElement/OverWatchSvg';

const LeftNav = () => {
  const { handleSelectNavItem, isLocationProfile, isKeywordsItemExist } =
    useNav();
  const findUserProfileId = useRecoilValue(findUser);
  const [selectNavName, setSelectName] = useRecoilState(leftNavItemState);
  const myProfile = useRecoilValue(myProfileAtom);
  const myFollowingList = useRecoilValue(myFollowingListAtom);

  const { handleMyProfile, fetchUserId } = useProfile();
  const { handleFollow, setFollowObj, handleUnFollow } = useFollow();
  const [isUploadModalPoped, setUploadModalPopstate] =
    useRecoilState(uploadModalPopState);
  const userInfo = useRecoilValue(fetchUserInfoAtom);

  const { userPhotoURL, userName, userId, isPro } = userInfo;
  const { id }: { id: string } = useParams();
  const isSelectedGameArg = useCallback(
    (arg: EGameList) => {
      return arg === selectNavName;
    },
    [selectNavName]
  );

  useEffect(() => {
    setFollowObj((prev) => ({
      ...prev,
      userId: fetchUserId,
    }));
  }, [fetchUserId, setFollowObj]);

  useEffect(() => {
    handleMyProfile();
  }, [handleMyProfile]);

  useEffect(() => {
    if (isLocationProfile) {
      return setSelectName(EGameList.NONE);
    }
  }, [isLocationProfile, isSelectedGameArg, setSelectName]);

  const onClickUpload = () => {
    if (myProfile?.id) setUploadModalPopstate(true);
    else alert('로그인이 필요한 기능입니다!');
  };

  const ButtonStyle = useMemo(() => {
    if (isLocationProfile) {
      return {
        fontColor: color.yellow,
        bkgColor: color.white,
        hoverBkgColor: color.white,
      };
    }
    return {
      fontColor: color.white,
      bkgColor: color.yellow,
    };
  }, [isLocationProfile]);

  return (
    <LeftNavWrapper>
      <StickyWrapper>
        <UserWrapper isProfile={isLocationProfile && myProfile?.id !== null}>
          <UserInfoSection>
            <UserProfileImg src={userPhotoURL || DefaultProfile40} />
            <UserName>
              {myProfile?.id === null ? '로그인을 해주세요.' : userName}
            </UserName>
            {isPro && myProfile?.id !== null ? (
              isPro && isLocationProfile && myProfile?.id !== null ? (
                <ProImgWrapper src={WhiteProImg} alt="whitePro" />
              ) : (
                <ProImgWrapper src={YellowProImg} alt="yellowPro" />
              )
            ) : (
              ''
            )}
          </UserInfoSection>

          {id !== undefined ? (
            myFollowingList &&
            myFollowingList.some((args) => {
              return args.userId === userId;
            }) ? (
              <Button
                text="언팔로우"
                onClick={() => handleUnFollow(userId)}
                {...ButtonStyle}
                padding=""
                width={6.9}
                height={3.6}
                borderRadius={0.5}
                fontStyle={typography.bodyRgBold}
              />
            ) : (
              <Button
                text="팔로우"
                onClick={() => handleFollow(userId)}
                {...ButtonStyle}
                padding=""
                width={6.9}
                height={3.6}
                borderRadius={0.5}
                fontStyle={typography.bodyRgBold}
              />
            )
          ) : (
            <Button
              text="업로드"
              onClick={onClickUpload}
              {...ButtonStyle}
              padding=""
              width={6.9}
              height={3.6}
              borderRadius={0.5}
              fontStyle={typography.bodyRgBold}
            />
          )}
        </UserWrapper>
        <Line />
        <GameListWrapper isNoneClick={isLocationProfile}>
          <GameList
            onClick={() => handleSelectNavItem(EGameList.LOL)}
            isSelected={
              isKeywordsItemExist
                ? isSelectedGameArg(EGameList.NONE)
                : isSelectedGameArg(EGameList.LOL)
            }
          >
            <IconWrapper>
              <LolSvg
                width={32}
                height={34.16}
                color={
                  isKeywordsItemExist
                    ? color.grayScale[100]
                    : selectNavName === EGameList.LOL
                    ? color.brown
                    : color.grayScale[100]
                }
              />
            </IconWrapper>
            <GameName
              isSelected={
                isKeywordsItemExist
                  ? isSelectedGameArg(EGameList.NONE)
                  : isSelectedGameArg(EGameList.LOL)
              }
            >
              리그오브레전드
            </GameName>
          </GameList>
          <GameList
            onClick={() => handleSelectNavItem(EGameList.PUBG)}
            isSelected={
              isKeywordsItemExist
                ? isSelectedGameArg(EGameList.NONE)
                : isSelectedGameArg(EGameList.PUBG)
            }
          >
            <IconWrapper>
              <PubgSvg
                width={43}
                height={27}
                color={
                  isKeywordsItemExist
                    ? color.grayScale[100]
                    : selectNavName === EGameList.PUBG
                    ? color.brown
                    : color.grayScale[100]
                }
              />
            </IconWrapper>
            <GameName
              isSelected={
                isKeywordsItemExist
                  ? isSelectedGameArg(EGameList.NONE)
                  : isSelectedGameArg(EGameList.PUBG)
              }
            >
              배틀그라운드
            </GameName>
          </GameList>
          <GameList
            onClick={() => handleSelectNavItem(EGameList.OVERWATCH)}
            isSelected={
              isKeywordsItemExist
                ? isSelectedGameArg(EGameList.NONE)
                : isSelectedGameArg(EGameList.OVERWATCH)
            }
          >
            <IconWrapper>
              <OverWatchSvg
                width={32}
                height={32}
                color={
                  isKeywordsItemExist
                    ? color.grayScale[100]
                    : selectNavName === EGameList.OVERWATCH
                    ? color.brown
                    : color.grayScale[100]
                }
              />
            </IconWrapper>
            <GameName
              isSelected={
                isKeywordsItemExist
                  ? isSelectedGameArg(EGameList.NONE)
                  : isSelectedGameArg(EGameList.OVERWATCH)
              }
            >
              오버워치
            </GameName>
          </GameList>
        </GameListWrapper>
        <FooterWrapper>
          <FooterTopWrapper>
            <FooterText>
              <FooterLink
                href="https://bedecked-bun-7a1.notion.site/Watch-your-Play-1fd4348ef20d45fba912c749f4013351"
                target="_blank"
                rel="noreferrer"
              >
                About WAPL
              </FooterLink>
            </FooterText>
            <IconItemsWrapper>
              <a
                href="https://bedecked-bun-7a1.notion.site/Watch-your-Play-1fd4348ef20d45fba912c749f4013351"
                target="_blank"
                rel="noreferrer"
              >
                <img src={NotionSvg} alt="" />
              </a>
              <a
                href="https://www.instagram.com/watpl_official/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={InstagramSvg} alt="" />
              </a>
            </IconItemsWrapper>
          </FooterTopWrapper>
          <CopyRightText>Copyright© 2021 WATPL</CopyRightText>
        </FooterWrapper>
      </StickyWrapper>
    </LeftNavWrapper>
  );
};

export default LeftNav;

const ProImgWrapper = styled.img`
  margin-left: 5px;
`;

const CopyRightText = styled.div`
  color: ${({ theme }) => theme.color.grayScale[500]};
  ${({ theme }) => theme.typography.bodyRg}
  font-size: 11px !important;
  margin-top: 6px;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.color.grayScale[500]};
  text-decoration: none;
`;

const FooterWrapper = styled.div`
  margin-top: 19px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.color.grayScale[500]};
  width: 100%;
  max-width: 290px;
  padding-bottom: 15px;
`;

const FooterTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconItemsWrapper = styled.div`
  display: flex;

  & > * + * {
    margin-left: 10px;
  }
  & > * {
    cursor: pointer;
  }
`;

const FooterText = styled.div`
  color: ${({ theme }) => theme.color.grayScale[500]};
  ${({ theme }) => theme.typography.bodyRg}
`;

const Line = styled.div`
  width: 290px;
  height: 1px;
  background-color: ${({ theme }) => theme.color.grayScale[500]};
  margin-top: 14px;
`;

const UserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * + * {
    margin-left: 10px;
  }
`;

const LeftNavWrapper = styled.div`
  width: 100%;
  margin-top: 27px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StickyWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 55px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UserWrapper = styled.div<{ isProfile: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ isProfile, theme }) =>
    isProfile ? theme.color.yellow : ''};
  width: 100%;
  max-width: 300px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 9px;
  /* padding-bottom: 26px; */
  justify-content: space-between;
`;

const UserProfileImg = styled.img`
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  width: 40px;
  height: 40px;
  border-radius: 5px;
`;

const UserName = styled.div`
  ${({ theme }) => theme.typography.bodyRg};
  color: ${({ theme }) => theme.color.blackScale[500]};
`;

const GameListWrapper = styled.div<{ isNoneClick: boolean }>`
  cursor: ${({ isNoneClick }) => (isNoneClick ? 'default' : 'pointer')};
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

const GameName = styled.div<{ isSelected: boolean }>`
  ${({ theme, isSelected }) =>
    isSelected ? theme.typography.bodyRgBold : theme.typography.bodyRg};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.blackScale[50] : theme.color.grayScale[500]};
  margin-left: 3px;
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
