import { useRouter } from 'vue-router'
import { useLevelStore } from '@stores/LanguageLevel'

export function useNavigation() {
    const router = useRouter()

    return {
        goBack: (): void => {
            router.back()
        },

        goHome: (): void => {
            router.push({ name: 'Home' })
        },

        goTests: (): void => {
            router.push({name: 'Quiz'})
        },

        goStudyWords: (): void => {
            alert("Переходим к изучению слов (пока заглушка)!")
        },

        goGrammar: (): void => {
            router.push({ name: "Grammar" })
        },

        goVocab: (): void => {
            router.push({ name: "Vocab" })
        },

        goNext: (): void => {
            router.push({ name: 'Level' })
        },

        goStatistics: (): void => {
            router.push({name: 'Statistics'})
        },

        goFlashcards: (): void => {
            router.push({ name: 'Flashcards' })
        },

        goNouns: (): void => {
            router.push({ name: 'Nouns' })
        },

        goNounsCases: (): void => {
            router.push({ name: 'NounsCases' })
        },

        chooseLevel: (level: string): void => {
            const levelStore = useLevelStore()
            levelStore.setLevel(level)
            router.push({ name: 'Mode' })
        }
    }
}