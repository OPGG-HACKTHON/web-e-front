import React from 'react';
import styled from 'styled-components';

type Props = {
  checked: boolean;
  onClick: () => void;
  color: string;
};

const CheckBox = ({ onClick, checked, color }: Props) => {
  return (
    <>
      <CheckBoxContainer onClick={onClick}>
        <HiddenCheckBox type="checkBox" checked={checked} onClick={onClick} />
        <StyledCheckBox checked={checked}>
          <Icon viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" fill={color} />
          </Icon>
        </StyledCheckBox>
      </CheckBoxContainer>
    </>
  );
};

export default CheckBox;

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
