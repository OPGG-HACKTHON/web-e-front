import { useCallback, useState } from 'react';
import { login, register } from 'api/auth/auth';
import { loginDto, registerDto } from 'api/auth/auth.dto';
import { setToken } from 'lib/token';

const useAuth = () => {
  const [loginObj, setLoginObj] = useState<loginDto>({
    userId: '',
    userPassword: '',
  });

  const [isLoginModal, setIsLoginModal] = useState(false);
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
      return data;
    } catch (err) {
      return err;
    }
  }, [loginObj]);

  const handleRegister = useCallback(async () => {
    try {
      const data = await register(registerObj);

      return data;
    } catch (err) {
      return err;
    }
  }, [registerObj]);

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
  };
};

export default useAuth;
