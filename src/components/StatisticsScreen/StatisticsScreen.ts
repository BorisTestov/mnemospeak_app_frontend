import { useNavigation } from '@utils/navigation'

export default {
    name: "StatisticsScreen",
    setup() {
        const { goBack }  = useNavigation();

        return {
            goBack,
        }
    }
}