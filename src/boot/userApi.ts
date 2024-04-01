import { UserProfile } from '../main-types';
import { api } from './axios';
import { getAccessToken } from './localStorageApi';

const token = getAccessToken();

const userService = {
  getUser: async () => {
    const { data } = await api.get<UserProfile>('users/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default userService;
