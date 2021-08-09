import customAxios from 'lib/axios';

const myProfileInfo = async (token: string) => {
  const data = await customAxios.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export default myProfileInfo;
