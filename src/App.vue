<template>
  <q-layout>
    <q-header class="q-pa-md flex items-center" elevated>
      <q-toolbar-title>
        <router-link to="/" style="text-decoration: none; color: white"
          >PyShop Test</router-link
        ></q-toolbar-title
      >

      <q-btn-group v-if="!authStore.currentUser">
        <q-btn color="white" to="/login" text-color="black" label="Вход" />
        <q-btn color="black" label="Регистрация" to="/register" />
      </q-btn-group>

      <ProfileMenu v-else :username="authStore.currentUser.username" />
    </q-header>
    <router-view />
    <q-footer class="q-pa-md" elevated>
      <q-toolbar-title> App Footer </q-toolbar-title>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth';

import ProfileMenu from './components/ProfileMenu.vue';

const authStore = useAuthStore();

defineOptions({
  name: 'App',
});
</script>
