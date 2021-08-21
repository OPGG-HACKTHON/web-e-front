import { useCallback, useState } from 'react';
import upload from 'api/upload/upload';
import useProfile from 'hooks/useProfile/useProfile';
import { uploadDto } from 'api/upload/upload.dto';

import { useRecoilValue } from 'recoil';
import { uploadSelectedFile } from 'atom/uploadSelectedFile';
import { myProfileAtom } from 'atom/profileAtom';

const useUpload = () => {
  const myProfile = useRecoilValue(myProfileAtom);
  const selectedFile = useRecoilValue(uploadSelectedFile);
  const [uploadObj, setUploadObj] = useState<uploadDto>({
    userId: myProfile?.id || '',
    videoName: 'videoTitle',
    category: '',
    videoIntro: '',
    video: (selectedFile as string) || '',
  });
  const { handleMyProfile } = useProfile();

  const [uploadErrorStatus, setUploadErrorStatus] = useState<number>(0);

  const handleUpload = useCallback(async () => {
    try {
      const res = await upload(uploadObj);
      const { data, status } = res;

      if (status === 400) {
        throw new Error('잘못된 입력');
      }
      if (status === 401) {
        throw new Error('권한이 없음');
      }

      await handleMyProfile();

      return data;
    } catch (err) {
      const { status } = err.response;
      setUploadErrorStatus(status);
      return err;
    }
  }, [handleMyProfile, uploadObj]);

  return {
    uploadObj,
    setUploadObj,
    handleUpload,
    uploadErrorStatus,
  };
};

export default useUpload;
