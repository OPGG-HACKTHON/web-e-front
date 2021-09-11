import customAxios from 'lib/axios';
import { commentDto } from './comment.dto';

const COMMON_URL = '/comment';

export const postComment = async (dto: commentDto) => {
  const targetUrl = `${COMMON_URL}/create`;
  const data = await customAxios.post(targetUrl, dto);
  return data;
};

export const getComment = async (videoId: number) => {
  const targetUrl = `${COMMON_URL}/${videoId}`;
  const data = await customAxios.get(targetUrl);
  return data;
};
