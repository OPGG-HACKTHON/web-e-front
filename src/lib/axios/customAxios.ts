import axios, { AxiosInstance } from 'axios';
import { getToken } from 'lib/token';

const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default customAxios;
