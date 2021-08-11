import customAxios from 'lib/axios';

const myProfileInfo = async () => {
  const data = await customAxios.get('/profile');

  return data;
};

export default myProfileInfo;
