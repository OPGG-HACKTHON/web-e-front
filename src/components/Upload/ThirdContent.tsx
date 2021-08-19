import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { typography } from 'styles/theme';
import Button from 'common/Button';
import { enabledButtonStyle } from 'util/getButtonStyle';
import LevelThree from 'assets/svg/upload_level_3.svg';

interface IThirdContentProps {
  onClickClose: () => void;
}

const ThirdContent = ({ onClickClose }: IThirdContentProps) => {
  const themeStyle = useContext(ThemeContext);
  return (
    <ContentWrapper>
      <Header>
        <img src={LevelThree} alt="alt" />
      </Header>
      <Body>
        업로드가 완료되었습니다!
        <Button
          text="확인"
          onClick={onClickClose}
          fontColor={enabledButtonStyle.fontColor}
          bkgColor={enabledButtonStyle.backGroundColor}
          padding="0.8em 0.7em"
          width={5.6}
          height={3.6}
          borderRadius={0.5}
          fontStyle={themeStyle.typography.bodyRgBold}
          hoverBkgColor={enabledButtonStyle.hoverBackGroundColor}
          hoverFontColor={enabledButtonStyle.hoverFontColor}
        />
      </Body>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 45rem;
  height: 18.6rem;
`;

const Header = styled.div`
  height: 6.4rem;
  width: 100%;
  border-bottom: 1px solid rgba(196, 196, 196, 0.5);
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  margin-top: 2rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${typography.bodyRgBold};
`;

export default ThirdContent;
