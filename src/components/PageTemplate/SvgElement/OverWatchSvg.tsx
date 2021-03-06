import React from 'react';
import styled from 'styled-components';
import { svgElementProps, svgElementWrapperProps } from 'types/nav.types';

const OverWatchSvg = ({ color, width, height }: svgElementProps) => {
  return (
    <OverWatchSvgWrapper width={width} height={height}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 31.93 31.93"
        fill={color}
      >
        <g id="레이어_2" data-name="레이어 2">
          <g id="레이어_1-2" data-name="레이어 1">
            <path
              className="cls-1"
              d="M0,14.74c.13-.75.23-1.51.39-2.25A15.53,15.53,0,0,1,3.76,5.7a.12.12,0,0,1,.06,0L7.27,9.12A11.09,11.09,0,0,0,6,20.85l.17.13a1.62,1.62,0,0,1,.19-.37c1.76-1.77,3.53-3.52,5.28-5.3a9.74,9.74,0,0,0,1.05-1.26c.61-.87,1.18-1.76,1.77-2.64.05-.08.11-.15.23-.31v.42q0,3.29,0,6.56a.85.85,0,0,1-.27.64c-1.79,1.77-3.57,3.56-5.35,5.33a3.18,3.18,0,0,1-.35.26,10.94,10.94,0,0,0,14.34,0l-3.59-3.57c-.71-.71-1.42-1.41-2.11-2.12a.68.68,0,0,1-.21-.42c0-2.31,0-4.63,0-6.94a.8.8,0,0,1,0-.16c.13.2.24.35.33.51A28.4,28.4,0,0,0,22.87,18c1,.95,1.95,1.95,2.93,2.93A11,11,0,0,0,24.65,9.12l3.47-3.47c.08.09.21.23.32.38A15.67,15.67,0,0,1,31.9,16.91a16,16,0,0,1-13,14.77c-.56.1-1.13.17-1.69.25H14.73a.83.83,0,0,0-.21-.06A15.36,15.36,0,0,1,7.81,29.7,15.75,15.75,0,0,1,.31,19.08C.18,18.46.1,17.83,0,17.2Z"
            />
            <path
              className="cls-1"
              d="M26.28,3.84,22.85,7.28c-4.57-3.17-9.17-3.17-13.75,0L5.66,3.83A15.77,15.77,0,0,1,26.28,3.84Z"
            />
          </g>
        </g>
      </svg>
    </OverWatchSvgWrapper>
  );
};

export default OverWatchSvg;

const OverWatchSvgWrapper = styled.div<svgElementWrapperProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
