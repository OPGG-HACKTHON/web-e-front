import { useCallback, useState, useEffect, useMemo } from 'react';
import { login, register } from 'api/auth/auth';
import useProfile from 'hooks/useProfile/useProfile';
import { loginDto, registerDto } from 'api/auth/auth.dto';
import Token from 'lib/token';
import customAxios from 'lib/axios';
import { termsCheckedProps } from 'types/auth';
import { EButtonType } from 'components/Auth/Register/Register';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  termsCheckedAtom,
  allAgreeTerms,
  userInfo,
  SELECT_LOL_TIER,
  SELECT_OVERWATCH_TIER,
  SELECT_PUBG_TIER,
} from 'atom/authAtom';
import { LOL_TIER, OVERWATCH_TIER, PUBG_TIER } from 'model/authModel';

const useAuth = () => {
  const [loginObj, setLoginObj] = useState<loginDto>({
    userId: '',
    userPassword: '',
  });
  const { handleMyProfile } = useProfile();

  const [isLoginModal, setIsLoginModal] = useState(false);
  const [loginErrorStatus, setLoginErrorStatus] = useState<number>(0);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [termsChecked, setTermsChecked] = useRecoilState(termsCheckedAtom);
  const [registerObj, setRegisterObj] = useRecoilState(userInfo);
  const [allAgree, setAllAgree] = useRecoilState(allAgreeTerms);
  const LOL_TIER_SELECT = useRecoilValue(SELECT_LOL_TIER);
  const PUBG_TIER_SELECT = useRecoilValue(SELECT_PUBG_TIER);
  const OVERWATCH_TIER_SELECT = useRecoilValue(SELECT_OVERWATCH_TIER);

  const handleLogin = useCallback(async () => {
    try {
      const res = await login(loginObj);
      const { data, status } = res;

      if (status === 201) {
        Token.setToken('access_token', data.access_token);
        customAxios.defaults.headers = {
          Authorization: `Bearer ${data.access_token}`,
        };

        setIsLoginModal(false);
      }

      await handleMyProfile();

      return data;
    } catch (err) {
      const { status } = err.response;
      setLoginErrorStatus(status);

      return err;
    }
  }, [handleMyProfile, loginObj]);

  const FIND_GAME_TOP = useMemo(() => {
    const LOL_INDEX = LOL_TIER.findIndex((i) => i.value === LOL_TIER_SELECT);
    const PUBG_INDEX = PUBG_TIER.findIndex((i) => i.value === PUBG_TIER_SELECT);
    const OVERWATCH_INDEX = OVERWATCH_TIER.findIndex(
      (i) => i.value === OVERWATCH_TIER_SELECT
    );

    const temp = [
      { name: 'LOL', index: LOL_INDEX },
      { name: 'PUBG', index: PUBG_INDEX },
      { name: 'OVERWATCH', index: OVERWATCH_INDEX },
    ];

    temp.sort((a, b) => {
      return b.index - a.index;
    });
    return temp[0].name;
  }, [LOL_TIER_SELECT, OVERWATCH_TIER_SELECT, PUBG_TIER_SELECT]);

  console.log(
    'outer',
    LOL_TIER_SELECT,
    PUBG_TIER_SELECT,
    OVERWATCH_TIER_SELECT
  );

  const handleRegister = useCallback(async () => {
    try {
      console.log(
        'inner',
        LOL_TIER_SELECT,
        PUBG_TIER_SELECT,
        OVERWATCH_TIER_SELECT
      );

      const temp: any = {
        ...registerObj,
        // userFeed: FIND_GAME_TOP,
        lolTier: LOL_TIER_SELECT,
        pubgTier: PUBG_TIER_SELECT,
        watchTier: OVERWATCH_TIER_SELECT,
      };
      console.log(temp);
      const data = await register(temp);
      console.log(data);
      return data;
    } catch (err) {
      return err;
    }
  }, [LOL_TIER_SELECT, OVERWATCH_TIER_SELECT, PUBG_TIER_SELECT, registerObj]);

  const handleLogout = useCallback(() => {
    Token.removeToken('access_token');
    window.location.reload();
  }, []);

  const handleLoginModal = useCallback(() => {
    setIsLoginModal((prev) => !prev);
  }, []);

  const handleRegisterModal = useCallback(() => {
    setIsRegisterModal((prev) => !prev);
  }, []);

  const handleGoToLoginModal = useCallback(() => {
    setIsRegisterModal(false);
    setIsLoginModal(true);
  }, []);

  const handleGoToRegisterModal = useCallback(() => {
    setIsLoginModal(false);
    setIsRegisterModal(true);
  }, []);

  const handleCheckAllAgree = useCallback(() => {
    setAllAgree((prev) => !prev);
    if (!allAgree) {
      setTermsChecked({
        utilization: true,
        personalinformation: true,
        pushEvent: true,
      });
    } else {
      setTermsChecked({
        utilization: false,
        personalinformation: false,
        pushEvent: false,
      });
    }
  }, [allAgree, setAllAgree, setTermsChecked]);

  const handleCheckedTerms = useCallback(
    (name: string) => {
      setTermsChecked((prev: termsCheckedProps) => ({
        ...prev,
        [name]: !termsChecked[name],
      }));
    },
    [setTermsChecked, termsChecked]
  );

  useEffect(() => {
    if (
      termsChecked.utilization &&
      termsChecked.personalinformation &&
      termsChecked.pushEvent
    ) {
      setAllAgree(true);
    } else {
      setAllAgree(false);
    }
  }, [
    setAllAgree,
    termsChecked.personalinformation,
    termsChecked.pushEvent,
    termsChecked.utilization,
  ]);

  return {
    loginObj,
    setLoginObj,
    registerObj,
    setRegisterObj,
    handleLogin,
    handleRegister,
    isLoginModal,
    handleLoginModal,
    setIsLoginModal,
    loginErrorStatus,
    handleLogout,
    handleRegisterModal,
    isRegisterModal,
    handleGoToLoginModal,
    handleGoToRegisterModal,
    handleCheckAllAgree,
    handleCheckedTerms,
  };
};

export default useAuth;
