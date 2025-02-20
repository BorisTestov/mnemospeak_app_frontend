import { defineStore } from 'pinia'

interface LevelState {
    selectedLevel: string | null
}

export const useLevelStore = defineStore('level', {
    state: (): LevelState => ({
        selectedLevel: null
    }),
    getters: {
        currentLevel: (state) => state.selectedLevel || 'Не выбран'
    },
    actions: {
        setLevel(level: string) {
            this.selectedLevel = level
        }
    },
    persist: true
})