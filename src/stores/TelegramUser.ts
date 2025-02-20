// stores/telegramUser.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface TelegramUser {
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    photo_url?: string
}

export const useTelegramUserStore = defineStore('telegramUser', () => {
    // State
    const user = ref<TelegramUser | null>(null)
    const isInitialized = ref(false)

    // Getters
    const fullName = computed(() => {
        if (!user.value) return ''
        return user.value.last_name
            ? `${user.value.first_name} ${user.value.last_name}`
            : user.value.first_name
    })

    const isAuthenticated = computed(() => !!user.value)

    // Actions
    function initializeFromTelegram() {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            const tgUser = window.Telegram.WebApp.initDataUnsafe.user as TelegramUser
            user.value = tgUser
            isInitialized.value = true
            return true
        }
        return false
    }

    function reset() {
        user.value = null
        isInitialized.value = false
    }

    return {
        // State
        user,
        isInitialized,

        // Getters
        fullName,
        isAuthenticated,

        // Actions
        initializeFromTelegram,
        reset
    }
})