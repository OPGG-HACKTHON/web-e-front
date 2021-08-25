import { AxiosResponse } from 'axios';
import customAxios from 'lib/axios';

// eslint-disable-next-line import/prefer-default-export
export const getMyVideoList = async (
  userId: string
): Promise<AxiosResponse> => {
  const response = await customAxios.get(`videos/user/${userId}`);

  return response.data.datas;
};
