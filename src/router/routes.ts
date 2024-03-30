import { RouteRecordRaw } from 'vue-router';

import ProfilePage from 'pages/ProfilePage.vue';
import LoginPage from 'src/pages/LoginPage.vue';
import RegisterPage from 'src/pages/RegisterPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // Синтаксис отложенной загрузки при большом приложении
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'profile',
        component: ProfilePage, // Синтаксис загрузки при небольшом приложении
      },
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
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
