import { useNavigation } from '@/navigation'
import {LEVELS} from '@/config.ts'

export default {
    setup() {
        const { goBack, chooseLevel }  = useNavigation();

        return {
            levels: LEVELS,
            goBack,
            chooseLevel
        }
    }
}