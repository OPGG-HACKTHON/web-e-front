import { Height } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import ModalContent from './ModalContent';

type Props = {
  isPopup?: boolean;
  contentComponent?: React.ReactNode;
  onClickOverlay?: (e: React.MouseEvent<HTMLElement>) => void;
  width?: number;
  height?: number;
  borderRadius?: number;
};

const ModalContainer = ({
  isPopup = false,
  contentComponent,
  onClickOverlay,
  width = 0,
  height = 0,
  borderRadius = 0,
}: Props) => {
  const onClickOnlyOverlay = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOverlay) onClickOverlay(e);
  };

  return isPopup ? (
    <Overlay onClick={onClickOnlyOverlay}>
      <ModalContent
        contentComponent={contentComponent}
        width={width}
        height={height}
        borderRadius={borderRadius}
      />
    </Overlay>
  ) : (
    <></>
  );
};

export default ModalContainer;

const Overlay = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000000;
`;

ModalContainer.defaultProps = {
  isPopup: false,
  onClickOverlay: () => {
    console.log('Overlay clicked. Please init overlay click event handler');
  },
  contentComponent: '',
  width: 0,
  height: 0,
  borderRadius: 0,
};
