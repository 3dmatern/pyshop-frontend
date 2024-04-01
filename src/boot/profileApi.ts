import { UserProfile } from '../main-types';
import { api } from './axios';

const profileApi = {
  getProfileByUserId: async (userId: string, token: string | null) => {
    console.log(token);
    const { data } = await api.get<UserProfile>(`profiles/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default profileApi;
