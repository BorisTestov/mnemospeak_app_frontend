import { useNavigation } from '@utils/navigation'

export default {
    name: "NounsScreen",
    setup() {
        const { goBack, goNounsCases }  = useNavigation();

        return {
            // grammarTopics: [
            //     "Глаголы", "Существительные", "Прилагательные",
            //     "Падежи", "Числительные", "Предлоги", "Местоимения",
            // ],
            // grammarTopics: [
            //     "Существительные",
            // ],
            goNounsCases,
            goBack
        }
    }
}