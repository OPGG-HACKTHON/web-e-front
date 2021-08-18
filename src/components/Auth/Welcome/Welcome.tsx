import Button from 'common/Button';
import React from 'react';
import styled from 'styled-components';
import { color, typography } from 'styles/theme';

type Props = {
  onClick: () => void;
};

const Welcome = ({ onClick }: Props) => {
  return (
    <GrettingWrapper>
      <GrettingTextWrapper>
        <GrettingTopText>회원 가입이 완료되었습니다.</GrettingTopText>
        <GrettingBottomText>
          왓플의 다양한 기능을 로그인 후 이용하세요!
        </GrettingBottomText>
      </GrettingTextWrapper>
      <ButtonWrapper>
        <Button
          width={38}
          height={4}
          hoverBkgColor={color.yellow}
          onClick={onClick}
          fontColor={color.white}
          bkgColor={color.yellow}
          text="로그인 하기"
          padding="10px"
          borderRadius={0.5}
          fontStyle={typography.bodyRgBold}
        />
      </ButtonWrapper>
    </GrettingWrapper>
  );
};

export default Welcome;

const GrettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const GrettingTextWrapper = styled.div`
  text-align: center;
`;

const GrettingTopText = styled.div`
  ${({ theme }) => theme.typography.headRgBold}
`;

const GrettingBottomText = styled.div`
  ${({ theme }) => theme.typography.bodyRgBold}
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;
