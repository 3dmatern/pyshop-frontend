import { Auth, SignUpAuth, UserProfile } from '../main-types';
import { api } from './axios';

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
  refreshAccessToken: async (accessToken: string): Promise<string> => {
    const { data } = await api.post('auth/token', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  },
};
