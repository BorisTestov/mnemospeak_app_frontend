import { useRouter } from 'vue-router'

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

        return {
            goBack,
            goGrammar,
            goVocab
        }
    }
}