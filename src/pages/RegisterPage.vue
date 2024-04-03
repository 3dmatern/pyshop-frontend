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
          v-model.trim="username"
          label="Имя"
          lazy-rules
          :rules="[
            (val: string) => (val && val.length > 1) || 'Введите ваше имя, минимум 2 символа',
            (val: string) => (val.length < 31) || 'Максимум 30 символов'
          ]"
        />
        <q-input
          filled
          type="email"
          v-model.trim="email"
          label="Email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Пожалуйста, введите email',
            (val) =>
              validateEmail(val) || 'Пожалуйста, введите корректный email',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model.trim="password"
          label="Пароль"
          lazy-rules
          :rules="[
            (val: string | any[]) => (String(val).trim() && val.length > 5) || 'Введите ваше имя, минимум 6 символов',
            (val: string | any[]) => (val.length < 21) || 'Максимум 20 символов'
          ]"
        />

        <div class="flex items-center justify-around">
          <q-btn
            label="Регистрация"
            type="submit"
            color="primary"
            :disable="isSubmit.disable"
          />
          <q-btn
            label="Сбросить"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            :disable="isSubmit.disable"
          />
        </div>
      </q-form>
    </CardForm>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';

import CardForm from 'components/CardForm.vue';
import { authApi } from '../boot/authApi';
import { validateEmail } from '../utils/validate';

const $q = useQuasar();
const isSubmit = reactive({ disable: false });

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
      isSubmit.disable = true;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Ошибка при регистрации пользователя', error);

      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: error.response?.data?.message,
      });
    } finally {
      isSubmit.disable = false;
    }
  }
}

function onReset() {
  username.value = null;
  email.value = null;
  password.value = null;
}
</script>
