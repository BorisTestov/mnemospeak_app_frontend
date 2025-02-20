import { useLevelStore } from '@stores/LanguageLevel'
import { useRouter } from 'vue-router'

export default {
    name: "GrammarScreen",
    setup() {
        const router = useRouter()

        const goBack = () => {
            router.go(-1)
        }

        return {
            grammarTopics: [
                "Глаголы", "Существительные", "Прилагательные",
                "Падежи", "Числительные", "Предлоги", "Местоимения",
            ],
            goBack
        }
    }
}