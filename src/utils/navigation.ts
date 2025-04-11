import { useRouter } from 'vue-router'
import { useLevelStore } from '@stores/LanguageLevel'
import { useLessonStore } from '@stores/LessonSettings'

export function useNavigation() {
    const router = useRouter()
    const lessonStore = useLessonStore()

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

        goLesson: (lessonId: Number, hasTests: Boolean = false): void => {
            lessonStore.setLessonProps({
                lesson_id: Number(lessonId),
                has_tests: Boolean(hasTests)
            })
            router.push({name: 'Lesson'})
        },

        goLessonTests: (lessonId: Number): void => {
            router.push({name: 'LessonTests'})
        },

        goTopic: (topicId: string) => {
            router.push({ name: 'Topic', params: { topicId } })
        },

        goTest: () => {
            router.push({name: 'Test'})
        },

        chooseLevel: (level: string): void => {
            const levelStore = useLevelStore()
            levelStore.setLevel(level)
            router.push({ name: 'Mode' })
        }
    }
}