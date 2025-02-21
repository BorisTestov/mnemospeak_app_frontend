import { useTelegramUserStore } from '@stores/TelegramUser'
import { useNavigation } from '@/navigation'


export default {
    name: "MainScreen",
    setup() {

        const { goNext, goStatistics } = useNavigation();

        const store = useTelegramUserStore();

        if (!store.isInitialized) {
            store.initializeFromTelegram()
        }

        const username: string = store.fullName ? ', ' + store.fullName : '';
        const imageUrl: string = store.user?.photo_url;
        const userId: number = store.user?.id;

        return {
            goNext,
            goStatistics,
            userId,
            username,
            imageUrl
        }
    }
}