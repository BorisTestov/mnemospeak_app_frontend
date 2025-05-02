import { ref, computed, onMounted, nextTick, watch} from 'vue'
import { useNavigation } from '@utils/navigation'
import { Word } from '@utils/api_models'
import {get_flashcard_phrases} from "../../utils/api_calls";

export default {
    name: "PhrasesScreen",
    setup() {
        const { goBack } = useNavigation()

        const cards = ref<Word[]>([])
        const currentIndex = ref(0)
        const isFlipped = ref(false)
        const loading = ref(true)

        const currentCard = computed(() => {
            if (cards.value.length === 0) return null
            return cards.value[currentIndex.value]
        })

        const fetchCards = async () => {
            loading.value = true
            isFlipped.value = false

            try {
                cards.value = await get_flashcard_phrases()
                currentIndex.value = 0
                cards.value = shuffleCards(cards.value)
            } catch (err) {
                console.error("Error fetching flashcards:", err)
            } finally {
                loading.value = false
            }
        }

        const flipCard = () => {
            if (!loading.value) {
                isFlipped.value = !isFlipped.value
            }
        }

        const nextCard = () => {
            if (isFlipped.value === true)
            {
                flipCard();
                setTimeout(() => {
                    if (currentIndex.value < cards.value.length - 1 && !loading.value) {
                        currentIndex.value++
                        isFlipped.value = false
                    }
                    adjustFontSize();
                }, 500);
            }
            else
            {
                if (currentIndex.value < cards.value.length - 1 && !loading.value) {
                    currentIndex.value++
                    isFlipped.value = false
                }
                adjustFontSize();
            }
        }

        const prevCard = () => {
            if (isFlipped.value === true)
            {
                flipCard();
                setTimeout(() => {
                    if (currentIndex.value > 0 && !loading.value) {
                        currentIndex.value--
                        isFlipped.value = false
                    }
                    adjustFontSize();
                }, 500);
            }
            else
            {
                if (currentIndex.value > 0 && !loading.value) {
                    currentIndex.value--
                    isFlipped.value = false
                }
                adjustFontSize();
            }
        }

        const shuffleCards = (cardArray: Word[]) => {
            if (!cardArray.length) return cardArray

            // Fisher-Yates shuffle algorithm
            const shuffled = [...cardArray]
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            }

            return shuffled
        }

        const adjustFontSize = () => {
            nextTick(() => {
                const element = document.querySelector('.flashcard-front .word') as HTMLElement;
                if (!element) return;

                // Start with the largest font size
                element.classList.remove('size-medium', 'size-small', 'size-x-small');
                element.classList.add('size-large');

                const parent = element.parentElement;
                if (!parent) return;

                const parentWidth = parent.clientWidth;
                const parentHeight = parent.clientHeight;

                // First, check if the text fits with the largest font size
                if (element.scrollWidth > parentWidth * 0.9 || element.scrollHeight > parentHeight * 0.4) {
                    // Try medium size
                    element.classList.remove('size-large');
                    element.classList.add('size-medium');

                    if (element.scrollWidth > parentWidth * 0.9 || element.scrollHeight > parentHeight * 0.4) {
                        // Try small size
                        element.classList.remove('size-medium');
                        element.classList.add('size-small');

                        if (element.scrollWidth > parentWidth * 0.9 || element.scrollHeight > parentHeight * 0.4) {
                            // Finally try x-small
                            element.classList.remove('size-small');
                            element.classList.add('size-x-small');
                        }
                    }
                }
            });
        };

        // // Watch for changes to the current word or card index
        // watch(() => currentCard.value?.word, () => {
        //     if (!loading.value) {
        //         nextTick(() => {
        //             adjustFontSize();
        //         });
        //     }
        // });
        //
        // // Also adjust after loading is complete
        // watch(() => loading.value, (newValue) => {
        //     if (!newValue) {
        //         nextTick(() => {
        //             adjustFontSize();
        //         });
        //     }
        // });


        onMounted(() => {
            fetchCards()
        })


        return {
            cards,
            currentIndex,
            currentCard,
            isFlipped,
            loading,
            fetchCards,
            flipCard,
            nextCard,
            prevCard,
            shuffleCards,
            goBack
        }
    }
}