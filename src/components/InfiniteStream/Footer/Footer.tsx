import React, { useMemo, useContext } from 'react';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import styled, { ThemeContext } from 'styled-components';

interface IFooter {
  isMuted: boolean;
  isLooping: boolean;
  isLiked: boolean;
  onClickLoop: () => void;
  onClickMute: () => void;
}

const Footer = ({
  isLiked,
  isMuted,
  isLooping,
  onClickLoop,
  onClickMute,
}: IFooter) => {
  const themeStyle = useContext(ThemeContext);

  const iconStyle = useMemo(() => {
    return {
      height: '3.6rem',
      width: '3.6rem',
      cursor: 'pointer',
    };
  }, []);

  return (
    <Container>
      <IconWrapper>
        <LoopIcon
          onClick={onClickLoop}
          style={{
            ...iconStyle,
            color: isLooping ? themeStyle.color.yellow : '#fff',
          }}
        />
        {isMuted ? (
          <VolumeOffIcon onClick={onClickMute} style={iconStyle} />
        ) : (
          <VolumeUpIcon onClick={onClickMute} style={iconStyle} />
        )}
      </IconWrapper>
      <IconWrapper>
        <FavoriteBorderIcon style={iconStyle} />
      </IconWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 3rem;
  color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default Footer;
