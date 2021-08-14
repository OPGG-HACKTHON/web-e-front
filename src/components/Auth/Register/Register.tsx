/* eslint-disable indent */
import React, { useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import BACK_ARROW_IMG from 'assets/svg/backArrow.svg';
import CLOSE_BUTTON from 'assets/svg/X.svg';
import AgreementTerms from './RegisterPage/AgreementTerms';

type Props = {
  goToLogin: () => void;
};

enum EButtonType {
  NEXT,
  PREV,
}

const Register = ({ goToLogin }: Props) => {
  const [pageCount, setPageCount] = useState(0);

  const handlePage = useCallback(
    (buttonType: EButtonType) => () => {
      switch (buttonType) {
        case EButtonType.NEXT:
          return setPageCount((prev) => prev + 1);
        case EButtonType.PREV:
          return setPageCount((prev) => prev - 1);
        default:
          return buttonType;
      }
    },
    []
  );

  const pageSpecificText = useMemo(() => {
    let text = '';
    if (pageCount === 0) {
      text = '약관 동의';
    } else if (pageCount === 1) {
      text = '가입하기';
    } else {
      text = '추가 정보';
    }

    return text;
  }, [pageCount]);

  return (
    <RegisterWrapper>
      <TopSection>
        {pageCount === 0 ? (
          <TopUserClickButton
            onClick={handlePage(EButtonType.PREV)}
            alt="backArrowButton"
            src={BACK_ARROW_IMG}
            isVisible
          />
        ) : (
          <TopUserClickButton
            onClick={handlePage(EButtonType.PREV)}
            alt="backArrowButton"
            src={BACK_ARROW_IMG}
          />
        )}

        <TopText>{pageSpecificText}</TopText>
        <TopUserClickButton
          onClick={handlePage(EButtonType.NEXT)}
          alt="closeButton"
          src={CLOSE_BUTTON}
        />
      </TopSection>
      <PageSection>
        <AgreementTerms />
      </PageSection>
      <BottomLoginWrapper onClick={goToLogin}>
        <BottomLoginWrapperText>이미 회원이신가요?</BottomLoginWrapperText>
        <BottomGoToLoginText>로그인하기</BottomGoToLoginText>
      </BottomLoginWrapper>
    </RegisterWrapper>
  );
};

export default Register;

const PageSection = styled.div`
  padding: 20px 40px;
`;

const BottomGoToLoginText = styled.div`
  ${({ theme }) => theme.typography.bodySmBold};
  color: ${({ theme }) => theme.color.yellow};
  height: 18px;
  display: flex;
  align-items: flex-end;
`;

const BottomLoginWrapperText = styled.div`
  ${({ theme }) => theme.typography.bodySmRegular}
`;

const BottomLoginWrapper = styled.div`
  width: 100%;
  height: 57px;
  border-top: 1px solid ${({ theme }) => theme.color.grayScale[250]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > * + * {
    margin-left: 4px;
  }
`;

const RegisterWrapper = styled.div`
  position: relative;
  width: 460px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.white};
`;

const TopSection = styled.section`
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 66px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[250]};
  /* ${({ theme }) => theme.typography.headRgBold} */
`;

const TopUserClickButton = styled.img<{ isVisible?: boolean }>`
  width: 20px;
  height: 20px;
  visibility: ${({ isVisible }) => (isVisible ? 'hidden' : 'none')};
`;

const TopText = styled.div`
  ${({ theme }) => theme.typography.headRgBold}
`;
