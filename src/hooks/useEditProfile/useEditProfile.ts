import {
  fetchProfileInfo,
  modifyProfile,
  myProfileInfo,
  uploadImg,
} from 'api/profile/profile';
import { editProfileUserInputType } from 'api/profile/profile.type';
import useProfile from 'hooks/useProfile/useProfile';
import {
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';

type imgHandlerType = {
  event: any;
  setImgBase64: Dispatch<SetStateAction<string>>;
  setImgFile: Dispatch<SetStateAction<File>>;
};

const useEditProfile = () => {
  const history = useHistory();
  const [userId, setUserId] = useState<string>('');
  const [profileUserName, setProfileUserName] = useState<string>('');
  const [profileImg, setProfileImg] = useState<File>();
  const [profileBanner64, setProfileBanner64] = useState<string>('');

  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerBase64, setBannerBase64] = useState<string>('');

  const { handleMyProfile } = useProfile();

  const hiddenProfileInputRef = useRef(null);
  const hiddenCoverInputRef = useRef(null);

  const [editProfileInputObj, setEditProfileInputObj] =
    useState<editProfileUserInputType>({ userName: '', intro: '' });

  const handleHiddenProfileInput = useCallback(() => {
    hiddenProfileInputRef.current.click();
  }, []);

  const handleHiddenCoverInput = useCallback(() => {
    hiddenCoverInputRef.current.click();
  }, []);

  const handleChangeFile = useCallback(
    ({ event, setImgBase64, setImgFile }: imgHandlerType) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          setImgBase64(base64.toString());
        }
      };
      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
        setImgFile(event.target.files[0]);
      }
    },
    []
  );

  const handleProfileImgReader = useCallback(
    (event) => {
      handleChangeFile({
        event,
        setImgBase64: setProfileBanner64,
        setImgFile: setProfileImg,
      });
    },
    [handleChangeFile]
  );

  const handleCoverImgReader = useCallback(
    (event) => {
      handleChangeFile({
        event,
        setImgBase64: setBannerBase64,
        setImgFile: setBannerFile,
      });
    },
    [handleChangeFile]
  );

  const handleFetchMyProfile = useCallback(async () => {
    try {
      const myProfileId = await myProfileInfo();
      const { data } = await fetchProfileInfo(myProfileId.data.id);

      setUserId(data.userId);
      setProfileUserName(data.userName);
      setEditProfileInputObj({
        userName: data.userName || '',
        intro: data.userIntro || '',
      });

      setBannerBase64(data.userCoverURL || '');
      setProfileBanner64(data.userPhotoURL || '');

      return data;
    } catch (err) {
      return err;
    }
  }, []);

  const handleUploadImg = useCallback(async (base: File) => {
    try {
      const data = await uploadImg(base);

      return data;
    } catch (err) {
      return err;
    }
  }, []);

  // eslint-disable-next-line consistent-return
  const handleModifyProfileEdit = useCallback(async () => {
    try {
      const profileUrl = await handleUploadImg(profileImg);
      const bannerUrl = await handleUploadImg(bannerFile);

      if (profileUserName === editProfileInputObj.userName) {
        const temp = {
          userIntro: editProfileInputObj.intro,
          userPhotoURL: profileUrl.location,
          userCoverURL: bannerUrl.location,
        };

        await modifyProfile(temp, userId);
      } else {
        const temp = {
          userName: editProfileInputObj.userName,
          userIntro: editProfileInputObj.intro,
          userPhotoURL: profileUrl.location,
          userCoverURL: bannerUrl.location,
        };

        await modifyProfile(temp, userId);
      }
      await handleMyProfile();
      await handleFetchMyProfile();
    } catch (err) {
      return err;
    }
  }, [
    bannerFile,
    editProfileInputObj.intro,
    editProfileInputObj.userName,
    handleFetchMyProfile,
    handleMyProfile,
    handleUploadImg,
    profileImg,
    profileUserName,
    userId,
  ]);

  const goBakcProfileHistory = useCallback(() => {
    history.push('/profile');
  }, [history]);

  useEffect(() => {
    handleFetchMyProfile();
  }, [handleFetchMyProfile]);

  return {
    handleProfileImgReader,
    profileImg,
    profileBanner64,
    handleHiddenProfileInput,
    handleHiddenCoverInput,
    hiddenProfileInputRef,
    handleCoverImgReader,
    hiddenCoverInputRef,
    bannerFile,
    bannerBase64,
    editProfileInputObj,
    setEditProfileInputObj,
    handleModifyProfileEdit,
    goBakcProfileHistory,
  };
};

export default useEditProfile;
