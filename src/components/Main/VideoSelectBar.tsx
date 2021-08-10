import React from 'react';
import styled from 'styled-components';
import Selector from './Selector';
import PopularTag from './PopularTag';
// import { ThemeContext } from 'styled-components';

const VideoSelectBar = () => {
  return (
    <SelectBarWrapper>
      <Selector />
      <PopularTag />
    </SelectBarWrapper>
  );
};
const SelectBarWrapper = styled.div`
  display: flex;
`;
export default VideoSelectBar;
