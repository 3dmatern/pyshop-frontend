import { Tokens } from 'src/main-types';

const TOKEN_KEY = 'jwt-token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'userId';
const username_KEY = 'username';

export const setTokens = ({
  accessToken,
  expiresIn,
  userId,
  username,
}: Tokens) => {
  localStorageSet(TOKEN_KEY, accessToken);
  localStorageSet(EXPIRES_KEY, expiresIn);
  localStorageSet(USERID_KEY, userId);
  localStorageSet(username_KEY, username);
};

export const getAccessToken = (): string | null => {
  return localStorageGet(TOKEN_KEY);
};

export const getTokenExpiresToken = (): string | null => {
  return localStorageGet(EXPIRES_KEY);
};

export const getUserData = (): { id: string; username: string } | null => {
  const id = localStorageGet(USERID_KEY);
  const username = localStorageGet(username_KEY);

  if (id && username) {
    return { id, username };
  }

  return null;
};

export const removeTokens = () => {
  localStorageRemove(TOKEN_KEY);
  localStorageRemove(EXPIRES_KEY);
  localStorageRemove(USERID_KEY);
  localStorageRemove(username_KEY);
};

const localStorageApi = {
  setTokens,
  getAccessToken,
  getTokenExpiresToken,
  getUserData,
  removeTokens,
};

export default localStorageApi;

function localStorageSet(key: string, value: string) {
  localStorage.setItem(key, value);
}

function localStorageGet(key: string) {
  return localStorage.getItem(key);
}

function localStorageRemove(key: string) {
  localStorage.removeItem(key);
}
