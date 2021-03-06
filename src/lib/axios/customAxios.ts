import axios, { AxiosInstance } from 'axios';
import Token from 'lib/token/token';

const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: Token.getToken('access_token') !== undefined && {
    Authorization: `Bearer ${Token.getToken('access_token')}`,
  },
});

export default customAxios;
