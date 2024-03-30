<template>
  <q-page class="column flex-center justify-center">
    <p class="text-h3">Редактирование профиля</p>

    <div class="q-pa-md" style="max-width: 400px; width: 100%">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="username" label="Моё имя" lazy-rules />

        <q-input filled type="tel" v-model="tel" label="Телефон" lazy-rules />

        <q-input filled v-model="address" label="Адрес" lazy-rules />

        <q-input
          filled
          v-model="aboutme"
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
          <q-btn label="Вернуться в профиль" color="black" :href="'/profile'" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const username = ref('Денис');
const tel = ref('+375445549522');
const address = ref('Беларусь, Светлогорский р-н, а.г. Козловка');
const aboutme = ref('Fullstack-developer');

function onSubmit() {
  if (!username.value && !tel.value && !address.value && !aboutme.value) return;

  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Данные изменены',
  });

  console.log({
    username: username.value,
    tel: tel.value,
    address: address.value,
    aboutme: aboutme.value,
  });

  onReset();
}

function onReset() {
  username.value = '';
  tel.value = '';
  address.value = '';
  aboutme.value = '';
}
</script>
