import { useRouter } from 'vue-router'
import { useTelegramUserStore } from '@stores/TelegramUser'

export default {
    name: "MainScreen",
    setup() {
        const router = useRouter()

        const goNext = (): void => {
            router.push({ name: 'Level' })
        }

        const store = useTelegramUserStore();

        if (!store.isInitialized) {
            store.initializeFromTelegram()
        }

        const username: string = store.fullName ? ', ' + store.fullName : '';
        const imageUrl: string = store.user?.photo_url;
        const userId: number = store.user?.id;

        return {
            goNext,
            userId,
            username,
            imageUrl
        }
    }
}