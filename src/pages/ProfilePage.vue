<template>
  <q-page class="column flex-center justify-center">
    <p class="text-h2">Мой профиль</p>

    <div class="q-pa-md">
      <div
        v-for="item in data"
        :key="item.name"
        class="row items-center justify-start"
      >
        <div class="col-4">
          {{ item.name }}
        </div>
        <div class="col-8">
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
const data = [
  { name: 'Имя:', value: 'Денис' },
  { name: 'Телефон:', value: '+375445549522' },
  { name: 'Адрес:', value: 'Беларусь, Светлогорский р-н, а.г. Козловка' },
  { name: 'Обо мне:', value: 'Fullstack-developer' },
];

function removeUser() {
  const isRemove = window.confirm('Вы дейстивтельно хотите удалить аккаунт?');

  if (isRemove) {
    window.location.href = '/';
  }
}
</script>
