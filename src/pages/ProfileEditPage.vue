<template>
  <q-page class="column flex-center justify-center">
    <p class="text-h3">Редактирование профиля</p>

    <div class="q-pa-md" style="max-width: 400px; width: 100%">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="name" label="Моё имя" lazy-rules />

        <q-input filled type="tel" v-model="tel" label="Телефон" lazy-rules />

        <q-input filled v-model="address" label="Адрес" lazy-rules />

        <q-input
          filled
          v-model="aboutMe"
          label="Информация обо мне"
          lazy-rules
        />

        <div class="flex items-center justify-around">
          <q-btn label="Сохранить изменения" type="submit" color="primary" />
          <q-btn
            label="Сбросить"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>

        <div class="flex items-center justify-around">
          <q-btn label="Вернуться в профиль" color="black" to="/profile" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

import { useAuthStore } from '../stores/auth';

const $q = useQuasar();
const authStore = useAuthStore();

const name = ref(authStore.userProfile?.name);
const tel = ref(authStore.userProfile?.tel);
const address = ref(authStore.userProfile?.address);
const aboutMe = ref(authStore.userProfile?.aboutMe);

function onSubmit() {
  if (!name.value && !tel.value && !address.value && !aboutMe.value) return;

  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Данные изменены',
  });

  console.log({
    name: name.value,
    tel: tel.value,
    address: address.value,
    aboutMe: aboutMe.value,
  });

  onReset();
}

function onReset() {
  name.value = '';
  tel.value = '';
  address.value = '';
  aboutMe.value = '';
}
</script>
