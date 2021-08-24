import React, { ReactNode } from 'react';
import styled from 'styled-components';
import LeftNav from './LeftNav';
import Nav from './Nav/Nav';

type Props = {
  children: ReactNode;
};

const PageTemplate = ({ children }: Props) => {
  return (
    <PageTemplateWrapper>
      <Nav />
      <PageTemplateChildren>
        <LeftNav />
        {children}
      </PageTemplateChildren>
    </PageTemplateWrapper>
  );
};

const PageTemplateWrapper = styled.div`
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
