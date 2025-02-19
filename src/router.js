import {createRouter, createWebHistory} from 'vue-router'

// Импортируем экраны
import MainScreen from './views/MainScreen.vue'
import LevelScreen from './views/LevelScreen.vue'
import ModeScreen from './views/ModeScreen.vue'
import GrammarScreen from './views/GrammarScreen.vue'
import VocabScreen from './views/VocabScreen.vue'
import QuizScreen from "@/views/QuizScreen.vue";

const routes = [
    {path: '/', name: 'Home', component: MainScreen},
    {path: '/level', name: 'Level', component: LevelScreen},
    {path: '/mode', name: 'Mode', component: ModeScreen},
    {path: '/grammar', name: 'Grammar', component: GrammarScreen},
    {path: '/vocab', name: 'Vocab', component: VocabScreen},
    {path: '/quiz', name: 'Quiz', component: QuizScreen},

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
