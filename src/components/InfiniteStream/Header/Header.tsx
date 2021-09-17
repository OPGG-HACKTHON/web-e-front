import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { infiniteStreamState } from 'atom/infiniteStreamAtom';

import BACK_ARROW_WHITE_SVG from 'assets/svg/arrow_back_white.svg';

interface IHeader {
  title: string;
}

const Header = ({ title }: IHeader) => {
  const [infState, setInfState] = useRecoilState(infiniteStreamState);

  return (
    <Container>
      <Icon
        src={BACK_ARROW_WHITE_SVG}
        onClick={() =>
          setInfState({
            ...infState,
            isOpened: false,
          })
        }
      />
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.8rem 3rem;
  z-index: 100;
`;

const Icon = styled.img`
  cursor: pointer;
`;

const Title = styled.span`
  color: #fff;
  ${({ theme }) => theme.typography.headRg};
`;

export default Header;
