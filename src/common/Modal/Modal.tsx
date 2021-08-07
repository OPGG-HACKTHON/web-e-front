import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

type Props = {
  isOverlayOn?: boolean;
  isPopup?: boolean;
  width?: string;
  height?: string;
  borderRadius?: number;
  borderStyle?: string;
  contentComponent?: React.ReactNode;
  onClickOverlay?: (e: React.MouseEvent<HTMLElement>) => void;
  onClickClose?: (e: React.MouseEvent<HTMLElement>) => void;
};

interface IModalProps {
  width: string;
  height: string;
  borderRadius?: number;
  borderStyle?: string;
}

const Modal = ({
  isOverlayOn,
  isPopup = false,
  width = '100%',
  height = '1rem',
  borderRadius = 5,
  borderStyle = 'none',
  contentComponent,
  onClickOverlay,
  onClickClose,
}: Props) => {
  const themeStyle = useContext(ThemeContext);
  return (
    <Overlay gray={themeStyle.color.grayScale[500]}>
      <ModalStyle
        width={width}
        height={height}
        borderRadius={borderRadius}
        borderStyle={borderStyle}
      >
        {contentComponent}
      </ModalStyle>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div<{ gray: string }>`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.gray};
  justify-content: center;
  align-items: center;
`;

const ModalStyle = styled.div<IModalProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: ${({ borderStyle }) => borderStyle};
`;

Modal.defaultProps = {
  isOverlayOn: true,
  isPopup: false,
  width: '',
  height: 0,
  borderRadius: 0,
  borderStyle: 'none',
  onClickOverlay: () => {
    return 1;
  },
  onClickClose: () => {
    return 1;
  },
  contentComponent: '',
};
