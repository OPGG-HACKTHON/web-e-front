import React, { useState } from 'react';
import styled from 'styled-components';
import Back from 'assets/svg/back_icon.svg';
import Close from 'assets/svg/close_icon.svg';
import UploadContent from './UploadContent';

const Upload = () => {
  const [currentPage, setCurrentPage] = useState(false);

  return (
    <UploadWrapper>
      <UploadHeader>
        <Icon src={Back} alt="alt" />
        <UploadTitle>동영상 업로드</UploadTitle>
        <Icon src={Close} alt="alt" />
      </UploadHeader>
      <UploadContent />
    </UploadWrapper>
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
  font-size: 2.4rem;
  font-weight: bold;
  font-family: NotoSansKR-Bold;
`;
