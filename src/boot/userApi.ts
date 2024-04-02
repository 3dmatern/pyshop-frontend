import { UserProfile } from '../main-types';
import { api } from './axios';

const userService = {
  getUser: async () => {
    const { data } = await api.get<UserProfile>('users/user');

    return data;
  },
};

export default userService;
