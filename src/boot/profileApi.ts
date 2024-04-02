import { UserProfile } from '../main-types';
import { api } from './axios';

const profileApi = {
  getProfileByUserId: async (userId: string) => {
    const { data } = await api.get<UserProfile>(`profiles/${userId}`);

    return data;
  },
  updateProfile: async (payload: UserProfile) => {
    const { data } = await api.post<UserProfile>('profiles', payload);

    return data;
  },
};

export default profileApi;
