import { useNavigation } from '@utils/navigation'

export default {
    name: "VocabScreen",
    setup() {
        const { goBack }  = useNavigation();

        return {
            goBack,
        }
    }
}