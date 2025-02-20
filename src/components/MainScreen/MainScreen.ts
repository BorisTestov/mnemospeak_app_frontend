import { useRouter } from 'vue-router'

export default {
    name: "MainScreen",
    setup() {
        const router = useRouter()

        const goNext = (): void => {
            router.push({ name: 'Level' })
        }

        return {
            goNext
        }
    }
}