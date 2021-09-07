import customAxios from 'lib/axios';
import { likeDto } from './like.dto';

const COMMON_URL = '/videoLike';

export const pressLike = async (dto: likeDto) => {
  const targetUrl = `${COMMON_URL}/press`;
  const data = await customAxios.post(targetUrl, dto);
  return data;
};

export const cancleLike = async (dto: likeDto) => {
  const targetUrl = COMMON_URL;
  const wrappedParam = {
    data: dto,
  };
  const data = await customAxios.delete(targetUrl, wrappedParam);
  return data;
};

export const newLike = async (userId: string) => {
  const { data } = await customAxios.get(`${COMMON_URL}/${userId}/newList`);

  return data;
};
