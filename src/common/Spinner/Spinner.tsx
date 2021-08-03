import { Spinner as LoadingSpinner } from '@class101/ui';
import React from 'react';

type SpinnerProps = {
  color: string;
  size: number;
};

const Spinner = ({ color, size }: SpinnerProps) => {
  return <LoadingSpinner color={color} size={size} />;
};

export default Spinner;
