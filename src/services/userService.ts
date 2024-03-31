import httpService from './httpService';
import { getAccessToken } from './localStorageService';

const userService = {
  getUserById: async (id: string) => {
    const { data } = await httpService.get(`user/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    console.log(data);

    return data;
  },
};

export default userService;
