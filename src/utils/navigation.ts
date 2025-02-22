import { useRouter } from 'vue-router'
import { useLevelStore } from '@stores/LanguageLevel'

export function useNavigation() {
    const router = useRouter()

    return {
        goBack: (): void => {
            router.back()
        },

        goFlashcards: (): void => {
            alert("Переходим к флеш-картам (пока заглушка)!")
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

        chooseLevel: (level: string): void => {
            const levelStore = useLevelStore()
            levelStore.setLevel(level)
            router.push({ name: 'Mode' })
        }
    }
}