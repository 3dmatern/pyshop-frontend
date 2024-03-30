<template>
  <q-card
    class="my-card bg-standart text-center"
    style="max-width: 400px; width: 100%"
  >
    <q-card-section>
      <div class="text-h6">Аутентификация</div>
      <div class="text-subtitle2">{{ subtitle }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="q-pa-md">
        <slot></slot>
      </div>
    </q-card-section>

    <q-card-actions
      style="padding: 16px"
      class="flex items-center justify-evenly"
    >
      <router-link
        to="/"
        style="text-decoration: none; color: black"
        class="text-caption text-weight-bold"
        >На главную</router-link
      >
      <p class="text-caption" style="margin: 0">
        {{ backTitle }}
        <router-link
          :to="backLinkHref || '#'"
          style="text-decoration: none; color: black"
          class="text-caption text-weight-bold"
          >{{ backLinkTitle }}</router-link
        >
      </p>
    </q-card-actions>
    <q-separator inset />
  </q-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CardForm',
});

defineProps({
  subtitle: String,
  backTitle: String,
  backLinkTitle: String,
  backLinkHref: String,
});
</script>
