<template>
  <q-page class="column items-center justify-center">
    <h1 class="text-h2">JWT аутентификация</h1>
    <h2 class="text-h3">CRUD операции с пользователем</h2>

    <div>
      <p class="text-weight-bolder">Стек технологий:</p>

      <div>
        <p>Для frontend-а:</p>
        <ul>
          <li v-for="front in stackFrontend" :key="front.id">
            {{ front.name }}
          </li>
        </ul>
      </div>
      <div>
        <p>Для backend-а:</p>
        <ul>
          <li v-for="back in stackBackend" :key="back.id">
            {{ back.name }}
          </li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let fID = 0;
let bID = 0;

const stackFrontend = ref([
  { id: 'f' + fID++, name: 'Framework Quasar' },
  { id: 'f' + fID++, name: 'TypeScript' },
  { id: 'f' + fID++, name: 'Axios' },
]);
const stackBackend = ref([
  { id: 'b' + bID++, name: 'Nest.js' },
  { id: 'b' + bID++, name: 'TypeScript' },
]);
</script>
