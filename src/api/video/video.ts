import customAxios from 'lib/axios';

// eslint-disable-next-line consistent-return
const getVideos = async () => {
  // FIX: address
  const response = await customAxios.get(`/videos/all/middle`);
  return response.data.datas;
};

export default getVideos;
