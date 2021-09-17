import customAxios from 'lib/axios';

// eslint-disable-next-line consistent-return
export const getRecommendVideos = async () => {
  // FIX: address
  const response = await customAxios.get(`/videos/recommandList`);
  return response.data.datas;
};
