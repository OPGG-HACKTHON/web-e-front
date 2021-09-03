import customAxios from 'lib/axios';

// eslint-disable-next-line consistent-return
const getProfileVideo = async (userId: string) => {
  // videos/user/user1
  const response = await customAxios.get(`videos/user/${userId}`);
  return response.data.datas;
};

export default getProfileVideo;
