import { useCallback, useState, useEffect } from 'react';
import { login, register } from 'api/auth/auth';
import useProfile from 'hooks/useProfile/useProfile';
import { loginDto, registerDto } from 'api/auth/auth.dto';
import { getToken, setToken } from 'lib/token';

const useAuth = () => {
  const [loginObj, setLoginObj] = useState<loginDto>({
    userId: '',
    userPassword: '',
  });
  const { handleMyProfile } = useProfile();

  const [isLoginModal, setIsLoginModal] = useState(false);
  const [loginErrorStatus, setLoginErrorStatus] = useState<number>(0);
  const [isRegisterModal, setIsRegisterModal] = useState(false);

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
        setToken('access_token', data.access_token);
        setIsLoginModal(false);
      }
      await handleMyProfile(data.access_token);

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
    sessionStorage.removeItem('access_token');
    window.location.reload();
  }, []);

  const handleLoginModal = useCallback(() => {
    setIsLoginModal((prev) => !prev);
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
  };
};

export default useAuth;
