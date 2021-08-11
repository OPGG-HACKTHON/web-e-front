import React from 'react';
import styled from 'styled-components';
import FirstContent from './FirstContent';
import SecondContent from './SecondContent';

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
