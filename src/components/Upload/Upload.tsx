import React, { useState } from 'react';
import styled from 'styled-components';
import Back from 'assets/svg/back_icon.svg';
import Close from 'assets/svg/close_icon.svg';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { isNext } from 'atom/uploadIsNext';
import { uploadModalStep } from 'atom/uploadModalStepAtom';
import UploadContent, { IUploadContentProps } from './UploadContent';
import ThirdContent from './ThirdContent';

interface IUploadProps extends IUploadContentProps {
  onClickClose: () => void;
}

const Upload = ({
  onClickClose,
  isUploading,
  setUploadingState,
}: IUploadProps) => {
  const setIsNext = useSetRecoilState(isNext);
  const [currentStep, setModalStep] = useRecoilState(uploadModalStep);

  const onClickBack = () => {
    if (!isUploading) {
      setIsNext(false);
      if (currentStep > 0) setModalStep(currentStep - 1);
    }
  };

  return (
    <>
      {currentStep < 2 ? (
        <UploadWrapper>
          <UploadHeader>
            <Icon src={Back} alt="alt" onClick={onClickBack} />
            <UploadTitle>동영상 업로드</UploadTitle>
            <Icon
              src={Close}
              alt="alt"
              onClick={!isUploading && onClickClose}
            />
          </UploadHeader>
          <UploadContent
            isUploading={isUploading}
            setUploadingState={setUploadingState}
          />
        </UploadWrapper>
      ) : (
        <ThirdContent onClickClose={!isUploading && onClickClose} />
      )}
    </>
  );
};

export default Upload;

const UploadWrapper = styled.div`
  width: 100%;
`;
const UploadHeader = styled.div`
  height: 6.8rem;
  width: 100%;
  border-bottom: 0.5px solid rgba(196, 196, 196, 0.5);
  line-height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Icon = styled.img`
  width: 2rem;
  height: 2rem;
  margin: ${({ theme }) => theme.margins.base};
`;

const UploadTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: bold;
  font-family: NotoSansKR-Bold;
`;
