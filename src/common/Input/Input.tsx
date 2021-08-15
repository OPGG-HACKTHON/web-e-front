import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

type Props = {
  inputType?: string;
  width?: string;
  height?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  placeHolderFontSize?: string;
  borderRadius?: string;
  borderStyle?: string;
  backgroundColor: string;
  placeHolderColor?: string;
  fontSize: string;
  paddingStyle: string;
  fontColor?: string;
  name: string;
};

interface IInputStyleProps {
  width: string;
  height: string;
  borderRadius?: string;
  borderStyle?: string;
  backgroundColor: string;
  placeHolderColor: string;
  fontSize: string;
  paddingStyle: string;
  placeHolderFontSize: string;
  fontColor: string;
}

const Input = ({
  inputType,
  width = '100%',
  height = '1rem',
  value,
  onChange,
  placeHolder = '',
  borderRadius,
  borderStyle = 'none',
  backgroundColor,
  placeHolderColor = '#000',
  fontSize,
  paddingStyle,
  placeHolderFontSize = '1rem',
  fontColor = '#000',
  name,
}: Props) => {
  return (
    <InputItem
      type={inputType}
      value={value}
      onChange={onChange}
      width={width}
      height={height}
      placeholder={placeHolder}
      borderRadius={borderRadius}
      borderStyle={borderStyle}
      backgroundColor={backgroundColor}
      placeHolderColor={placeHolderColor}
      fontSize={fontSize}
      paddingStyle={paddingStyle}
      placeHolderFontSize={placeHolderFontSize}
      fontColor={fontColor}
      name={name}
    />
  );
};

export default Input;

const InputItem = styled.input<IInputStyleProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: ${({ borderStyle }) => borderStyle};
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-size: ${({ fontSize }) => fontSize};
  padding: ${({ paddingStyle }) => paddingStyle};
  color: ${({ fontColor }) => fontColor};

  &::placeholder {
    color: ${({ placeHolderColor }) => placeHolderColor};
    font-size: ${({ placeHolderFontSize }) => placeHolderFontSize};
  }

  &:focus {
    outline: none;
  }
`;

Input.defaultProps = {
  inputType: 'text',
  width: '100%',
  height: '100%',
  borderRadius: 0,
  borderStyle: 'none',
  placeHolder: '',
  placeHolderFontSize: '1rem',
  placeHolderColor: '#000',
  fontColor: '#000',
};
