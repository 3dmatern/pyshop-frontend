import { UserProfile } from 'src/main-types';
import httpService from './httpService';
import { getAccessToken } from './localStorageService';

const token = getAccessToken();

const profileService = {
  getProfileByUserId: async (userId: string | number) => {
    const { data } = await httpService.get<UserProfile>(`profiles/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default profileService;
