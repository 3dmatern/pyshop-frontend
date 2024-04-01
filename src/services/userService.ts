import { UserProfile } from 'src/main-types';
import httpService from './httpService';

const userService = {
  getUser: async (token: string) => {
    const { data } = await httpService.get<UserProfile>('users/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default userService;
