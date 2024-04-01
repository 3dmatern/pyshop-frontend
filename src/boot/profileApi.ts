import { UserProfile } from '../main-types';
import { api } from './axios';
import { getAccessToken } from './localStorageApi';

const token = getAccessToken();

const profileApi = {
  getProfileByUserId: async (userId: string | number) => {
    const { data } = await api.get<UserProfile>(`profiles/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default profileApi;
