<!-- src/components/TelegramAuthWrapper.vue -->
<template>
  <div>
    <div v-if="!isTelegramUser" class="telegram-auth-page">
      <h1>This app is only available through Telegram</h1>
      <p>Please open this application using Telegram WebApp</p>
      <a href="https://t.me/MnemospeakApp_bot" class="telegram-link-button">
        Open in Telegram
      </a>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onActivated } from 'vue';
import { useTelegramUserStore } from '@stores/TelegramUser';

export default defineComponent({
  name: 'TelegramAuthWrapper',
  setup() {
    const telegramStore = useTelegramUserStore();
    const isTelegramUser = ref<boolean>(false);

    const checkAuth = (): void => {
      isTelegramUser.value = telegramStore.initializeFromTelegram();
    };

    onMounted(() => {
      checkAuth();
    });

    onActivated(() => {
      checkAuth();
    });

    return {
      isTelegramUser,
      checkAuth
    };
  }
});
</script>

<style scoped>
.telegram-link-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--yellow);
  border: none;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.telegram-auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 1rem;
}

.telegram-auth-page button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--yellow);
  border: none;
  cursor: pointer;
}
</style>