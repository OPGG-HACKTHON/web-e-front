import { useCallback, useState, useEffect } from 'react';
import { login, register } from 'api/auth/auth';
import useProfile from 'hooks/useProfile/useProfile';
import { loginDto, registerDto } from 'api/auth/auth.dto';
import Token from 'lib/token';
import customAxios from 'lib/axios';
import { termsCheckedProps } from 'types/auth';

const useAuth = () => {
  const [loginObj, setLoginObj] = useState<loginDto>({
    userId: '',
    userPassword: '',
  });
  const { handleMyProfile } = useProfile();

  const [isLoginModal, setIsLoginModal] = useState(false);
  const [loginErrorStatus, setLoginErrorStatus] = useState<number>(0);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [termsChecked, setTermsChecked] = useState<termsCheckedProps>({
    utilization: false,
    personalinformation: false,
    pushEvent: false,
  });
  const [registerObj, setRegisterObj] = useState<registerDto>({
    userId: '',
    userName: '',
    userPassword: '',
    userEmail: '',
  });

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

  const handleRegister = useCallback(async () => {
    try {
      const data = await register(registerObj);

      return data;
    } catch (err) {
      return err;
    }
  }, [registerObj]);

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
    termsChecked,
    setTermsChecked,
  };
};

export default useAuth;
