import customAxios from 'lib/axios';

// eslint-disable-next-line consistent-return
const getVideos = async () => {
  // FIX: address
<<<<<<< HEAD
  const data = await axios.get(
    `${process.env.REACT_APP_SERVER}/videos/all/middle`
  );
  return data;
=======
  const response = await customAxios.get(`/videos/list`);
  return response.data.datas;
>>>>>>> 437fcf919b778358b82161afd554b103d1f442ed
};

export default getVideos;
