import {
  fetchProfileInfo,
  modifyProfile,
  myProfileInfo,
  uploadImg,
} from 'api/profile/profile';
import {
  editProfileUserInputType,
  gameNickNameType,
} from 'api/profile/profile.type';
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
  const [isEditProfileSetting, setIsEditProfileSetting] =
    useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');
  const [profileUserName, setProfileUserName] = useState<string>('');
  const [profileImg, setProfileImg] = useState<File>();
  const [profileBanner64, setProfileBanner64] = useState<string>('');

  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerBase64, setBannerBase64] = useState<string>('');

  const [selectLol, setSelectLol] = useState<string>('');
  const [selectPubg, setSelectPubg] = useState<string>('');
  const [selectWatch, setSelectWatch] = useState<string>('');

  const [isDone, setIsDone] = useState<boolean>(false);

  const [gameNickName, setGameNickName] = useState<gameNickNameType>({
    lol: '',
    pubg: '',
  });

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

  const handleEditProfileSetting = useCallback((isProfile: boolean) => {
    setIsEditProfileSetting(isProfile);
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
      setSelectLol(data.lolTier);
      setSelectPubg(data.pubgTier);
      setSelectWatch(data.watchTier);
      setBannerBase64(data.userCoverURL || '');
      setProfileBanner64(data.userPhotoURL || '');
      setGameNickName({
        lol: data.userLolId,
        pubg: data.userPubgId,
      });
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

        const data = await modifyProfile(temp, userId);

        if (data.statusCode === 200) {
          setIsDone(true);
        }
      } else {
        const temp = {
          userName: editProfileInputObj.userName,
          userIntro: editProfileInputObj.intro,
          userPhotoURL: profileUrl.location,
          userCoverURL: bannerUrl.location,
        };

        const data = await modifyProfile(temp, userId);

        if (data.statusCode === 200) {
          setIsDone(true);
        }
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

  const handleModifyGameTier = useCallback(async () => {
    try {
      const temp = {
        lolTier: selectLol,
        pubgTier: selectPubg,
        watchTier: selectWatch,
        userLolId: gameNickName.lol,
        userPubgId: gameNickName.pubg,
      };

      const data = await modifyProfile(temp, userId);
      if (data.statusCode === 200) {
        setIsDone(true);
      }

      return data;
    } catch (err) {
      return err;
    }
  }, [
    gameNickName.lol,
    gameNickName.pubg,
    selectLol,
    selectPubg,
    selectWatch,
    userId,
  ]);

  const goBakcProfileHistory = useCallback(() => {
    history.push('/profile');
  }, [history]);

  const handleDonePopup = useCallback(() => {
    setIsDone((prev) => !prev);
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
    handleModifyProfileEdit,
    goBakcProfileHistory,
    isEditProfileSetting,
    handleEditProfileSetting,
    selectLol,
    setSelectLol,
    selectPubg,
    setSelectPubg,
    selectWatch,
    setSelectWatch,
    gameNickName,
    setGameNickName,
    handleModifyGameTier,
    isDone,
    handleDonePopup,
  };
};

export default useEditProfile;
