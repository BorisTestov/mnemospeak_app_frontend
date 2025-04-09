import { useNavigation } from '@utils/navigation'

export default {
    name: "GrammarScreen",
    setup() {
        const { goBack, goTopic }  = useNavigation();

        return {
            goTopic,
            goBack
        }
    }
}