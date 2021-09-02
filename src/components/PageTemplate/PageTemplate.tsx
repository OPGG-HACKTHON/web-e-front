import React, { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import LeftNav from './LeftNav';
import Nav from './Nav/Nav';

type Props = {
  children: ReactNode;
  isProfile?: boolean;
};

const PageTemplate = ({ children, isProfile = false }: Props) => {
  const differBackColor = useMemo(() => isProfile, [isProfile]);
  return (
    <PageTemplateWrapper differColor={differBackColor}>
      <PageTemplateInnerWrapper>
        <Nav />
        <PageTemplateChildren>
          {!isProfile && <LeftNav />}
          {children}
        </PageTemplateChildren>
      </PageTemplateInnerWrapper>
    </PageTemplateWrapper>
  );
};

const PageTemplateWrapper = styled.div<{ differColor: boolean }>`
  width: 100%;
  background-color: ${({ theme, differColor }) =>
    differColor ? theme.color.grayScale[50] : theme.color.white};
`;

const PageTemplateInnerWrapper = styled.div`
  max-width: 1440px;
  margin: auto;
`;

const PageTemplateChildren = styled.div`
  width: 100%;
  max-width: 940px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export default PageTemplate;

PageTemplate.defaultProps = {
  isProfile: false,
};
