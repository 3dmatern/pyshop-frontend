import { Auth, SignUpAuth, UserProfile } from '../main-types';
import { api } from './axios';
import { getAccessToken } from './localStorageApi';

export const authApi = {
  register: async (payload: SignUpAuth) => {
    await api.post('auth/register', payload);
  },
  login: async (
    payload: Auth
  ): Promise<{
    access_token: string;
    user_profile: UserProfile;
  }> => {
    const { data } = await api.post('auth/login', payload);

    return data;
  },
  refreshToken: async () => {
    const { data } = await api.post('auth/token', {
      refresh: getAccessToken(),
    });

    console.log(data);

    return data;
  },
};
