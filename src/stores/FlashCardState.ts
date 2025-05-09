import { defineStore } from 'pinia'
import { Word } from '@utils/api_models'
import { useLevelStore } from '@stores/LanguageLevel'

interface LevelData {
    positions: Record<string, number>
    cards: Record<string, Word[]>
}

interface FlashCardState {
    category: string | null
    levels: Record<string, LevelData>
}

export const useFlashCardStore = defineStore('flashcard', {
    state: (): FlashCardState => ({
        category: null,
        levels: {}
    }),
    getters: {
        currentLevelData(): LevelData {
            const levelStore = useLevelStore()
            const level = levelStore.currentLevel
            if (!this.levels[level]) {
                this.levels[level] = {
                    positions: {},
                    cards: {}
                }
            }
            return this.levels[level]
        }
    },
    actions: {
        setCategory(category: string) {
            this.category = category
        },
        setPosition(category: string, position: number) {
            if (!this.currentLevelData.positions) {
                this.currentLevelData.positions = {}
            }
            this.currentLevelData.positions[category] = position
        },
        setCards(category: string, cards: Word[]) {
            if (!this.currentLevelData.cards) {
                this.currentLevelData.cards = {}
            }
            this.currentLevelData.cards[category] = cards
        },
        clearAll() {
            this.category = null
            this.levels = {}
        }
    },
    persist: true
})