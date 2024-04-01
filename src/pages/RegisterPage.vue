<template>
  <q-page class="flex flex-center justify-center">
    <CardForm
      :subtitle="'Регистрация'"
      :back-title="'Уже есть аккаунт?'"
      :back-link-href="'/login'"
      :back-link-title="'Вход'"
    >
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="username"
          label="Имя"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Пожалуйста, введите имя',
          ]"
        />
        <q-input
          filled
          type="email"
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Пожалуйста, введите email',
          ]"
        />
        <q-input
          filled
          type="password"
          v-model="password"
          label="Пароль"
          lazy-rules
        />

        <div class="flex items-center justify-around">
          <q-btn label="Регистрация" type="submit" color="primary" />
          <q-btn
            label="Сбросить"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </CardForm>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

import CardForm from 'components/CardForm.vue';
import { authApi } from '../boot/authApi';

const $q = useQuasar();

const username = ref(null);
const email = ref(null);
const password = ref(null);

async function onSubmit() {
  if (!username.value || !email.value || !password.value) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Сначала вам необходимо заполнить все поля',
    });
  } else {
    try {
      await authApi.register({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Регистрация прошла успешно',
      });

      onReset();
    } catch (error) {
      console.error(error);
    }
  }
}

function onReset() {
  username.value = null;
  email.value = null;
  password.value = null;
}
</script>
