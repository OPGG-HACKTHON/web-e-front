import EditProfile from 'components/EditProfile';
import PageTemplate from 'components/PageTemplate';
import React from 'react';

const EditProfilePage = () => {
  return (
    <PageTemplate isProfile>
      <EditProfile />
    </PageTemplate>
  );
};

export default EditProfilePage;
