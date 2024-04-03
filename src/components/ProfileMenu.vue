<template>
  <q-btn round color="white" text-color="black" :label="username?.[0]">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>
            <q-btn
              flat
              size="md"
              to="/profile"
              style="color: #000"
              label="Профиль"
          /></q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section
            ><q-btn
              flat
              size="md"
              to="/profile/edit"
              style="color: #000"
              label="Редактировать профиль"
          /></q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section
            ><q-btn
              flat
              size="md"
              to="/logout"
              style="color: #000"
              label="Выход"
          /></q-item-section>
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
  username: 'N',
});
defineOptions({
  name: 'ProfileMenu',
});
</script>
