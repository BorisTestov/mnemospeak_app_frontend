import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import {backend_healthcheck} from "../../utils/api_calls";

export default defineComponent({
    name: 'BackendStatus',
    setup() {
        const isOnline = ref(false);
        const checkInterval = ref<number | null>(null);

        const checkBackendStatus = async () => {
            try {
                await backend_healthcheck();
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