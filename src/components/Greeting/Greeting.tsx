import React, { Suspense } from 'react';
import Main from 'components/Main';

const Gretting = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Main />
    </Suspense>
  );
};

export default Gretting;
