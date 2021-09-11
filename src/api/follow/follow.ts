import customAxios from 'lib/axios';
import { followDto, fetchNewFollowerType } from './follow.dto';

const COMMON_URL = '/follow';

export const follow = async (dto: followDto) => {
  const targetUrl = `${COMMON_URL}/subscribe`;
  const data = await customAxios.post(targetUrl, dto);

  return data;
};

export const unfollow = async (dto: followDto) => {
  const targetUrl = COMMON_URL;
  const wrappedParam = {
    data: dto,
  };
  const data = await customAxios.delete(targetUrl, wrappedParam);

  return data;
};

export const newFollower = async (userId: string) => {
  const { data } = await customAxios.get<fetchNewFollowerType>(
    `${COMMON_URL}/${userId}/newFollower`
  );

  return data;
};
