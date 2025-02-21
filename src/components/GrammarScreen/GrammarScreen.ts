import { useNavigation } from '@/navigation'

export default {
    name: "GrammarScreen",
    setup() {
        const { goBack }  = useNavigation();

        return {
            grammarTopics: [
                "Глаголы", "Существительные", "Прилагательные",
                "Падежи", "Числительные", "Предлоги", "Местоимения",
            ],
            goBack
        }
    }
}