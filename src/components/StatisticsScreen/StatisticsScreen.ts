import { useRouter } from 'vue-router'

export default {
    name: "VocabScreen",
    setup() {
        const router = useRouter()

        const goBack = (): void => {
            router.go(-1)
        }

        return {
            goBack
        }
    }
}