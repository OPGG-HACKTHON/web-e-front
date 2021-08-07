import React from 'react';
import styled from 'styled-components';

type Props = {
  isPopup?: boolean;
  contentComponent?: React.ReactNode;
  onClickOverlay?: (e: React.MouseEvent<HTMLElement>) => void;
};

const ModalContainer = ({
  isPopup = false,
  contentComponent,
  onClickOverlay,
}: Props) => {
  const onClickOnlyOverlay = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOverlay) onClickOverlay(e);
  };

  return isPopup ? (
    <Overlay onClick={onClickOnlyOverlay}>{contentComponent}</Overlay>
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
};
