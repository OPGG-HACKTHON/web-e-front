import axios from 'axios';

// eslint-disable-next-line consistent-return
const getVideos = async () => {
  // FIX: address
  const data = await axios.get(
    `${process.env.REACT_APP_SERVER}/videos/all/middle`
  );
  return data;
};

export default getVideos;
