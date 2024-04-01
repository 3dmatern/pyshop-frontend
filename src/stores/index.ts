import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';

/*
 * Если сборка не ведется в режиме SSR, вы можете
 * напрямую экспортировать экземпляр Магазина;
 *
 * Функция ниже также может быть асинхронной; либо используйте
 * async/await или вернуть обещание, которое разрешает
 * с экземпляром Store.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();

  // Вы можете добавить плагины Pinia здесь
  // pinia.use(SomePiniaPlugin)

  return pinia;
});
