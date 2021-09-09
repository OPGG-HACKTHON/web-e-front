import Button from 'common/Button';
import CheckBox from 'common/CheckBox';
import React, { useMemo, memo } from 'react';
import styled from 'styled-components';
import useAuth from 'hooks/useAuth';
import { termsCheckedProps } from 'types/auth';
import { useRecoilValue } from 'recoil';
import { allAgreeTerms, termsCheckedAtom } from 'atom/authAtom';
import { registerText } from 'model/authModel';

import { color, typography } from 'styles/theme';
import { EButtonType } from '../Register';

type Props = {
  pageHandler: (buttonType: EButtonType) => () => void;
};

const AgreementTerms = ({ pageHandler }: Props) => {
  const { handleCheckAllAgree, handleCheckedTerms } = useAuth();
  const termsChecked = useRecoilValue(termsCheckedAtom);
  const allAgree = useRecoilValue(allAgreeTerms);

  const buttonProps = useMemo(() => {
    if (termsChecked.utilization && termsChecked.personalinformation) {
      return {
        width: 38,
        height: 4,
        hoverBkgColor: color.yellow,
        onClick: pageHandler(EButtonType.NEXT),
        fontColor: color.white,
        bkgColor: color.yellow,
      };
    }
    return {
      width: 38,
      height: 4,
      hoverBkgColor: color.grayScale[50],
      onClick: () => '',
      fontColor: color.grayScale[500],
      bkgColor: color.grayScale[50],
    };
  }, [pageHandler, termsChecked.personalinformation, termsChecked.utilization]);

  return (
    <AgreementTermsWrapper>
      <AgreeWrapper>
        <CheckBox
          onClick={handleCheckAllAgree}
          checked={allAgree}
          color={color.yellow}
        />
        <AllAgreeWrapperText>전체 동의</AllAgreeWrapperText>
      </AgreeWrapper>
      <HorizontalLine />
      <TermsWrapper>
        <UtilizationWrapper>
          <AgreeWrapper>
            <CheckBox
              onClick={() => handleCheckedTerms('utilization')}
              checked={termsChecked.utilization}
              color={color.yellow}
            />
            <AllAgreeWrapperText>왓플 이용 약관</AllAgreeWrapperText>
          </AgreeWrapper>
          <TextWrapper>{registerText[0]}</TextWrapper>
        </UtilizationWrapper>
        <UtilizationWrapper>
          <AgreeWrapper>
            <CheckBox
              onClick={() => handleCheckedTerms('personalinformation')}
              checked={termsChecked.personalinformation}
              color={color.yellow}
            />
            <AllAgreeWrapperText>
              왓플의 개인정보 수집이용 등에 대한 동의
            </AllAgreeWrapperText>
          </AgreeWrapper>
          <TextWrapper>{registerText[1]}</TextWrapper>
        </UtilizationWrapper>
        <UtilizationWrapper>
          <AgreeWrapper>
            <CheckBox
              onClick={() => handleCheckedTerms('pushEvent')}
              checked={termsChecked.pushEvent}
              color={color.yellow}
            />
            <AllAgreeWrapperText>
              이벤트 등 프로모션 알림 메일 및 푸시 알림 수신
              <br />
              <ChoiceText>(선택)</ChoiceText>
            </AllAgreeWrapperText>
          </AgreeWrapper>
          <TextWrapper>{registerText[2]}</TextWrapper>
        </UtilizationWrapper>
        <UnderShadow />
      </TermsWrapper>
      <ButtonWrapper>
        <Button
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...buttonProps}
          text="다음"
          padding=""
          borderRadius={0.5}
          fontStyle={typography.bodyRgBold}
        />
      </ButtonWrapper>
    </AgreementTermsWrapper>
  );
};

export default memo(AgreementTerms);

const ChoiceText = styled.span`
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const AgreementTermsWrapper = styled.div``;

const AgreeWrapper = styled.div`
  display: flex;
`;

const AllAgreeWrapperText = styled.div`
  ${({ theme }) => theme.typography.bodyRgBold};
  margin-left: 6px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.grayScale[250]};
  margin: 10px 0px;
`;

const TermsWrapper = styled.div`
  width: 100%;
  height: 325px;
  overflow-y: auto;
  position: relative;
`;

const UtilizationWrapper = styled.div``;

const TextWrapper = styled.div`
  width: 100%;
  height: 120px;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  border-radius: 5px;
  padding: 6px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  font-size: 6px;
  overflow-y: auto;
  margin: 10px 0px;
`;

const ButtonWrapper = styled.div`
  margin-top: 15px;
`;

const UnderShadow = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 20px;
  box-shadow: inset 0px -13px 12px -10px ${({ theme }) => theme.color.white};
`;
