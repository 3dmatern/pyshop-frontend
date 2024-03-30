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
          label="Your email *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Пожалуйста, введите email',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Your password *"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) ||
              'Пожалуйста, введите пароль не мнеьше 6 символов',
          ]"
        />

        <div class="flex items-center justify-around">
          <q-btn label="Войти" type="submit" color="primary" />
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

const $q = useQuasar();

const email = ref(null);
const password = ref(null);

function onSubmit() {
  if (!email.value || !password.value) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Сначала вам необходимо заполнить все поля',
    });
  } else {
    onReset();
    window.location.href = '/profile';
  }
}

function onReset() {
  email.value = null;
  password.value = null;
}
</script>
