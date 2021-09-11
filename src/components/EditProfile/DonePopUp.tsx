/* eslint-disable react/jsx-props-no-spreading */
import Button from 'common/Button';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { color, typography } from 'styles/theme';

type Props = {
  onClick: () => void;
};

const DonePopUp = ({ onClick }: Props) => {
  const commonButtonStyle = useMemo(
    () => ({
      width: 5.6,
      height: 3.6,
      fontStyle: typography.bodyRgBold,
      borderRadius: 0.5,
      padding: '',
      bkgColor: color.yellow,
      fontColor: color.white,
    }),
    []
  );

  return (
    <DonePopUpWarpper>
      <Text>적용되었습니다.</Text>
      <Button {...commonButtonStyle} text="닫기" onClick={onClick} />
    </DonePopUpWarpper>
  );
};

export default DonePopUp;

const DonePopUpWarpper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  margin-bottom: 20px;
  ${({ theme }) => theme.typography.headRgBold}
`;
