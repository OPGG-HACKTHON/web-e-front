import Button from 'common/Button';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const SearchUser = () => {
  const themeStyle = useContext(ThemeContext);

  const gotoLink = (userId) => {
    window.location.href = `profile/${userId}`;
  };

  const users = [
    {
      userId: 'user1',
      userName: 'user1',
      userPhotoURL: 'users/profile_image_dummy.svg',
      userIntro: null,
      isPro: false,
      relation: {
        isFollow: false,
      },
    },
    {
      userId: 'user2',
      userName: 'user2',
      userPhotoURL: 'users/profile_image_dummy.svg',
      userIntro: null,
      isPro: false,
      relation: {
        isFollow: false,
      },
    },
    {
      userId: 'user22',
      userName: 'user22',
      userPhotoURL: 'users/profile_image_dummy.svg',
      userIntro: null,
      isPro: false,
      relation: {
        isFollow: false,
      },
    },
    {
      userId: 'test',
      userName: 'test',
      userPhotoURL: 'users/profile_image_dummy.svg',
      userIntro: null,
      isPro: false,
      relation: {
        isFollow: false,
      },
    },
  ];
  return (
    <>
      {users.map((user) => (
        <UserWrapper key={user.userId}>
          <UserContent onClick={() => gotoLink(user.userId)}>
            <UserPhotoWrapper>
              <UserPhoto src={user.userPhotoURL} alt="alt" />
            </UserPhotoWrapper>
            <UserIdWrapper>{user.userId}</UserIdWrapper>
          </UserContent>
          <FollowBtnWrapper>
            <Button
              text="팔로우"
              onClick={() => console.log('팔로우')}
              fontColor={themeStyle.color.white}
              bkgColor={themeStyle.color.yellow}
              padding="0.8rem 0.7rem"
              width={7}
              height={3.6}
              borderRadius={0.5}
              fontStyle={themeStyle.typography.bodyRgBold}
              hoverBkgColor={themeStyle.color.white}
              hoverFontColor={themeStyle.color.yellow}
            />
          </FollowBtnWrapper>
        </UserWrapper>
      ))}
    </>
  );
};

export default SearchUser;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[500]};
`;
const UserContent = styled.div`
  display: flex;
  cursor: pointer;
`;
const UserPhotoWrapper = styled.div`
  margin: 2rem 0;
`;
const UserPhoto = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 5px;
`;
const UserIdWrapper = styled.p`
  ${({ theme }) => theme.typography.headRgBold};
  line-height: 10rem;
  margin-left: 2rem;
`;
const FollowBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;
