/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import CLOSE_BUTTON from 'assets/svg/X.svg';
import Button from 'common/Button';
import { color, typography } from 'styles/theme';
import useFollow from 'hooks/useFollow';
import { useRecoilValue } from 'recoil';
import {
  followerListAtom,
  followingListAtom,
  myFollowingListAtom,
} from 'atom/followAtom';
import useProfile from 'hooks/useProfile/useProfile';

export enum EFollow {
  FOLLOWING,
  FOLLOWER,
}

type props = {
  followType: EFollow;
  close: () => void;
};

const FollowType = ({ followType, close }: props) => {
  const followerList = useRecoilValue(followerListAtom);
  const followingList = useRecoilValue(followingListAtom);
  const myFollowList = useRecoilValue(myFollowingListAtom);
  const { fetchUserId, handleMyProfile } = useProfile();
  const followTypeButton = useMemo(
    () => ({
      fontColor: color.white,
      bkgColor: color.yellow,
      padding: '',
      width: 5.4,
      height: 2.3,
      fontStyle: typography.bodySmBold,
      borderRadius: 0.5,
    }),
    []
  );

  const unFollowTypeButton = useMemo(
    () => ({
      fontColor: color.grayScale[500],
      bkgColor: color.white,
      padding: '',
      width: 5.4,
      height: 2.3,
      fontStyle: typography.bodySmBold,
      borderRadius: 0.5,
    }),
    []
  );

  const { followObj, handleFollow, handleUnFollow } = useFollow();

  useEffect(() => {
    handleMyProfile();
  }, [handleMyProfile]);

  return (
    <Wrapper>
      <TopSection>
        <TopTitlte>
          {followType === EFollow.FOLLOWER ? '팔로워' : '팔로우'}{' '}
        </TopTitlte>
        <ExitButton src={CLOSE_BUTTON} alt="close_button" onClick={close} />
      </TopSection>
      <UserListWrapper>
        {followType === EFollow.FOLLOWER ? (
          <>
            {followerList &&
              followerList.map((data) => {
                const isAlreadyFollowing = myFollowList.some((args) => {
                  return args.userId === data.userId;
                });

                return (
                  <UserWrapper key={data.userName}>
                    <UserInfo>
                      <UserImg src={data.userPhotoURL} />
                      <UserName>{data.userName}</UserName>
                    </UserInfo>

                    {isAlreadyFollowing ? (
                      <Button
                        {...unFollowTypeButton}
                        text="팔로우"
                        onClick={() => handleUnFollow(data.userId)}
                      />
                    ) : (
                      <Button
                        {...followTypeButton}
                        text="팔로우"
                        onClick={() => handleFollow(data.userId)}
                      />
                    )}
                  </UserWrapper>
                );
              })}
          </>
        ) : (
          <>
            {followingList &&
              followingList.map((data) => {
                const isAlreadyFollowing = myFollowList.some((args) => {
                  return args.userId === data.userId;
                });

                return (
                  <UserWrapper key={data.userName}>
                    <UserInfo>
                      <UserImg src={data.userPhotoURL} />
                      <UserName>{data.userName}</UserName>
                    </UserInfo>

                    {isAlreadyFollowing ? (
                      <Button
                        {...unFollowTypeButton}
                        text="팔로우"
                        onClick={() => handleUnFollow(data.userId)}
                      />
                    ) : (
                      <Button
                        {...followTypeButton}
                        text="팔로우"
                        onClick={() => handleFollow(data.userId)}
                      />
                    )}
                  </UserWrapper>
                );
              })}
          </>
        )}
      </UserListWrapper>
    </Wrapper>
  );
};

export default FollowType;

const Wrapper = styled.div`
  width: 385px;
  height: 602px;
`;

const TopSection = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[500]};
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-end;
`;

const TopTitlte = styled.div`
  ${({ theme }) => theme.typography.headRgBold};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ExitButton = styled.img<{ isVisible?: boolean }>`
  width: 20px;
  height: 20px;
  visibility: ${({ isVisible }) => (isVisible ? 'hidden' : 'none')};
  margin-right: 10px;
  cursor: pointer;
`;

const UserListWrapper = styled.div`
  padding: 20px;
  overflow: auto;
`;

const UserWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
`;

const UserName = styled.div`
  ${({ theme }) => theme.typography.headRgBold}
  margin-left:10px;
`;
