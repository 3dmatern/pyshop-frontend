const TOKEN_KEY = 'jwt-token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-id';

export const setTokens = ({ accessToken, expiresIn, userId }: Tokens) => {
  localStorageSet(TOKEN_KEY, accessToken);
  localStorageSet(EXPIRES_KEY, expiresIn);
  localStorageSet(USERID_KEY, userId);
};

export const getAccessToken = () => {
  return localStorageGet(TOKEN_KEY);
};

export const getTokenExpiresDate = () => {
  return localStorageGet(EXPIRES_KEY);
};

export const getUserId = () => {
  return localStorageGet(USERID_KEY);
};

export const deleteTokens = () => {
  localStorageRemove(TOKEN_KEY);
  localStorageRemove(EXPIRES_KEY);
  localStorageRemove(USERID_KEY);
};

const localStorageService = { setTokens };

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
