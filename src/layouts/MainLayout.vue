<template>
  <q-layout>
    <q-header class="q-pa-md flex items-center" elevated>
      <q-toolbar-title> PyShop Test </q-toolbar-title>
      <q-btn-group>
        <q-btn color="white" text-color="black" label="Вход" :href="'/login'" />
        <q-btn color="black" label="Регистрация" :href="'/register'" />
      </q-btn-group>
    </q-header>
    <q-page-container class="q-pa-md">
      <router-view />
    </q-page-container>
    <q-footer class="q-pa-md" elevated>
      <q-toolbar-title> Main Footer </q-toolbar-title>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts"></script>
