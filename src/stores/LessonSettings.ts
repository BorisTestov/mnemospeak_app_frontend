import {defineStore} from "pinia";

interface LessonState {
    lesson_id: number | null
    has_tests: boolean
}

export const useLessonStore = defineStore('lesson', {
    state: (): LessonState => ({
        lesson_id: null,
        has_tests: false
    }),
    actions: {
        setLessonProps(props: { lesson_id: number, has_tests: boolean }) {
            this.lesson_id = props.lesson_id
            this.has_tests = props.has_tests
        }
    },
    persist: true
})