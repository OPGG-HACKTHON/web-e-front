import React from 'react';
import styled from 'styled-components';
import { svgElementProps, svgElementWrapperProps } from 'types/nav.types';

const LolSvg = ({ color, width, height }: svgElementProps) => {
  return (
    <LolSvgWrapper width={width} height={height}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 35.22"
        fill={color}
      >
        <g id="레이어_2" data-name="레이어 2">
          <g id="레이어_1-2" data-name="레이어 1">
            <path
              className="cls-1"
              d="M3.88,35.19a.79.79,0,0,1-.38-1.42c.87-.87,1.76-1.74,2.64-2.59a.74.74,0,0,0,.25-.58v-26A.85.85,0,0,0,6.2,4C5.55,3.16,4.91,2.3,4.25,1.44a.88.88,0,0,1-.18-1A.88.88,0,0,1,5,0h8.31c.87,0,1.12.25,1.12,1.12V29c0,.61-.08.54.54.54,5.32,0,10.64,0,16,0a1,1,0,0,1,1.08.68v.39a1.88,1.88,0,0,1-.53.84C30.3,32.65,29.13,33.81,28,35a1,1,0,0,1-.83.23Z"
            />
            <path
              className="cls-1"
              d="M16,17.18c0-3.47,0-6.95,0-10.42,0-.29.07-.37.37-.36a12.71,12.71,0,0,1,12.07,9.8,12.41,12.41,0,0,1-2.94,11.57A.62.62,0,0,1,25,28q-4.27,0-8.55,0c-.32,0-.42-.07-.42-.4C16,24.13,16,20.66,16,17.18Z"
            />
            <path
              className="cls-1"
              d="M4.81,7.9c0,.7,0,1.4,0,2.1a.58.58,0,0,1-.17.38,13.91,13.91,0,0,0-2.93,7A14.11,14.11,0,0,0,4.6,28a.94.94,0,0,1,.22.64c0,.63,0,1.27,0,1.91-1.6-.66-4.3-5.94-4.68-9A16.05,16.05,0,0,1,4.7,7.86Z"
            />
            <path
              className="cls-1"
              d="M4.78,25.31a12.57,12.57,0,0,1,0-12.21Z"
            />
            <path
              className="cls-1"
              d="M32,18.52c0-.27,0-.55-.06-.82a15.21,15.21,0,0,0-1.68-5.77A15.3,15.3,0,0,0,28,8.64c-.23-.27-.46-.53-.71-.78h0a17.68,17.68,0,0,0-2-1.66,15.59,15.59,0,0,0-9-3c-.28,0-.37.07-.35.34a7.37,7.37,0,0,1,0,.94c0,.24,0,.33.31.34a15.94,15.94,0,0,1,2.48.27A14.42,14.42,0,0,1,30.35,18.32a14.19,14.19,0,0,1-2.77,9.37c-.06.09-.18.16-.13.31h1.68a.38.38,0,0,0,.36-.24,15.89,15.89,0,0,0,2-4.51,11.54,11.54,0,0,0,.39-1.78c0-.27.06-.53.08-.79s0-.54,0-.8C32,19.43,32,19,32,18.52Z"
            />
          </g>
        </g>
      </svg>
    </LolSvgWrapper>
  );
};

const LolSvgWrapper = styled.div<svgElementWrapperProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

export default LolSvg;
