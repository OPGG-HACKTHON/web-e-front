import { getUsersList } from 'atom/searchAreaAtom';
import Button from 'common/Button';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { ThemeContext } from 'styled-components';
import profilePic from 'assets/svg/프로필사진.svg';
import { ErrorWrapper } from 'styles/mainStyles/videoComponents/videoWrapper';
import { videoModalAtom } from 'atom/videoModalAtom';
import useFollow from 'hooks/useFollow';

const SearchUser = () => {
  const themeStyle = useContext(ThemeContext);
  const history = useHistory();
  const gotoLink = (userId) => {
    history.push(`profile/${userId}`);
  };
  const users = useRecoilValue(getUsersList);
  console.log(users);

  const videoModalState = useRecoilValue(videoModalAtom);

  const [followNumber, setFollowNumber] = useState<number>(
    videoModalState.followNumber
  );
  const [isFollow, setFollowState] = useState<boolean>(
    videoModalState.relation.isFollow
  );

  useEffect(() => {
    if (videoModalState.videoId !== -1) {
      setFollowNumber(videoModalState.followNumber);
      setFollowState(videoModalState.relation.isFollow);
    }
  }, [videoModalState]);

  const { handleFollow, handleUnFollow, followErrorStatus } = useFollow();

  const onClickFollowBtn = () => {
    if (isFollow) {
      handleUnFollow(videoModalState.uploaderId).then((res) => {
        if (res.status < 300) {
          // 왜 err 나도 catch에서 못잡지???
          setFollowState(false);
          setFollowNumber((prev) => prev - 1);
        }
      });
    } else {
      handleFollow(videoModalState.uploaderId).then((res) => {
        if (res.status < 300) {
          setFollowState(true);
          setFollowNumber((prev) => prev + 1);
        }
      });
    }
  };

  if (users.length) {
    return (
      <>
        {users.map((user) => (
          <UserWrapper key={user.userId}>
            <UserContent onClick={() => gotoLink(user.userId)}>
              <UserPhotoWrapper>
                <UserPhoto src={user.userPhotoURL || profilePic} alt="alt" />
              </UserPhotoWrapper>
              <UserIdWrapper>{user.userName}</UserIdWrapper>
            </UserContent>
            <FollowBtnWrapper>
              <Button
                text={isFollow ? '팔로우 취소' : '팔로우'}
                onClick={onClickFollowBtn}
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
  }
  return <ErrorWrapper>등록되지 않은 사용자입니다.</ErrorWrapper>;
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
