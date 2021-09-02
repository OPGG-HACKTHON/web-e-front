import React, { Suspense } from 'react';
import Search from 'components/Search';
import PageTemplate from 'components/PageTemplate';

const GreetingPage = () => {
  return (
    <PageTemplate>
      <Suspense fallback={<div>...loading</div>}>
        <Search />
      </Suspense>
    </PageTemplate>
  );
};

export default GreetingPage;
