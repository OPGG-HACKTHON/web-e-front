import myProfileInfo from 'api/profile/profile';
import { myProfileType } from 'api/profile/profile.type';
import { myProfileAtom } from 'atom/profileAtom';
import Token from 'lib/token';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

const useProfile = () => {
  // eslint-disable-next-line consistent-return
  const setMyProfile = useSetRecoilState(myProfileAtom);
  const handleMyProfile = useCallback(async () => {
    try {
      const { data } = await myProfileInfo();
      setMyProfile(data);
      return data;
    } catch (err) {
      return err;
    }
  }, [setMyProfile]);

  return { handleMyProfile };
};

export default useProfile;
