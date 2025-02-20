import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLevelStore } from '@stores/LanguageLevel'

export default {
    setup() {
        const router = useRouter()
        const levelStore = useLevelStore()
        const levels = ref<string[]>(["A1", "A2", "B1", "B2"])

        const goBack = (): void => {
            router.go(-1)
        }

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