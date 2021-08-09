export const setToken = (tokenKey: string, token: string) => {
  sessionStorage.setItem(tokenKey, token);
};

export const getToken = (): string => {
  return sessionStorage.getItem('access_token') as string;
};
