import { ref } from 'vue'
import { useLevelStore } from '@stores/LanguageLevel'
import { useNavigation } from '@/navigation'

export default {
    setup() {
        const { goBack }  = useNavigation();

        const levelStore = useLevelStore()
        const levels = ref<string[]>(["A1", "A2", "B1", "B2"])


        const chooseLevel = (level: string): void => {
            levelStore.setLevel(level)
            router.push({ name: 'Mode' })
        }

        return {
            levels,
            goBack,
            chooseLevel
        }
    }
}