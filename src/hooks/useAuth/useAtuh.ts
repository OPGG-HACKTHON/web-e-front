import { useCallback, useState } from 'react';
import { login, register } from 'api/auth/auth';
import { loginDto, registerDto } from 'api/auth/auth.dto';

const useAuth = () => {
  const [loginObj, setLoginObj] = useState<loginDto>({
    userId: '',
    userPassword: '',
  });

  const [registerObj, setRegisterObj] = useState<registerDto>({
    userId: '',
    userName: '',
    userPassword: '',
    userEmail: '',
  });

  const handleLogin = useCallback(async () => {
    try {
      const data = await login(loginObj);
      console.log(data);
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

  return {
    loginObj,
    setLoginObj,
    registerObj,
    setRegisterObj,
    handleLogin,
    handleRegister,
  };
};

export default useAuth;
