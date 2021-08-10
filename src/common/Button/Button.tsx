/* eslint-disable indent */
import React, { useCallback, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Spinner from 'common/Spinner';
import { darken } from 'polished';

type Props = {
  text: string;
  onClick?: () => void;
  fontColor: string;
  bkgColor: string;
  hoverBkgColor?: string;
  padding: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  isLoading?: boolean;
  fontStyle?: string;
  border?: string;
  hoverFontColor?: string;
};

interface IButtonStyleProps {
  fontColor: string;
  bkgColor: string;
  hoverBkgColor: string;
  padding: string;
  width: number;
  height: number;
  borderRadius: number;
  fontStyle: string;
  border: string;
  hoverFontColor: string;
}

const Button = ({
  text,
  onClick = () => '',
  fontColor,
  bkgColor,
  hoverBkgColor = '',
  padding,
  width = 0,
  height = 0,
  borderRadius = 0,
  isLoading = false,
  fontStyle = '',
  border = 'none',
  hoverFontColor = '',
}: Props) => {
  const themeStyle = useContext(ThemeContext);
  const handleClick = useCallback((): void => {
    if (isLoading) {
      return;
    }

    onClick();
  }, [isLoading, onClick]);

  return (
    <ButtonStyle
      onClick={handleClick}
      fontColor={fontColor}
      bkgColor={bkgColor}
      hoverBkgColor={hoverBkgColor}
      padding={padding}
      width={width}
      height={height}
      borderRadius={borderRadius}
      fontStyle={fontStyle}
      border={border}
      hoverFontColor={hoverFontColor}
    >
      {isLoading ? <Spinner color={themeStyle.color.white} size={16} /> : text}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<IButtonStyleProps>`
  color: ${({ fontColor }) => fontColor};
  background-color: ${({ bkgColor }) => bkgColor};
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  border-radius: ${({ borderRadius }) => `${borderRadius}rem`};
  padding: ${({ padding }) => padding};
  ${({ fontStyle }) => fontStyle}
  border: ${({ border }) => border};
  cursor: pointer;
  transition: all 0.1s ease-out;

  &:hover {
    color: ${({ hoverFontColor }) => hoverFontColor};
    background-color: ${({ hoverBkgColor, bkgColor }) =>
      hoverBkgColor === '' ? `${darken(0.1, bkgColor)}` : hoverBkgColor};
  }
`;

Button.defaultProps = {
  hoverBkgColor: '',
  width: '',
  height: 0,
  borderRadius: 0,
  isLoading: false,
  fontStyle: '',
  border: 'none',
  hoverFontColor: '',
  onClick: () => '',
};
