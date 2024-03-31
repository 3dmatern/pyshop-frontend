import { GetUserResponseType } from 'src/main-types';
import httpService from './httpService';

const userService = {
  getUser: async (token: string) => {
    const { data } = await httpService.get<GetUserResponseType>('user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default userService;
