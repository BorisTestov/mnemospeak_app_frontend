import { useRouter } from 'vue-router'
import { useLevelStore } from '@stores/LanguageLevel'

export default {
    name: "ModeScreen",
    setup() {
        const router = useRouter()

        const goBack = (): void => {
            router.go(-1)
        }

        const goGrammar = (): void => {
            router.push({ name: "Grammar" })
        }

        const goVocab = (): void => {
            router.push({ name: "Vocab" })
        }

        const levelStore = useLevelStore();
        const currentLevel = levelStore.currentLevel;


        return {
            goBack,
            goGrammar,
            goVocab,
            currentLevel
        }
    }
}