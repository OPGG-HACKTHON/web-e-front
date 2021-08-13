import React from 'react';
import styled from 'styled-components';
import { svgElementProps, svgElementWrapperProps } from 'types/nav.types';

const UploadSvg = ({ color, width, height }: svgElementProps) => {
  return (
    <UploadSvgWrapper width={width} height={height}>
      <svg
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.2472 10.9243L10.1285 0L0 10.9243H6.21858V18.9406H14.0385V10.9243H20.2472Z"
          fill={color}
        />
        <path d="M20.2472 20.9055H0V24H20.2472V20.9055Z" fill={color} />
      </svg>
    </UploadSvgWrapper>
  );
};

export default UploadSvg;

const UploadSvgWrapper = styled.div<svgElementWrapperProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
