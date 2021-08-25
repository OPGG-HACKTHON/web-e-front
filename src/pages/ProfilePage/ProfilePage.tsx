import PageTemplate from 'components/PageTemplate';
import Profile from 'components/Profile';
import React, { Suspense } from 'react';

const ProfilePage = () => {
  return (
    <PageTemplate>
      <Suspense fallback={<div>...loading</div>}>
        <Profile />
      </Suspense>
    </PageTemplate>
  );
};

export default ProfilePage;
