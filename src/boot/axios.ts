import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

import localStorageApi from './localStorageApi';

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

const api = axios.create({ baseURL: process.env.API_ENDPOINT });

let abortController: AbortController | null = null;

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
    if (abortController) {
      abortController.abort();
    }

    const accessToken = localStorageApi.getAccessToken();
    const expiresToken = localStorageApi.getTokenExpiresToken();

    if (expiresToken && !isNaN(+expiresToken)) {
      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = currentTime >= +expiresToken;

      if (isExpired) {
        localStorageApi.removeTokens();
      } else {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    }

    abortController = new AbortController();
    config.signal = abortController.signal;

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
