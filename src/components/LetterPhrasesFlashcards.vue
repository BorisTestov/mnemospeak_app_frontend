<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch} from 'vue'
import { useNavigation } from '@utils/navigation'
import { Word } from '@utils/api_models'
import { get } from '@utils/api'
import { useLetterStore } from '@stores/LetterState'
import { useLevelStore } from '@stores/LanguageLevel'

const { goBack } = useNavigation()
const cards = ref<Word[]>([])
const currentIndex = ref(0)
const isFlipped = ref(false)
const loading = ref(true)
const letterStore = useLetterStore()
const levelStore = useLevelStore()
const category = computed(() => letterStore.category)
const letterType = computed(() => letterStore.letterType)

const currentCard = computed(() => {
  if (cards.value.length === 0) return null
  return cards.value[currentIndex.value]
})

const fetchCards = async () => {
  loading.value = true
  isFlipped.value = false

  try {
    // Check if we have cached phrases for current level and category
    const level = letterStore.letterType
    if (level && letterStore.levels[level]?.phrases[category.value]) {
      cards.value = letterStore.levels[level].phrases[category.value].map(phrase => ({
        word: phrase,
        translation: phrase
      }))
      currentIndex.value = letterStore.levels[level].positions[category.value] || 0
    } else {
      const response = await get(
          `/letterphrases/?level=${levelStore.currentLevel}&letter_type=${letterType.value}&category=${category.value}`
      ) as Word[]
      cards.value = shuffleCards(response)
      if (level) {
        letterStore.setPhrases(category.value, cards.value.map(card => card.word))
      }
      currentIndex.value = 0
    }
  } catch (err) {
    console.error("Error fetching letter phrases:", err)
  } finally {
    loading.value = false
  }
}

watch(currentIndex, (newIndex) => {
  if (letterStore.letterType && category.value) {
    letterStore.setPosition(category.value, newIndex)
  }
})

const flipCard = () => {
  if (!loading.value) {
    isFlipped.value = !isFlipped.value
  }
}

const nextCard = () => {
  if (isFlipped.value === true) {
    flipCard()
    setTimeout(() => {
      if (currentIndex.value < cards.value.length - 1 && !loading.value) {
        currentIndex.value++
        isFlipped.value = false
      }
      adjustFontSize()
    }, 500)
  } else {
    if (currentIndex.value < cards.value.length - 1 && !loading.value) {
      currentIndex.value++
      isFlipped.value = false
    }
    adjustFontSize()
  }
}

const prevCard = () => {
  if (isFlipped.value === true) {
    flipCard()
    setTimeout(() => {
      if (currentIndex.value > 0 && !loading.value) {
        currentIndex.value--
        isFlipped.value = false
      }
      adjustFontSize()
    }, 500)
  } else {
    if (currentIndex.value > 0 && !loading.value) {
      currentIndex.value--
      isFlipped.value = false
    }
    adjustFontSize()
  }
}

