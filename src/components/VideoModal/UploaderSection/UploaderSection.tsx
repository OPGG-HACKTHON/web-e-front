import React, { useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { videoModalAtom } from 'atom/videoModalAtom';
import useFollow from 'hooks/useFollow';
import Button from 'common/Button';
import { typography } from 'styles/theme';

const UploaderSection = () => {
  const themeStyle = useContext(ThemeContext);
  const videoModalState = useRecoilValue(videoModalAtom);

  const { handleFollow, handleUnFollow, followErrorStatus } = useFollow();

  const onClickFollowBtn = () => {
    if (videoModalState.relation.isFollow) {
      handleUnFollow(videoModalState.uploaderId);
    } else handleFollow(videoModalState.uploaderId);
  };

  useEffect(() => {
    if (followErrorStatus === 401) {
      alert('로그인이 필요한 서비스입니다.');
    }
    if (followErrorStatus === 405) {
      alert('나 자신을 팔로우 할 수 없습니다.');
    }
  }, [followErrorStatus]);

  return (
    <ContentWrapper gray={themeStyle.color.grayScale[250]}>
      <ProfileWrapper>
        <ProfileImage />
        <ProfileText>
          <ProfileName>{videoModalState.uploaderId}</ProfileName>
          <ProfileFollow gray={themeStyle.color.grayScale[500]}>
            {`팔로우 ${videoModalState.followNumber}`}
          </ProfileFollow>
        </ProfileText>
        <Button
          text={videoModalState.relation.isFollow ? '팔로우 취소' : '팔로우'}
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
