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