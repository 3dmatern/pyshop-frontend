<template>
  <q-btn color="white" text-color="black" :label="username">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section
            ><router-link to="/profile">Профиль</router-link></q-item-section
          >
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section
            ><router-link to="/profile/edit"
              >Редактировать профиль</router-link
            ></q-item-section
          >
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section
            ><router-link to="/logout">Выход</router-link></q-item-section
          >
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
interface Props {
  username?: string;
}
withDefaults(defineProps<Props>(), {
  username: 'No Name',
});
defineOptions({
  name: 'ProfileMenu',
});
</script>
