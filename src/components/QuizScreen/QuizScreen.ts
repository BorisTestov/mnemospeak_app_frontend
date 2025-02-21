import { ref, computed, onMounted } from 'vue'
import { useNavigation } from '@/navigation'

import { useTelegramUserStore } from '@stores/TelegramUser'
import { useLevelStore } from '@stores/LanguageLevel'

interface Question {
    id: number
    text: string
    options: Array<{
        id: number
        text: string
        is_correct: boolean
    }>
    total: number
    answered: number
}

export default {
    name: "QuizScreen",
    setup() {
        const telegramUserStore = useTelegramUserStore()
        const currentQuestion = ref<Question | null>(null)
        const selectedAnswerIndex = ref<number | null>(null)
        const isAnswered = ref(false)
        const total = ref(0)
        const answered = ref(0)
        const isFinished = ref(false)

        const progressPercent = computed((): number => {
            return total.value ? (answered.value / total.value) * 100 : 0
        })

        const webAppStatus = computed((): string => {
            if (window.Telegram?.WebApp) {
                return "Подключен"
            }
            return "Не подключен"
        })

        const debugInfo = computed((): string => {
            return debugData.value ? JSON.stringify(debugData.value, null, 2) : "Нет данных"
        })

        const fetchQuestion = async (): Promise<void> => {
            if (!telegramUserStore.isInitialized) {
                telegramUserStore.initializeFromTelegram()
            }

            const levelStore = useLevelStore();
            const currentLevel = levelStore.currentLevel;

            const payload = {
                user_id: telegramUserStore.user?.id,
                level: currentLevel
            }

            try {
                const response = await fetch("https://stantion.ru.tuna.am/api/get_questions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                })
                if (!response.ok) {
                    throw new Error("Ошибка загрузки вопроса")
                }
                const data = await response.json() as Question
                if (data.answered >= data.total) {
                    isFinished.value = true
                    currentQuestion.value = null
                } else {
                    currentQuestion.value = data
                    total.value = data.total
                    answered.value = data.answered
                    selectedAnswerIndex.value = null
                    isAnswered.value = false
                }
            } catch (error) {
                console.error("Ошибка:", error)
            }
        }

        const getAnswerClass = (index: number): string => {
            if (!isAnswered.value || !currentQuestion.value) return ""
            return currentQuestion.value.options[index].is_correct
                ? "correct"
                : index === selectedAnswerIndex.value
                    ? "wrong"
                    : ""
        }

        const selectAnswer = (index: number): void => {
            if (isAnswered.value) return
            selectedAnswerIndex.value = index
            isAnswered.value = true
            setTimeout(() => {
                nextQuestion()
            }, 1000)
        }

        const nextQuestion = (): void => {
            if (isFinished.value) return
            fetchQuestion()
        }

        const { goBack }  = useNavigation();

        onMounted(() => {
            window.Telegram?.WebApp?.ready()
            telegramUserStore.initializeFromTelegram()
            fetchQuestion()
        })

        return {
            currentQuestion,
            selectedAnswerIndex,
            isAnswered,
            total,
            answered,
            isFinished,
            progressPercent,
            webAppStatus,
            debugInfo,
            fetchQuestion,
            getAnswerClass,
            selectAnswer,
            nextQuestion,
            goBack,
            telegramUserStore
        }
    }
}