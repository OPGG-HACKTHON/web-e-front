import customAxios from 'lib/axios';
import { loginDto, registerDto } from './auth.dto';

export const login = async (dto: loginDto) => {
  const data = await customAxios.post('/auth/login', dto);

  return data;
};

export const register = async (dto: registerDto) => {
  const data = await customAxios.post('/users/register', dto);

  return data;
};
