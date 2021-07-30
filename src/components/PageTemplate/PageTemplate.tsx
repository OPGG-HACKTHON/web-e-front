import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Nav from './Nav/Nav';

type Props = {
  children: ReactNode;
};

const PageTemplate = ({ children }: Props) => {
  return (
    <PageTemplateWrapper>
      <Nav />
      <PageTemplateChildren>{children}</PageTemplateChildren>
    </PageTemplateWrapper>
  );
};

const PageTemplateWrapper = styled.div`
  max-width: 1440px;
  margin: auto;
`;

const PageTemplateChildren = styled.div`
  width: 100%;
  max-width: 1440px;
`;

export default PageTemplate;
