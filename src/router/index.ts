import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useAuthStore } from '../stores/auth';
import localStorageApi from 'src/boot/localStorageApi';
import { authApi } from 'src/boot/authApi';
import { parseToken } from 'src/utils/parseToken';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
let isRefreshingToken = false;

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const expiresToken = localStorageApi.getTokenExpiresToken();
    const userId = localStorageApi.getUserData()?.id;
    const accessToken = localStorageApi.getAccessToken();

    if (expiresToken && !isNaN(+expiresToken)) {
      const currentTime = Math.floor(Date.now() / 1000);
      const leftLittleTime = +expiresToken - currentTime;
      console.log(leftLittleTime);

      const isExpires = leftLittleTime > 0 && leftLittleTime <= 1800;

      if (isExpires && userId && accessToken) {
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
            } else {
              authStore.clearCurrentUser();
              localStorageApi.removeTokens();
              next('/');
            }
          } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            authStore.clearCurrentUser();
            localStorageApi.removeTokens();
            next('/');
          } finally {
            isRefreshingToken = false;
          }
        }
      }
    }

    next();
  });

  return Router;
});
