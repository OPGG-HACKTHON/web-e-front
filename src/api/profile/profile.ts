import { AxiosResponse } from 'axios';
import customAxios from 'lib/axios';
import {
  follwerType,
  follwingType,
  fetchProfileType,
  patchProfileDto,
} from './profile.type';

export const myProfileInfo = async () => {
  const data = await customAxios.get('/profile');

  return data;
};

export const findFollower = async (
  userId: string
): Promise<AxiosResponse<follwerType>> => {
  const data = await customAxios.get(`/follow/${userId}/follower`);

  return data;
};

export const findFollowing = async (
  userId: string
): Promise<AxiosResponse<follwingType>> => {
  const data = await customAxios.get(`/follow/${userId}/following`);

  return data;
};

export const fetchProfileInfo = async (userId: string) => {
  const { data }: fetchProfileType = await customAxios.get(`/users/${userId}`);

  return data;
};

export const fetchOtherUserInfo = async (userId: string) => {
  const { data } = await customAxios.get(`/users/${userId}`);

  return data;
};

export const modifyProfile = async (
  modiftObj: patchProfileDto,
  userId: string
) => {
  const { data } = await customAxios.patch(`/users/${userId}`, modiftObj);

  return data;
};

export const uploadImg = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await customAxios.post('/image/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
