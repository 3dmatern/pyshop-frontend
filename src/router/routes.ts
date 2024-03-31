import { RouteRecordRaw } from 'vue-router';

import RegisterPage from 'src/pages/RegisterPage.vue';
import LoginPage from 'src/pages/LoginPage.vue';
import ProfilePage from 'pages/ProfilePage.vue';
import ProfileEditPage from 'src/pages/ProfileEditPage.vue';
import ProtectedLayout from 'src/layouts/ProtectedLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // Синтаксис отложенной загрузки при большом приложении
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'register',
        component: RegisterPage, // Синтаксис загрузки при небольшом приложении
      },
      { path: 'login', component: LoginPage },
    ],
  },
  {
    path: '/profile',
    component: ProtectedLayout,
    children: [
      { path: '', component: ProfilePage },
      { path: 'edit', component: ProfileEditPage },
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
