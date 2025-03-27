import { useNavigation } from '@utils/navigation'

export default {
    name: "GrammarScreen",
    setup() {
        const { goBack, goNouns }  = useNavigation();

        return {
            // grammarTopics: [
            //     "Глаголы", "Существительные", "Прилагательные",
            //     "Падежи", "Числительные", "Предлоги", "Местоимения",
            // ],
            // grammarTopics: [
            //     "Существительные",
            // ],
            goNouns,
            goBack
        }
    }
}