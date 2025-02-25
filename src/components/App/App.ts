import { defineComponent, ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNavigation } from '@utils/navigation'
import { useTelegramUserStore } from '@stores/TelegramUser';
import SplashScreen from '@components/SplashScreen/SplashScreen.vue';
import ErrorToast from '@components/ErrorNotification/ErrorNotification.vue';
import Modal from '@components/SettingsModal/SettingsModal.vue';
import BackendStatus from '@components/BackendStatus/BackendStatus.vue';


export default defineComponent({
    name: "App",
    components: {
        SplashScreen,
        ErrorToast,
        Modal,
        BackendStatus
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

        // const handleOrientationChange = () => {
        //     // Force layout recalculation
        //     window.Telegram.WebApp.expand();
        //
        //     // Optional: Force a small delay before re-rendering
        //     setTimeout(() => {
        //         // If using Vue 3 ref:
        //         nextTick(() => {
        //             // Your re-render logic if needed
        //         });
        //     }, 50);
        // };

        const handleOrientationChange = () => {
            // Reset zoom
            const viewport = document.querySelector('meta[name=viewport]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }

            // Ensure WebApp is expanded properly
            window.Telegram.WebApp.expand();

            // Force layout recalculation
            setTimeout(() => {
                window.Telegram.WebApp.expand();
            }, 100);
        };

        // const handleSwipeBack = (touchStartX: number, touchStartY: number, touchEndX: number, touchEndY: number) => {
        //     const angle = window.screen.orientation?.angle || window.orientation || 0;
        //     const isLandscape = angle === 90 || angle === -90;

            // if (isLandscape) {
            //     if (touchEndY < touchStartY - 50) {
            //         handleBackButton();
            //     }
            // } else {
            //     if (touchEndX > touchStartX + 50) {
            //         handleBackButton();
            //     }
            // }
        // };

        onMounted(() => {
            const isTelegramUser = telegramStore.initializeFromTelegram();

            if (route.path === mainRoutePath && firstLoad.value && isTelegramUser) {
                showSplash.value = true;
                firstLoad.value = false;
            }

            // if (window.Telegram?.WebApp) {
            //     Telegram.WebApp.BackButton.show();
            //     Telegram.WebApp.BackButton.onClick(handleBackButton);
            // }

            // let touchStartX = 0;
            // let touchStartY = 0;
            // let touchEndX = 0;
            // let touchEndY = 0;
            //
            // const onTouchStart = (e: TouchEvent) => {
            //     touchStartX = e.touches[0].clientX;
            //     touchStartY = e.touches[0].clientY;
            // };
            //
            // const onTouchEnd = (e: TouchEvent) => {
            //     touchEndX = e.changedTouches[0].clientX;
            //     touchEndY = e.changedTouches[0].clientY;
            //     handleSwipeBack(touchStartX, touchStartY, touchEndX, touchEndY);
            // };
            //
            // document.addEventListener("touchstart", onTouchStart);
            // document.addEventListener("touchend", onTouchEnd);
            window.addEventListener('orientationchange', handleOrientationChange);



        });

        onUnmounted(() => {
            if (window.Telegram?.WebApp) {
                Telegram.WebApp.BackButton.hide();
                Telegram.WebApp.BackButton.offClick(handleBackButton);
            }
            document.removeEventListener("touchstart", onTouchStart);
            document.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener('orientationchange', handleOrientationChange);
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