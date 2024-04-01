<template>
  <q-page class="column flex-center" style="max-width: 400px; margin: 0 auto">
    <p class="text-h2">Мой профиль</p>

    <div class="q-pa-md" style="width: 100%">
      <div
        v-for="item in profileInfo"
        :key="item.name"
        class="row items-center justify-start"
      >
        <div class="col-5">
          {{ item.name }}
        </div>
        <div class="col-7">
          {{ item.value }}
        </div>
      </div>
    </div>

    <div class="row items-center" style="gap: 10px">
      <q-btn color="primary" to="profile/edit" class="col-12"
        >Редактировать профиль</q-btn
      >
      <q-btn color="negative" @click="removeUser" class="col-12"
        >Удалить аккаунт</q-btn
      >
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const profileInfo = [
  { name: 'Имя:', value: authStore.userProfile?.name },
  { name: 'Телефон:', value: authStore.userProfile?.tel },
  { name: 'Адрес:', value: authStore.userProfile?.address },
  { name: 'Обо мне:', value: authStore.userProfile?.aboutMe },
];

function removeUser() {
  const isRemove = window.confirm('Вы дейстивтельно хотите удалить аккаунт?');

  if (isRemove) {
    window.location.href = '/';
  }
}
</script>
