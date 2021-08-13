import { MutableRefObject } from 'react';

export type svgElementProps = svgElementWrapperProps & {
  color: string;
  ref?: MutableRefObject<any>;
  onClick?: () => void;
};

export type svgElementWrapperProps = {
  width: number;
  height: number;
};
