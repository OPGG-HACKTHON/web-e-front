import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { videoModalAtom } from 'atom/videoModalAtom';
import useFollow from 'hooks/useFollow';
import Button from 'common/Button';
import { typography } from 'styles/theme';

const UploaderSection = () => {
  const themeStyle = useContext(ThemeContext);
  const videoModalState = useRecoilValue(videoModalAtom);
  const [followNumber, setFollowNumber] = useState<number>(
    videoModalState.followNumber
  );
  const [isFollow, setFollowState] = useState<boolean>(
    videoModalState.relation.isFollow
  );

  useEffect(() => {
    setFollowNumber(videoModalState.followNumber);
    setFollowState(videoModalState.relation.isFollow);
  }, [videoModalState]);

  const { handleFollow, handleUnFollow, followErrorStatus } = useFollow();

  const onClickFollowBtn = () => {
    if (isFollow) {
      handleUnFollow(videoModalState.uploaderId);
      setFollowState(false);
      setFollowNumber((prev) => prev - 1);
    } else {
      handleFollow(videoModalState.uploaderId);
      setFollowState(true);
      setFollowNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    switch (followErrorStatus) {
      case 401:
        alert('로그인이 필요한 서비스입니다.');
        break;
      case 404:
        alert('탈퇴한 사용자입니다.');
        break;
      case 405:
        alert('자신을 팔로우 할 수 없습니다.');
        break;
      case 409:
        alert('이미 팔로우한 사용자입니다.');
        break;
      default:
        break;
    }
  }, [followErrorStatus]);

  return (
    <ContentWrapper gray={themeStyle.color.grayScale[250]}>
      <ProfileWrapper>
        <ProfileImage />
        <ProfileText>
          <ProfileName>{videoModalState.uploaderId}</ProfileName>
          <ProfileFollow gray={themeStyle.color.grayScale[500]}>
            {`팔로우 ${followNumber}`}
          </ProfileFollow>
        </ProfileText>
        <Button
          text={isFollow ? '팔로우 취소' : '팔로우'}
          onClick={onClickFollowBtn}
          fontColor={themeStyle.color.white}
          bkgColor={themeStyle.color.yellow}
          padding=""
          width={6.9}
          height={3.6}
          borderRadius={0.5}
          fontStyle={typography.bodyRgBold}
        />
      </ProfileWrapper>
      <DescriptionParagraph>{videoModalState.videoIntro}</DescriptionParagraph>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div<{ gray: string }>`
  border-bottom: ${(props) => `1px solid ${props.gray}`};
  height: 180px;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
`;

const ProfileImage = styled.div`
  border-radius: 5px;
  height: 40px;
  width: 40px;
  background: gray;
`;

const ProfileText = styled.div`
  width: 225px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProfileName = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
`;

const ProfileFollow = styled.div<{ gray: string }>`
  color: ${(props) => props.gray};
  ${typography.bodySmRegular};
`;

const FollowButton = styled.div<{ mainColor: string }>`
  width: 70px;
  height: 36px;
  font-size: 1.4rem;
  background: ${(props) => props.mainColor};
  color: white;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;

const DescriptionParagraph = styled.p`
  width: 100%;
  font-size: 1.2rem;
`;

export default UploaderSection;
