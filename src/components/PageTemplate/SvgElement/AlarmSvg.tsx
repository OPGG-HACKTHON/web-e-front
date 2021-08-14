import React from 'react';
import styled from 'styled-components';
import { svgElementProps, svgElementWrapperProps } from 'types/nav.types';

const AlramSvg = ({ color, width, height, ref, onClick }: svgElementProps) => {
  return (
    <AlramSvgWrapper width={width} height={height} ref={ref} onClick={onClick}>
      <svg
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6317 21.4737C12.6317 22.1437 12.3655 22.7863 11.8918 23.26C11.418 23.7338 10.7754 24 10.1054 24C9.4354 24 8.79286 23.7338 8.31908 23.26C7.8453 22.7863 7.5791 22.1437 7.5791 21.4737H12.6317Z"
          fill={color}
        />
        <path
          d="M17.6842 16.459V9.47368C17.6844 7.79335 17.1261 6.1606 16.0972 4.83213C15.0682 3.50367 13.627 2.55482 12 2.13474C12.0065 2.05487 12.0065 1.9746 12 1.89474C12 1.39222 11.8004 0.910277 11.4451 0.554944C11.0897 0.199612 10.6078 0 10.1053 0C9.60275 0 9.1208 0.199612 8.76547 0.554944C8.41014 0.910277 8.21053 1.39222 8.21053 1.89474C8.20399 1.9746 8.20399 2.05487 8.21053 2.13474C6.58355 2.55482 5.14229 3.50367 4.11336 4.83213C3.08443 6.1606 2.52617 7.79335 2.52632 9.47368V16.459C0.96 17.4632 0 18.7705 0 20.2105H20.2105C20.2105 18.7705 19.2505 17.4632 17.6842 16.459Z"
          fill={color}
        />
        <circle cx="15.5" cy="4.5" r="4.5" fill="#FFD25F" />
      </svg>
    </AlramSvgWrapper>
  );
};

export default AlramSvg;

const AlramSvgWrapper = styled.div<svgElementWrapperProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
