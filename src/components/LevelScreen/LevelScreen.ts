import { ref } from 'vue'

import { useNavigation } from '@/navigation'

export default {
    setup() {
        const { goBack, chooseLevel }  = useNavigation();


        const levels = ref<string[]>(["A1", "A2", "B1", "B2"])

        return {
            levels,
            goBack,
            chooseLevel
        }
    }
}