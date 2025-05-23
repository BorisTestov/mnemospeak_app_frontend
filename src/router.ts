import {createRouter, createWebHistory} from 'vue-router'

import MainScreen from '@components/MainScreen/MainScreen.vue'
import LevelScreen from '@components/LevelScreen/LevelScreen.vue'
import ModeScreen from '@components/ModeScreen/ModeScreen.vue'
import GrammarScreen from '@components/GrammarScreen/GrammarScreen.vue'
import VocabScreen from '@components/VocabScreen/VocabScreen.vue'
import QuizScreen from "@components/QuizScreen/QuizScreen.vue";
import StatisticsScreen from "@components/StatisticsScreen/StatisticsScreen.vue";
import PhrasesScreen from "@components/PhrasesScreen/PhrasesScreen.vue";
import UsefulWordsScreen from "@components/UsefulWordsScreen/UsefulWordsScreen.vue";
import FlashcardScreen from "@components/FlashcardScreen/FlashcardScreen.vue";
import LessonScreen from "@components/Lessons/Lessons.vue";
import LessonTests from "@components/LessonTestsScreen/LessonTests.vue";
import Test from "@components/TestScreen/TestScreen.vue";
import FlashCardModeScreen from "./components/FlashCardModeScreen.vue";
import LetterTypeScreen from "./components/LetterTypeScreen.vue";
import LetterPhrases from "./components/LetterPhrases.vue";
import LetterPhrasesFlashcards from "./components/LetterPhrasesFlashcards.vue";

const routes = [
    {path: '/', name: 'Home', component: MainScreen},
    {path: '/level', name: 'Level', component: LevelScreen},
    {path: '/mode', name: 'Mode', component: ModeScreen},
    {path: '/grammar', name: 'Grammar', component: GrammarScreen},
    {path: '/vocab', name: 'Vocab', component: VocabScreen},
    {path: '/quiz', name: 'Quiz', component: QuizScreen},
    {path: '/flashcards', name: 'Flashcards', component: FlashcardScreen},
    {path: '/phrases', name: 'Phrases', component: PhrasesScreen},
    {path: '/usefulwords', name: 'UsefulWords', component: UsefulWordsScreen},
    {path: '/statistics', name: 'Statistics', component: StatisticsScreen},
    {path: '/lesson', name: 'Lesson', component: LessonScreen},
    {path: '/lessontests', name: 'LessonTests', component: LessonTests},
    {path: '/test', name: 'Test', component: Test},
    {path: '/flashcardsmodes', name: 'FlashcardsModes', component: FlashCardModeScreen},
    {path: '/lettertypes', name: 'LetterType', component: LetterTypeScreen},
    {path: '/letter-phrases', name: 'LetterPhrases', component: LetterPhrases},
    {path: '/letter-phrases-flashcards', name: 'LetterPhrasesFlashcards', component: LetterPhrasesFlashcards},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// In your router/index.js
router.beforeEach((to, from, next) => {
    console.log(`Route navigation: ${from.path} -> ${to.path}. Component: ${to.name} loaded.`);
    next();
});

router.afterEach((to, from) => {
    console.log(`Route navigation completed: ${to.path}`);
});

router.onError((error) => {
    console.error('Router error:', error);
    // If you have an error toast component
    if (window.showErrorToast) {
        window.showErrorToast(`Routing error: ${error.message}`);
    }
});

export default router
