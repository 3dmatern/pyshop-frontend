import httpService from './httpService';
import { getAccessToken } from './localStorageService';

const authService = {
  register: async (payload: Auth) => {
    const { data } = await httpService.post('auth', payload);

    console.log(data);

    return data;
  },
  login: async (payload: Auth) => {
    const { data } = await httpService.post('auth', payload);

    console.log(data);

    return data;
  },
  refreshToken: async () => {
    const { data } = await httpService.post('auth/token', {
      refresh: getAccessToken(),
    });

    console.log(data);

    return data;
  },
};

export default authService;