const shuffleCards = (cardArray: Word[]) => {
  if (!cardArray.length) return cardArray
  const shuffled = [...cardArray]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const adjustFontSize = () => {
  nextTick(() => {
    const element = document.querySelector('.flashcard-front .word') as HTMLElement
    if (!element) return

    element.classList.remove('size-medium', 'size-small', 'size-x-small')
    element.classList.add('size-large')

    const parent = element.parentElement
    if (!parent) return

    const parentWidth = parent.clientWidth
    const parentHeight = parent.clientHeight

    if (element.scrollWidth > parentWidth * 0.9 || element.scrollHeight > parentHeight * 0.4) {
      element.classList.remove('size-large')
      element.classList.add('size-medium')

      if (element.scrollWidth > parentWidth * 0.9 || element.scrollHeight > parentHeight * 0.4) {
        element.classList.remove('size-medium')
        element.classList.add('size-small')

        if (element.scrollWidth > parentWidth * 0.9 || element.scrollHeight > parentHeight * 0.4) {
          element.classList.remove('size-small')
          element.classList.add('size-x-small')
        }
      }
    }
  })
}

onMounted(() => {
  fetchCards()
})

onUnmounted(() => {
  if (letterStore.letterType && category.value) {
    letterStore.setPosition(category.value, currentIndex.value)
  }
})
</script>

<template>
  <div class="screen-wrapper">
    <h2 class="header">Фразы для письма</h2>
    <div class="flashcard-container">
      <div
          class="flashcard"
          :class="{ flipped: isFlipped, loading: loading }"
          @click="flipCard"
      >
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div v-if="loading" class="rolling-animation-container">
              <img src="/loader.png" class="rolling-image" alt="Загрузка..." />
            </div>
            <template v-else>
              <p class="word">{{ currentCard?.word || 'Загрузка...' }}</p>
              <p class="card-info">{{ currentIndex + 1 }} / {{ cards.length }}</p>
            </template>
          </div>
          <div class="flashcard-back">
            <div v-if="loading" class="rolling-animation-container">
              <img src="/loader.png" class="rolling-image" alt="Загрузка..." />
            </div>
            <template v-else>
              <p class="translation">{{ currentCard?.translation || 'Загрузка...' }}</p>
              <p class="card-info">{{ currentIndex + 1 }} / {{ cards.length }}</p>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button class="nav-arrow prev-arrow" @click="prevCard" :disabled="loading || currentIndex === 0">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="nav-arrow next-arrow" @click="nextCard" :disabled="loading || currentIndex === cards.length - 1">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.flashcard-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: min(70vh, auto);
  margin-top: auto;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20vh;
  width: 100%;
}

.flashcard {
  width: 75vw;
  height: 45vh;
  max-width: 300px;
  background-color: var(--background-color);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.2s;
}

.flashcard:active {
  transform: translateY(0) scale(0.98);
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 16px;
  background-color: var(--light-yellow);
  border: 3px solid var(--yellow);
  overflow: hidden;
}

.flashcard-back {
  transform: rotateY(180deg);
  background-color: var(--sky-blue);
  border-color: var(--light-blue);
}

.word, .translation {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  text-shadow: var(--outline);
  hyphens: auto;
  max-width: 100%;
}

.word.size-large { font-size: 1.8rem; }
.word.size-medium { font-size: 1.5rem; }
.word.size-small { font-size: 1.2rem; }
.word.size-x-small { font-size: 1rem; }

.translation {
  color: var(--dark-blue);
}

.card-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.8rem;
  opacity: 0.7;
  margin: 0;
}

.nav-arrow {
  background-color: var(--light-yellow);
  border: none;
  border-radius: 50%;
  aspect-ratio: 1/1;
  width: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-shadow: var(--outline);
}

.nav-arrow:active:not(:disabled) {
  transform: scale(0.95);
}

.nav-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow i {
  font-size: 1.2rem;
}

.rolling-animation-container {
  width: 80px;
  height: 80px;
}

.rolling-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: roll 2s infinite linear;
}

@keyframes roll {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (pointer: coarse) and (hover: none) and (orientation: landscape) {
  .screen-wrapper {
    height: 100dvh;
    display: grid;
    grid-template-areas:
      "header"
      "flashcard"
      "controls";
    grid-template-rows: 10% 80% 10%;
    justify-items: center;
    align-items: center;
    overflow: hidden;
  }

  .header {
    grid-area: header;
    align-self: center;
    padding-bottom: 5vh;
  }

  .flashcard-container {
    grid-area: flashcard;
    margin: 0;
    height: 100%;
    max-height: 100vh;
    gap: 16px;
  }

  .button-container {
    grid-area: controls;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20vh;
    width: 100%;
    position: relative;
    bottom: 50vh;
  }

  .flashcard {
    height: 60vh;
  }
}
</style>