import { useRouter } from 'vue-router'

export default {
    name: "VocabScreen",
    setup() {
        const router = useRouter()

        const goBack = (): void => {
            router.go(-1)
        }

        const goFlashcards = (): void => {
            alert("Переходим к флеш-картам (пока заглушка)!")
            // Здесь может быть переход на новый экран
            // router.push({ name: 'Flashcards' })
        }

        const goTests = (): void => {
            router.push({name: 'Quiz'})
        }

        const goStudyWords = (): void => {
            alert("Переходим к изучению слов (пока заглушка)!")
        }

        return {
            goBack,
            goFlashcards,
            goTests,
            goStudyWords
        }
    }
}