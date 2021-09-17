import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { videoModalAtom } from 'atom/videoModalAtom';
import useFollow from 'hooks/useFollow';
import { fetchProfileInfo } from 'api/profile/profile';
import { profileType } from 'api/profile/profile.type';
import Button from 'common/Button';
import { typography } from 'styles/theme';
import { useHistory } from 'react-router-dom';
import DefaultProfile40 from 'assets/svg/defaultProfile/profile_40.svg';

const UploaderSection = () => {
  const history = useHistory();
  const themeStyle = useContext(ThemeContext);
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

  const [uploaderProfile, setUploaderProfile] = useState<profileType>();

  useEffect(() => {
    if (videoModalState.videoId !== -1) {
      (async () => {
        try {
          const res = await fetchProfileInfo(videoModalState.uploaderId);
          setUploaderProfile(res.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [videoModalState]);

  return (
    <ContentWrapper gray={themeStyle.color.grayScale[250]}>
      <ProfileWrapper>
        <ProfileImage
          onClick={() => history.push(`/profile/${videoModalState.uploaderId}`)}
          src={uploaderProfile?.userPhotoURL || DefaultProfile40}
        />
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

const ProfileImage = styled.img`
  border-radius: 5px;
  height: 40px;
  width: 40px;
  cursor: pointer;
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
