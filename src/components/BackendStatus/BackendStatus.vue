<template>
  <span :class="['backend-status', isOnline ? 'online' : 'offline']">
    Backend: {{ isOnline ? 'Online' : 'Offline' }}
  </span>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { get } from '@utils/api';

export default defineComponent({
  name: 'BackendStatus',
  setup() {
    const isOnline = ref(false);
    const checkInterval = ref<number | null>(null);

    const checkBackendStatus = async () => {
      console.log(import.meta.env.VITE_API_URL);
      try {
        // Use your utility function instead of direct fetch
        // Note: We make a simple GET request to healthcheck endpoint and disable error notifications
        await get('/healthcheck', {}, false);
        isOnline.value = true;
      } catch (error) {
        isOnline.value = false;
      }
    };

    onMounted(() => {
      // Check immediately on mount
      checkBackendStatus();

      // Then check every 30 seconds
      checkInterval.value = window.setInterval(checkBackendStatus, 30000);
    });

    onUnmounted(() => {
      // Clear interval when component is unmounted
      if (checkInterval.value !== null) {
        clearInterval(checkInterval.value);
      }
    });

    return {
      isOnline,
    };
  },
});
</script>

<style scoped>
.backend-status {
  font-weight: bold;
  font-size: 1rem;
  //padding: 4px 8px;
  border-radius: 4px;
  //padding-left: auto;
  z-index: 1000;
  position: fixed;

  top: 0;
  left: calc(50dvw - 1rem);
}

.online {
  color: white;
  background-color: #4caf50; /* Green */
}

.offline {
  color: white;
  background-color: #f44336; /* Red */
}
</style>