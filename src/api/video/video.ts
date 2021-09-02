import customAxios from 'lib/axios';

// eslint-disable-next-line consistent-return
const getVideos = async () => {
  // FIX: address
  const response = await customAxios.get(
    `${process.env.REACT_APP_SERVER}/videos/all/middle`
  );
  return response.data.datas;
};

export default getVideos;
