<template>
  <div>
    <div v-if="!hasSubscription" class="subscription-page">
      <h1>Active subscription required</h1>
      <p>Please subscribe to access this content</p>
      <a href="https://t.me/MnemospeakApp_bot" class="subscription-link-button">
        Subscribe
      </a>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onActivated } from 'vue';
import { useTelegramUserStore } from '@stores/TelegramUser';
import { check_subscription } from '@utils/api_calls';
import {debugMessage} from "@utils/debug";

export default defineComponent({
  name: 'SubscriptionWrapper',
  setup() {
    const telegramStore = useTelegramUserStore();
    const hasSubscription = ref<boolean>(false);

    const checkSubscription = async (): Promise<void> => {
      if (telegramStore.user.id) {
        hasSubscription.value = await check_subscription(telegramStore.user.id);
      }
    };

    onMounted(() => {
      checkSubscription();
    });

    onActivated(() => {
      checkSubscription();
    });

    return {
      hasSubscription
    };
  }
});
</script>

<style scoped>
.subscription-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 1rem;
}

.subscription-link-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--yellow);
  border: none;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.subscription-link-button:hover {
  opacity: 0.9;
}
</style>