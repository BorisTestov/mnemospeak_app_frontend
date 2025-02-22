import { defineStore } from 'pinia'

interface UserSettings {
    showTranslation: boolean
}

export const useUserSettingsStore = defineStore('userSettings', {
    state: (): UserSettings => ({
        showTranslation: false
    }),

    persist: {
        key: 'user-settings',
        storage: localStorage,
    }
})