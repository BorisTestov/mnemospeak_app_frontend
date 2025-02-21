import { useNavigation } from '@/navigation'
import {levels} from '@/config.ts'

export default {
    setup() {
        const { goBack, chooseLevel }  = useNavigation();

        return {
            levels,
            goBack,
            chooseLevel
        }
    }
}