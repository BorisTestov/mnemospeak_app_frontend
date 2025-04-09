import {createRouter, createWebHistory} from 'vue-router'

import MainScreen from '@components/MainScreen/MainScreen.vue'
import LevelScreen from '@components/LevelScreen/LevelScreen.vue'
import ModeScreen from '@components/ModeScreen/ModeScreen.vue'
import GrammarScreen from '@components/GrammarScreen/GrammarScreen.vue'
import VocabScreen from '@components/VocabScreen/VocabScreen.vue'
import QuizScreen from "@components/QuizScreen/QuizScreen.vue";
import StatisticsScreen from "@components/StatisticsScreen/StatisticsScreen.vue";
import FlashcardScreen from "@components/FlashcardScreen/FlashcardScreen.vue";
import NounsScreen from "@components/NounsScreen/NounsScreen.vue";
import LessonScreen from "@components/Lessons/Lessons.vue";
import LessonTests from "@components/LessonTestsScreen/LessonTests.vue";
// import Cases from "@/lessons/Nouns/Cases.vue";

const routes = [
    {path: '/', name: 'Home', component: MainScreen},
    {path: '/level', name: 'Level', component: LevelScreen},
    {path: '/mode', name: 'Mode', component: ModeScreen},
    {path: '/grammar', name: 'Grammar', component: GrammarScreen},
    {path: '/vocab', name: 'Vocab', component: VocabScreen},
    {path: '/quiz', name: 'Quiz', component: QuizScreen},
    {path: '/flashcards', name: 'Flashcards', component: FlashcardScreen},
    {path: '/statistics', name: 'Statistics', component: StatisticsScreen},
    {path: '/nouns', name: 'Nouns', component: NounsScreen},
    {path: '/lesson', name: 'Lesson', component: LessonScreen},
    {path: '/lessontests', name: 'LessonTests', component: LessonTests}
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
