import { AxiosResponse } from 'axios';
import { Iprops } from 'common/VideoList/LazyItem';
import customAxios from 'lib/axios';
import { RecoilValue } from 'recoil';

const getMyVideoList = async (userId: unknown): Promise<AxiosResponse> => {
  const response = await customAxios.get(`videos/user/${userId}`);
  console.log(response.data);

  return response.data;
};

export default getMyVideoList;
