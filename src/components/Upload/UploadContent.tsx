import { isNext } from 'atom/uploadIsNext';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { uploadModalStep } from 'atom/uploadModalAtom';
import styled from 'styled-components';
import { EUploadStep } from 'enum/uploadStep.enum';
import SecondContent from './SecondContent';
import FirstContent from './FirstContent';

interface IActiveStyleProps {
  active: boolean;
}
const UploadContent = () => {
  const currentStep = useRecoilValue(uploadModalStep);
  return (
    <ContentWrapper>
      {currentStep === EUploadStep.FIRST_STEP && <FirstContent />}
      {currentStep === EUploadStep.SECOND_STEP && <SecondContent />}
    </ContentWrapper>
  );
};

export default UploadContent;

const ContentWrapper = styled.div`
  margin: 0 auto;
`;
