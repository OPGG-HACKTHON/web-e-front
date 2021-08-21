import customAxios from 'lib/axios';
import { subscribeDto } from './follow.dto';

const commonUrl = '/follow';

export const subscribe = async (dto: subscribeDto) => {
  const targetUrl = commonUrl + '/subscribe';
  const data = await customAxios.post(targetUrl, dto);
  return data;
};

export const unsubscribe = async (dto: subscribeDto) => {
  const targetUrl = commonUrl;
  const wrappedParam = {
    data: dto,
  };
  const data = await customAxios.delete(targetUrl, wrappedParam);
  return data;
};
