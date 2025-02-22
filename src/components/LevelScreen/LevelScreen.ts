import { useNavigation } from '@utils/navigation'
import {LEVELS} from '@utils/config.ts'

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