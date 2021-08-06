import React from 'react';
import styled from 'styled-components';
import Selector from './Selector';
import PopularTag from './PopularTag';
// import { ThemeContext } from 'styled-components';

const VideoSelectBar = ({ popularTags }: any) => {
  return (
    <SelectBarWrapper>
      <Selector />
      <PopularTag popularTags={popularTags} />
    </SelectBarWrapper>
  );
};
const SelectBarWrapper = styled.div`
  display: flex;
`;
export default VideoSelectBar;
