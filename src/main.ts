import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from '@components/App/App.vue'
import router from '@/router'

import '@styles/variables.css'
import '@styles/fonts.css'
import '@styles/globals.css'
import '@styles/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import WebApp from '@types/telegram-web-app'

declare global {
    interface Window {
        Telegram: {
            WebApp: typeof WebApp
        }
    }
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
    .use(router)
    .use(pinia)

document.addEventListener('DOMContentLoaded', () => {
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
    }
    app.mount('#app')
})