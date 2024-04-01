import { defineStore } from 'pinia';

import { UserProfile } from 'src/main-types';
import { getAccessToken, getUserData } from 'src/boot/localStorageApi';

interface User {
  id: string;
  username: string;
}

const initState = getAccessToken()
  ? {
      currentUser: getUserData() as User,
      userProfile: null as UserProfile | null,
    }
  : {
      currentUser: null as User | null,
      userProfile: null as UserProfile | null,
    };

export const useAuthStore = defineStore('auth', {
  state: () => initState,
  actions: {
    setCurrentUser(user: User) {
      this.currentUser = user;
    },
    setUserProfile(profile: UserProfile) {
      this.userProfile = profile;
    },
    clearCurrentUser() {
      this.currentUser = null;
      this.userProfile = null;
    },
  },
});
