<template>
  <q-btn color="primary" :label="userName">
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
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ProfileMenu',
});
defineProps({
  userName: String,
});
</script>
