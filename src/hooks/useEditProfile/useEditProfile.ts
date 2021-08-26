import { useState, useRef, useCallback } from 'react';

const useEditProfile = () => {
  const [imgFile, setImgFile] = useState<string>('');
  const [imgBase64, setImgBase64] = useState<string>('');
  const hiddenInputRef = useRef(null);

  const handleHiddenInput = useCallback(() => {
    hiddenInputRef.current.click();
  }, []);

  const handleChangeFile = (event) => {
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

  return {
    imgFile,
    imgBase64,
    handleHiddenInput,
    handleChangeFile,
    hiddenInputRef,
  };
};

export default useEditProfile;
