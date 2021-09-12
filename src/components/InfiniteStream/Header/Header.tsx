import React from 'react';
import styled from 'styled-components';

import BACK_ARROW_WHITE_SVG from 'assets/svg/arrow_back_white.svg';

const Header = () => {
  return (
    <Container>
      <Icon src={BACK_ARROW_WHITE_SVG} />
      <Title>레오나로 아칼리 솔킬 #매드무비</Title>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.8rem 3rem;
`;

const Icon = styled.img`
  cursor: pointer;
`;

const Title = styled.span`
  color: #fff;
  ${({ theme }) => theme.typography.headRg};
`;

export default Header;
