/* eslint-disable */

import customAxios from 'lib/axios';

export const getRecommendVideos = async () => {
  // FIX: address
  const response = await customAxios.get(`/videos/recommandList`);
  return response.data.datas;
};
