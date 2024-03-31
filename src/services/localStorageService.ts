import { Tokens } from 'src/main-types';

const TOKEN_KEY = 'jwt-token';
const EXPIRES_KEY = 'jwt-expires';

export const setTokens = ({ accessToken, expiresIn }: Tokens) => {
  localStorageSet(TOKEN_KEY, accessToken);
  localStorageSet(EXPIRES_KEY, expiresIn);
};

export const getAccessToken = () => {
  return localStorageGet(TOKEN_KEY);
};

export const getTokenExpiresDate = () => {
  return localStorageGet(EXPIRES_KEY);
};

export const removeTokens = () => {
  localStorageRemove(TOKEN_KEY);
  localStorageRemove(EXPIRES_KEY);
};

const localStorageService = {
  setTokens,
  getAccessToken,
  getTokenExpiresDate,
  removeTokens,
};

export default localStorageService;

function localStorageSet(key: string, value: string) {
  localStorage.setItem(key, value);
}

function localStorageGet(key: string) {
  return localStorage.getItem(key);
}

function localStorageRemove(key: string) {
  localStorage.removeItem(key);
}
