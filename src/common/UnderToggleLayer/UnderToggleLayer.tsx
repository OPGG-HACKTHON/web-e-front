import React, { useMemo } from 'react';
import styled from 'styled-components';
import { getBoundingRefObj } from 'types/underToggleLayer.types';

type Props = {
  isClick: boolean;
  renderPosition: getBoundingRefObj | undefined;
  width: number;
  children: React.ReactNode;
};

const UnderToggleLayer = ({
  isClick,
  renderPosition,
  width,
  children,
}: Props) => {
  const bottom = useMemo(() => {
    if (renderPosition !== undefined) {
      return renderPosition.bottom;
    }
    return 0;
  }, [renderPosition]);

  const center = useMemo(() => {
    if (renderPosition !== undefined) {
      return renderPosition.right;
    }
    return 0;
  }, [renderPosition]);

  return (
    <>
      {isClick && (
        <UnderToggleLayerWrapper bottom={bottom} center={center} width={width}>
          <Vertex />
          <ItemWrapper>{children}</ItemWrapper>
        </UnderToggleLayerWrapper>
      )}
    </>
  );
};

export default UnderToggleLayer;

const Vertex = styled.div`
  position: absolute;
  top: -6px;
  right: 10px;
  width: 14px;
  height: 14px;
  transform: rotate(45deg);
  background-color: ${({ theme }) => theme.color.white};
  z-index: -1;
`;

const ItemWrapper = styled.div`
  z-index: 100;
`;

export const ItemStyle = styled.div`
  padding: 10px 13px;
  ${({ theme }) => theme.typography.bodySmRegular}
  transition: all 0.15s ease;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[500]};
  &:nth-child(2) {
    z-index: 10;

    &:hover {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-color: ${({ theme }) => theme.color.grayScale[50]};
    }
  }

  &:last-child {
    border-bottom: none;

    &:hover {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: ${({ theme }) => theme.color.grayScale[50]};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  }
`;

const UnderToggleLayerWrapper = styled.div<{
  bottom: number;
  center: number;
  width: number;
}>`
  position: absolute;
  top: ${({ bottom }) => `${bottom - 2}px`};
  left: ${({ center, width }) =>
    `${center - (width < 100 ? width - 1 : width - 6.1)}px`};
  background-color: ${({ theme }) => theme.color.white};
  width: ${({ width }) => `${width}px`};
  margin-top: 14px;
  box-shadow: 7px -3px 20px rgb(0 0 0 / 15%);
  z-index: 100;
  border-radius: 5px;
`;
