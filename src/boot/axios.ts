import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

import appConfig from '../../config.json';
import localStorageApi from './localStorageApi';
import { authApi } from './authApi';
import { parseToken } from 'src/utils/parseToken';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: appConfig.API_ENDPOINT });
let isRefreshingToken = false;

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorageApi.getAccessToken();
    const expiresToken = localStorageApi.getTokenExpiresToken();
    const userId = localStorageApi.getUserData()?.id;

    if (expiresToken && !isNaN(+expiresToken)) {
      const currentTime = Math.floor(Date.now() / 1000);
      const leftLittleTime = +expiresToken - currentTime;
      const isExpires = leftLittleTime > 0 && leftLittleTime <= 60;
      const isExpired = currentTime >= +expiresToken;

      if (isExpired) {
        localStorageApi.removeTokens();
      } else if (isExpires && userId && accessToken) {
        if (!isRefreshingToken) {
          try {
            isRefreshingToken = true;

            const refreshAccessToken = await authApi.refreshAccessToken(
              accessToken
            );
            const { sub, username, exp } = await parseToken(refreshAccessToken);

            if (userId === sub) {
              localStorageApi.setTokens({
                accessToken: refreshAccessToken,
                expiresIn: String(exp),
                userId: sub,
                username,
              });
              config.headers.Authorization = `Bearer ${refreshAccessToken}`;
            } else {
              localStorageApi.removeTokens();
            }
          } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            localStorageApi.removeTokens();
          } finally {
            isRefreshingToken = false;
          }
        }
      } else {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export { api };
