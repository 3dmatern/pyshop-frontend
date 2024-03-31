<template>
  <q-layout>
    <q-header class="q-pa-md flex items-center" elevated>
      <q-toolbar-title>
        <router-link to="/" style="text-decoration: none; color: white"
          >PyShop Test</router-link
        ></q-toolbar-title
      >

      <q-btn-group v-if="!currentUser">
        <q-btn color="white" to="/login" text-color="black" label="Вход" />
        <q-btn color="black" label="Регистрация" to="/register" />
      </q-btn-group>

      <ProfileMenu v-else :userName="currentUser?.name" />
    </q-header>
    <router-view />
    <q-footer class="q-pa-md" elevated>
      <q-toolbar-title> App Footer </q-toolbar-title>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';

import { getAccessToken, removeTokens } from './services/localStorageService';
import userService from './services/userService';
import { GetUserResponseType } from './main-types';

import ProfileMenu from 'components/ProfileMenu.vue';

defineOptions({
  name: 'App',
});

const token = getAccessToken();
const currentUser = ref<GetUserResponseType>();

if (token) {
  userService
    .getUser(token)
    .then((data) => (currentUser.value = data))
    .catch((err) => console.log(err));
} else {
  removeTokens();
}

console.log('currentUser', currentUser.value);
console.log('token', token);
provide('currentUser', currentUser.value);
</script>
