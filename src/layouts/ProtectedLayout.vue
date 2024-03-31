<template>
  <q-page-container class="q-pa-md">
    <router-view />
  </q-page-container>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const currentUser = inject('currentUser');

if (!currentUser) {
  window.location.href = '/';
}
</script>
