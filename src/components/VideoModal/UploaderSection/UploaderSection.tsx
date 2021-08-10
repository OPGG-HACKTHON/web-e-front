import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { typography } from 'styles/theme';

const UploaderSection = () => {
  const themeStyle = useContext(ThemeContext);
  return (
    <ContentWrapper gray={themeStyle.color.grayScale[250]}>
      <ProfileWrapper>
        <ProfileImage />
        <ProfileText>
          <ProfileName>lolking_123</ProfileName>
          <ProfileFollow gray={themeStyle.color.grayScale[500]}>
            팔로우 123
          </ProfileFollow>
        </ProfileText>
        <FollowButton mainColor={themeStyle.color.yellow}>팔로우</FollowButton>
      </ProfileWrapper>
      <DescriptionParagraph>
        레오나로 아칼리 솔킬 #매드무비
      </DescriptionParagraph>
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
