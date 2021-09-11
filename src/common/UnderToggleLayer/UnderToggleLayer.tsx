/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { getBoundingRefObj } from 'types/underToggleLayer.types';

type Props = {
  isClick: boolean;
  renderPosition: getBoundingRefObj | undefined;
  width: number;
  children: React.ReactNode;
  isLeft?: boolean;
  onClick: () => void;
};

const UnderToggleLayer = ({
  isClick,
  renderPosition,
  width,
  children,
  isLeft = false,
  onClick,
}: Props) => {
  const toggleRef = useRef(null);

  const handleOutClick = useCallback(
    (e): void => {
      if (!toggleRef.current || toggleRef.current!.contains(e.target)) {
        return;
      }

      onClick();
    },
    [onClick]
  );

  const bottom = useMemo(() => {
    if (renderPosition !== undefined) {
      return renderPosition.bottom;
    }
    return 0;
  }, [renderPosition]);

  const center = useMemo(() => {
    if (renderPosition !== undefined) {
      if (isLeft) {
        return renderPosition.left;
      }
      return renderPosition.right;
    }
    return 0;
  }, [isLeft, renderPosition]);

  useEffect(() => {
    if (isClick) {
      window.addEventListener('click', handleOutClick, true);
    }

    return () => {
      window.removeEventListener('click', handleOutClick, true);
    };
  }, [handleOutClick, isClick]);

  return (
    <>
      {isClick && (
        <UnderToggleLayerWrapper
          ref={toggleRef}
          bottom={bottom}
          center={center}
          width={width}
          isLeft={isLeft}
        >
          <Vertex isLeft={isLeft} />
          <ItemWrapper>{children}</ItemWrapper>
        </UnderToggleLayerWrapper>
      )}
    </>
  );
};

export default UnderToggleLayer;

const Vertex = styled.div<{ isLeft: boolean }>`
  position: absolute;
  top: -6px;
  ${({ isLeft }) => (isLeft ? 'left:10px;' : 'right: 10px;')}

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
  text-align: center;

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
  isLeft: boolean;
}>`
  position: absolute;
  top: ${({ bottom }) => `${bottom - 2}px`};
  left: ${({ center, width, isLeft }) =>
    isLeft
      ? `${center + 17}px`
      : `${center - (width < 100 ? width - 1 : width - 6.1)}px`};
  background-color: ${({ theme }) => theme.color.white};
  width: ${({ width }) => `${width}px`};
  margin-top: 14px;
  box-shadow: 7px -3px 20px rgb(0 0 0 / 15%);
  z-index: 100;
  border-radius: 5px;
`;
