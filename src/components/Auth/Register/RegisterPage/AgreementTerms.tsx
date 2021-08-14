import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from 'styles/theme';

const AgreementTerms = () => {
  const [test, setTest] = useState(false);
  const handler = () => {
    setTest((prev) => !prev);
  };
  return (
    <AgreementTermsWrapper>
      <AllAgreeWrapper>
        <AllAgreeWrapperText>전체 동의</AllAgreeWrapperText>
        <CheckBoxContainer onClick={handler}>
          <HiddenCheckBox type="checkBox" checked={test} onClick={handler} />
          <StyledCheckBox checked={test}>
            <Icon viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" fill={color.yellow} />
            </Icon>
          </StyledCheckBox>
        </CheckBoxContainer>
      </AllAgreeWrapper>
    </AgreementTermsWrapper>
  );
};

export default AgreementTerms;

const AgreementTermsWrapper = styled.div``;

const AllAgreeWrapper = styled.div`
  display: flex;
`;

const AllAgreeWrapperText = styled.div`
  ${({ theme }) => theme.typography.bodyRgBold}
`;
const CheckBoxContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckBox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: ${({ checked, theme }) =>
    checked
      ? `solid 1px ${theme.color.yellow}`
      : `solid 1px ${theme.color.grayScale[250]}`};
  background: ${(props) => (props.checked ? 'white' : 'white')};
  transition: all 150ms;
  border-radius: 50%;

  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;
