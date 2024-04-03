<template>
  <q-page class="flex flex-center justify-center">
    <CardForm
      :subtitle="'Вход'"
      :back-title="'Ещё нет аккаунта?'"
      :back-link-href="'/register'"
      :back-link-title="'Зарегистрироваться'"
    >
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          type="email"
          v-model="email"
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
          v-model="password"
          label="Пароль"
          lazy-rules
          :rules="[
            (val: string | any[]) =>(val && val.length > 0) ||'Пожалуйста, введите пароль',
          ]"
        />

        <div class="flex items-center justify-around">
          <q-btn
            label="Войти"
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
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import CardForm from 'components/CardForm.vue';
import { authApi } from '../boot/authApi';
import { parseToken } from '../utils/parseToken';
import { setTokens } from '../boot/localStorageApi';
import { useAuthStore } from '../stores/auth';
import { validateEmail } from '../utils/validate';

const $q = useQuasar();
const router = useRouter();
const isSubmit = reactive({ disable: false });

const email = ref(null);
const password = ref(null);

async function onSubmit() {
  if (!email.value || !password.value) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Вам необходимо заполнить все поля',
    });
    return;
  }
  isSubmit.disable = true;

  try {
    const { access_token } = await authApi.login({
      email: email.value,
      password: password.value,
    });
    const { sub, username, exp } = await parseToken(access_token);
    const authStore = useAuthStore();

    authStore.setCurrentUser({ id: sub, username });
    setTokens({
      accessToken: access_token,
      expiresIn: String(exp),
      userId: sub,
      username,
    });
    onReset();
    router.push('/profile');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Ошибка входа:', error);

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

function onReset() {
  email.value = null;
  password.value = null;
}
</script>
