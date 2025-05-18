import { defineStore } from 'pinia'

interface LevelData {
    positions: Record<string, number>
    phrases: Record<string, string[]>
}

interface LetterState {
    letterType: 'official' | 'unofficial' | null
    category: string | null
    levels: Record<string, LevelData>
}

export const useLetterStore = defineStore('letter', {
    state: (): LetterState => ({
        letterType: null,
        category: null,
        levels: {}
    }),
    actions: {
        setLetterType(type: 'official' | 'unofficial') {
            this.letterType = type
        },
        setCategory(category: string) {
            this.category = category
        },
        setPosition(category: string, position: number) {
            const level = this.letterType
            if (!level) return

            if (!this.levels[level]) {
                this.levels[level] = {
                    positions: {},
                    phrases: {}
                }
            }
            this.levels[level].positions[category] = position
        },
        setPhrases(category: string, phrases: string[]) {
            const level = this.letterType
            if (!level) return

            if (!this.levels[level]) {
                this.levels[level] = {
                    positions: {},
                    phrases: {}
                }
            }
            this.levels[level].phrases[category] = phrases
        },
        clearAll() {
            this.category = null
            this.levels = {}
        },
        clear() {
            this.category = null
            this.letterType = null
            for (const level in this.levels) {
                if (this.levels.hasOwnProperty(level)) {
                    this.levels[level].positions = {}
                    this.levels[level].phrases = {}
                }
            }
        }
    },
    persist: true
})