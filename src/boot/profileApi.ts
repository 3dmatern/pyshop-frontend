import { UserProfile } from '../main-types';
import { api } from './axios';

const profileApi = {
  getProfileByUserId: async (userId: string) => {
    const { data } = await api.get<UserProfile>(`profiles/${userId}`);

    return data;
  },
};

export default profileApi;
