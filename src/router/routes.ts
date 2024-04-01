import { RouteRecordRaw } from 'vue-router';

import { useAuthStore } from '../stores/auth';
import profileApi from 'src/boot/profileApi';
import localStorageApi from 'src/boot/localStorageApi';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
    ],
  },
  {
    path: '/profile',
    component: () => import('layouts/ProfileLayout.vue'),
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();

      if (authStore.currentUser) {
        console.log(authStore.currentUser);

        // Отправить запрос на сервер для получения данных профиля
        try {
          const token = localStorageApi.getAccessToken();
          const profile = await profileApi.getProfileByUserId(
            authStore.currentUser.id,
            token
          );
          authStore.setUserProfile(profile);
          next();
        } catch (error) {
          console.error('Ошибка получения данных профиля:', error);
          // В случае ошибки можно выполнить редирект на другую страницу, например, на главную
          next('/');
        }
      } else {
        // Редирект на главную страницу, если текущий пользователь отсутствует
        next('/');
      }
    },
    children: [
      { path: '', component: () => import('pages/ProfilePage.vue') },
      { path: 'edit', component: () => import('pages/ProfileEditPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
