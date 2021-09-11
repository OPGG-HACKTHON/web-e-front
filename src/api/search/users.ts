import customAxios from 'lib/axios';

// eslint-disable-next-line consistent-return
const getUsers = async (url: string) => {
  const response = await customAxios.get(url);
  return response.data.datas;
};

export default getUsers;
