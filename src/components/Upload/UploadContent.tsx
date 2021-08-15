import { isNext } from 'atom/uploadIsNext';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import SecondContent from './SecondContent';
import FirstContent from './FirstContent';

interface IActiveStyleProps {
  active: boolean;
}
const UploadContent = () => {
  return (
    <ContentWrapper>
      <FirstContent />
      <SecondContent />
    </ContentWrapper>
  );
};

export default UploadContent;

const ContentWrapper = styled.div`
  margin: 0 auto;
`;
