import { useNavigation } from '@/navigation'

export default {
    name: "VocabScreen",
    setup() {
        const { goBack }  = useNavigation();

        return {
            goBack,
        }
    }
}