import { ref, computed, onMounted } from 'vue'
import { useNavigation } from '@utils/navigation'
import { post } from '@utils/api';
import { useTelegramUserStore } from '@stores/TelegramUser'
import { useLevelStore } from '@stores/LanguageLevel'
import { Question } from '@utils/api_models'


export default {
    name: "QuizScreen",
    setup() {
        const telegramUserStore = useTelegramUserStore()
        const questionData = ref<Question | null>(null)
        const selectedAnswerIndex = ref<number | null>(null)
        const isAnswered = ref(false)
        const total = ref(0)
        const answered = ref(0)
        const isFinished = ref(false)


        const progressPercent = computed((): number => {
            return total.value ? (answered.value / total.value) * 100 : 0
        })

        const fetchQuestion = async () => {
            if (!telegramUserStore.isInitialized) {
                telegramUserStore.initializeFromTelegram();
            }

            const levelStore = useLevelStore();
            const payload = {
                user_id: telegramUserStore.user?.id,
                level: levelStore.currentLevel
            };

            try {
                questionData.value = await post<Question>('/get_questions', payload);
            } catch (err) {
                console.error("Error:", err);
            } finally {
            }
        };

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
            fetchQuestion()
        })

        return {
            questionData,
            selectedAnswerIndex,
            isAnswered,
            total,
            answered,
            isFinished,
            progressPercent,
            fetchQuestion,
            getAnswerClass,
            selectAnswer,
            nextQuestion,
            goBack
        }
    }
}