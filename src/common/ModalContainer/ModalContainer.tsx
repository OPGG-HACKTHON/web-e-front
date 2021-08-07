import React from 'react';
import styled from 'styled-components';

type Props = {
  isPopup?: boolean;
  contentComponent?: React.ReactNode;
  onClickOverlay?: (e: React.MouseEvent<HTMLElement>) => void;
  onClickClose?: (e: React.MouseEvent<HTMLElement>) => void;
};

const ModalContainer = ({
  isPopup = false,
  contentComponent,
  onClickOverlay,
  onClickClose,
}: Props) => {
  return isPopup ? (
    <Overlay onClick={onClickOverlay}>{contentComponent}</Overlay>
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
`;

ModalContainer.defaultProps = {
  isPopup: false,
  onClickOverlay: () => {
    console.log('modal overlay clicked');
  },
  onClickClose: () => {
    console.log('modal close clicked');
  },
  contentComponent: '',
};
