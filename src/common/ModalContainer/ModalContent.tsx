import React from 'react';
import styled, { ThemeContext } from 'styled-components';

type Props = {
  contentComponent?: React.ReactNode;
  width?: number;
  height?: number;
  borderRadius?: number;
};

interface IModalStyleProps {
  width: number;
  height: number;
  borderRadius: number;
}

const ModalContent = ({
  contentComponent,
  width = 0,
  height = 0,
  borderRadius = 0,
}: Props) => {
  return (
    <ModalContentWrapper
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      {contentComponent}
    </ModalContentWrapper>
  );
};

export default ModalContent;

const ModalContentWrapper = styled.div<IModalStyleProps>`
  position: fixed;
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  border-radius: ${({ borderRadius }) => `${borderRadius}rem`};
  background: #fff;
  display: flex;
`;

ModalContent.defaultProps = {
  contentComponent: '',
  width: 0,
  height: 0,
  borderRadius: 0,
};
