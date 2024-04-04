<template>
  <q-page class="column flex-center justify-center">
    <p class="subHeader">Редактирование профиля</p>

    <div class="q-pa-md" style="max-width: 400px; width: 100%">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model.trim="name"
          label="Имя"
          lazy-rules
          :rules="[
          (val: string ) => (val && val.length > 1) || 'Введите ваше имя, минимум 2 символа',
          (val: string ) => (val.length < 31) || 'Максимум 30 символов'
        ]"
        />

        <q-input filled type="tel" v-model.trim="tel" label="Телефон" />

        <q-input filled v-model.trim="address" label="Адрес" />

        <q-input
          filled
          v-model.trim="aboutMe"
          label="Информация обо мне"
          autogrow
        />

        <div class="flex items-center justify-around">
          <q-btn
            label="Сохранить изменения"
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

        <div class="flex items-center justify-around">
          <q-btn label="Вернуться в профиль" color="black" to="/profile" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';

import { useAuthStore } from '../stores/auth';
import profileApi from '../boot/profileApi';

const $q = useQuasar();
const authStore = useAuthStore();
const isSubmit = reactive({ disable: false });

const name = ref(authStore.userProfile?.name);
const tel = ref(authStore.userProfile?.tel);
const address = ref(authStore.userProfile?.address);
const aboutMe = ref(authStore.userProfile?.aboutMe);

async function onSubmit() {
  if (!name.value) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Введите имя',
    });
    return;
  }
  isSubmit.disable = true;

  try {
    const payload = {
      name: name.value?.trim(),
      tel: tel.value?.trim(),
      address: address.value?.trim(),
      aboutMe: aboutMe.value?.trim(),
    };
    const data = await profileApi.updateProfile(payload);

    authStore.setCurrentUserName(data.name);
    authStore.setUserProfile(data);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Данные изменены',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Ошибка при обновлении профиля', error);
    let errorMsg = '';

    switch (error.code) {
      case 'ERR_CANCELED':
        errorMsg = 'Запрос отменен';
        break;
      default:
        break;
    }
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: errorMsg,
    });
  } finally {
    isSubmit.disable = false;
  }
}

function onReset() {
  name.value = '';
  tel.value = '';
  address.value = '';
  aboutMe.value = '';
}
</script>
