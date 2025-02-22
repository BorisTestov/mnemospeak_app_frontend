import { defineComponent, ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNavigation } from '@utils/navigation'
import { useTelegramUserStore } from '@stores/telegramUser';
import SplashScreen from '@components/SplashScreen/SplashScreen.vue';
import ErrorToast from '@components/ErrorNotification/ErrorNotification.vue';
import Modal from '@components/SettingsModal/SettingsModal.vue';

export default defineComponent({
    name: "App",
    components: {
        SplashScreen,
        ErrorToast,
        Modal
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const telegramStore = useTelegramUserStore();
        const showSplash = ref(false);
        const firstLoad = ref(true);
        const errorToast = ref(null);
        const mainRoutePath = '/';
        const showModal = ref(false);


        const handleBackButton = () => {
            if (router.currentRoute.value.path !== mainRoutePath) {
                router.back();
            } else {
                Telegram.WebApp.close();
            }
        };

        const handleSwipeBack = (touchStartX: number, touchEndX: number) => {
            if (touchEndX > touchStartX + 50) {
                handleBackButton();
            }
        };

        onMounted(() => {
            const isTelegramUser = telegramStore.initializeFromTelegram();

            if (route.path === mainRoutePath && firstLoad.value && isTelegramUser) {
                showSplash.value = true;
                firstLoad.value = false;
            }

            if (window.Telegram?.WebApp) {
                Telegram.WebApp.BackButton.show();
                Telegram.WebApp.BackButton.onClick(handleBackButton);
            }

            let touchStartX = 0;
            let touchEndX = 0;

            const onTouchStart = (e: TouchEvent) => {
                touchStartX = e.touches[0].clientX;
            };

            const onTouchEnd = (e: TouchEvent) => {
                touchEndX = e.changedTouches[0].clientX;
                handleSwipeBack(touchStartX, touchEndX);
            };

            document.addEventListener("touchstart", onTouchStart);
            document.addEventListener("touchend", onTouchEnd);

            onUnmounted(() => {
                if (window.Telegram?.WebApp) {
                    Telegram.WebApp.BackButton.hide();
                    Telegram.WebApp.BackButton.offClick(handleBackButton);
                }
                document.removeEventListener("touchstart", onTouchStart);
                document.removeEventListener("touchend", onTouchEnd);
            });
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

        const isMainPage = computed(() => {
            return route.path === mainRoutePath;
        });

        const { goBack, goHome }  = useNavigation();

        const openModal = () => {
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        return {
            showSplash,
            errorToast,
            goBack,
            goHome,
            isMainPage,
            showModal,
            openModal,
            closeModal
        };
    }
});