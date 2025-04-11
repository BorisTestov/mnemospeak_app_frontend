import {defineStore} from "pinia";

interface TestsData {
    testsData: Object | null
    currentTestIndex: Number | null
    correctAnswers: Number
}

export const useTestsDataStore = defineStore('testsdata', {
    state: (): TestsData => ({
        testsData: null,
        currentTestIndex: null,
        correctAnswers: 0
    }),
    getters: {
        data: (state) => state.testsData,
        currentIndex: (state) => state.currentTestIndex,
        correctAnswersCount: (state) => state.correctAnswers
    },
    actions: {
        setTests(tests: Object) {
            this.testsData = tests;
        },
        setTestIndex(id: Number) {
            this.currentTestIndex = id;
        },
        setCorrectAnswers(cnt: Number) {
            this.correctAnswers = cnt;
        },
        incrementCorrectAnswers() {
            this.correctAnswers += 1;
        },
        reset() {
            this.testsData = null;
            this.currentTestIndex = null;
            this.correctAnswers = 0;
        }
    },
    persist: true
})