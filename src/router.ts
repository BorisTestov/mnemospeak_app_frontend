import {createRouter, createWebHistory} from 'vue-router'

import MainScreen from '@components/MainScreen/MainScreen.vue'
import LevelScreen from '@components/LevelScreen/LevelScreen.vue'
import ModeScreen from '@components/ModeScreen/ModeScreen.vue'
import GrammarScreen from '@components/GrammarScreen/GrammarScreen.vue'
import VocabScreen from '@components/VocabScreen/VocabScreen.vue'
import QuizScreen from "@components/QuizScreen/QuizScreen.vue";

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
