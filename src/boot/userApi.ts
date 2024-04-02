import { UserProfile } from '../main-types';
import { api } from './axios';

const userService = {
  delete: async () => {
    await api.delete<UserProfile>('users');
  },
};

export default userService;
