import customAxios from 'lib/axios';

// eslint-disable-next-line consistent-return
const getVideos = async () => {
  // FIX: address
  const response = await customAxios.get(`/videos/list`);
  return response.data.datas;
};

export default getVideos;
