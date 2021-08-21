import customAxios from 'lib/axios';
import { followDto } from './follow.dto';

const commonUrl = '/follow';

export const follow = async (dto: followDto) => {
  const targetUrl = commonUrl + '/subscribe';
  const data = await customAxios.post(targetUrl, dto);
  return data;
};

export const unfollow = async (dto: followDto) => {
  const targetUrl = commonUrl;
  const wrappedParam = {
    data: dto,
  };
  const data = await customAxios.delete(targetUrl, wrappedParam);
  return data;
};
