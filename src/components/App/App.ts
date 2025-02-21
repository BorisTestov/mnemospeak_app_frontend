import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import SplashScreen from '@components/SplashScreen/SplashScreen.vue';
import { useTelegramUserStore } from '@stores/telegramUser';

export default defineComponent({
    name: "App",
    components: {
        SplashScreen
    },
    setup() {
        const route = useRoute();
        const telegramStore = useTelegramUserStore();
        const showSplash = ref(false);
        const firstLoad = ref(true);

        const mainRoutePath = '/';


        onMounted(() => {
            const isTelegramUser = telegramStore.initializeFromTelegram();

            if (route.path === mainRoutePath && firstLoad.value && isTelegramUser) {
                showSplash.value = true;
                firstLoad.value = false;
            }
        });

        watch(() => route.path, (newPath) => {
            if (newPath === mainRoutePath && isPageReload() && telegramStore.isAuthenticated) {
                showSplash.value = true;
            }
        });

        const isPageReload = () => {
            if (!telegramStore.isAuthenticated) {
                telegramStore.initializeFromTelegram();
                return true;
            }
            return false;
        };

        return {
            showSplash
        };
    }
});