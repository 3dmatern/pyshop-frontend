import { defineStore } from 'pinia';

import { UserProfile } from 'src/main-types';
import {
  getAccessToken,
  getUserData,
  setUsername,
} from 'src/boot/localStorageApi';

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
    setCurrentUserName(username: string) {
      setUsername(username);
      this.currentUser = this.currentUser
        ? { ...this.currentUser, username }
        : this.currentUser;
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
