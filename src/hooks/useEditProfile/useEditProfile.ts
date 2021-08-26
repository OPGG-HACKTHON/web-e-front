import { useState, useRef, useCallback, Dispatch, SetStateAction } from 'react';

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
  };
};

export default useEditProfile;
