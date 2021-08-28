import { fetchProfileInfo, myProfileInfo } from 'api/profile/profile';
import { editProfileUserInputType } from 'api/profile/profile.type';
import {
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

type imgHandlerType = {
  event: any;
  setImgBase64: Dispatch<SetStateAction<string>>;
  setImgFile: Dispatch<SetStateAction<string>>;
};

const useEditProfile = () => {
  const [profileImg, setProfileImg] = useState<string>('');
  const [profileBanner64, setProfileBanner64] = useState<string>('');

  const [bannerFile, setBannerFile] = useState<string>('');
  const [bannerBase64, setBannerBase64] = useState<string>('');

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

  const handleChangeFile = ({
    event,
    setImgBase64,
    setImgFile,
  }: imgHandlerType) => {
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
  };

  const handleProfileImgReader = useCallback((event) => {
    handleChangeFile({
      event,
      setImgBase64: setProfileBanner64,
      setImgFile: setProfileImg,
    });
  }, []);

  const handleCoverImgReader = useCallback((event) => {
    handleChangeFile({
      event,
      setImgBase64: setBannerBase64,
      setImgFile: setBannerFile,
    });
  }, []);

  const handleFetchMyProfile = useCallback(async () => {
    try {
      const myProfileId = await myProfileInfo();
      const { data } = await fetchProfileInfo(myProfileId.data.id);
      console.log(data);

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
  };
};

export default useEditProfile;
