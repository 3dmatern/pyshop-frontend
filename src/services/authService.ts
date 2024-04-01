import { Auth, UserProfile } from 'src/main-types';
import httpService from './httpService';
import { getAccessToken } from './localStorageService';

const authService = {
  register: async (payload: Auth) => {
    const { data } = await httpService.post('auth/register', payload);

    console.log(data);

    return data;
  },
  login: async (
    payload: Auth
  ): Promise<{
    access_token: string;
    user_profile: UserProfile;
  }> => {
    const { data } = await httpService.post('auth/login', payload);

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
