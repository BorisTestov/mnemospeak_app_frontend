<!-- src/components/HealthCheckWrapper.vue -->
<template>
  <div>
    <MaintenancePage v-if="!isHealthy" @retry="checkHealth" />
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, onActivated} from 'vue';
import { getHealthStatus } from '@/services/healthCheckService';
import MaintenancePage from './MaintenancePage.vue';

export default defineComponent({
  name: 'HealthCheckWrapper',
  components: {
    MaintenancePage
  },
  setup() {
    const isHealthy = ref<boolean>(true);

    const checkHealth = async (): Promise<void> => {
      isHealthy.value = await getHealthStatus();
    };

    onMounted(() => {
      checkHealth();
    });

    onActivated(() => {
      checkHealth();
    });

    return {
      isHealthy,
      checkHealth
    };
  }
});
</script>