<template>
  <div class="screen-wrapper">
    <!-- Quiz questions section -->
    <h2 class="question-header" v-if="currentQuestionIndex < currentTest.length">{{ currentQuestion.question.text }}</h2>
    <h2 class="results-header" v-else>Результаты</h2>
    <div class="content-area overflowed-container">
    <div v-if="currentQuestionIndex < currentTest.length" class="question-section">
      <transition name="fade" mode="out-in">
        <div :key="currentQuestionIndex" class="buttons-container">
<!--          <div class="answers-container">-->
            <button
                v-for="(answer, index) in currentQuestion.answers"
                :key="index"
                class="button answer-button"
                :class="{
                'correct': showResults && answer.is_correct,
                'incorrect': showResults && selectedAnswerIndex === index && !answer.is_correct
              }"
                @click="handleAnswerClick(answer, index)"
                :disabled="showResults"
            >
              {{ answer.text }}
            </button>
<!--          </div>-->
        </div>
      </transition>
    </div>
    <!-- Results section -->
    <div v-else class="results-section">
      <div class="results-container">

        <p class="results-text">
          Вы правильно ответили на {{ testsStore.correctAnswersCount }} вопросов из {{ currentTest.length }}
          ({{ calculatePercentage() }}%)
        </p>
        <button class="back-button" @click="goBack">Вернуться к списку тестов</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useTestsDataStore } from '@stores/TestsData';
import {useNavigation} from "@utils/navigation";

const router = useRouter();
const testsStore = useTestsDataStore();

// State
const currentQuestionIndex = ref(0);
const showResults = ref(false);
const selectedAnswerIndex = ref(null);

const {goBack} = useNavigation();

// Reset correct answers on component mount
onMounted(() => {
  testsStore.setCorrectAnswers(0);
});

// Computed properties
const currentTest = computed(() => {
  if (!testsStore.data || testsStore.currentIndex === null) {
    return [];
  }
  return testsStore.data[testsStore.currentIndex];
});

const currentQuestion = computed(() => {
  if (currentTest.value.length === 0 || currentQuestionIndex.value >= currentTest.value.length) {
    return null;
  }
  return currentTest.value[currentQuestionIndex.value];
});


// Methods
const handleAnswerClick = (answer, index) => {
  selectedAnswerIndex.value = index;
  showResults.value = true;
  console.log(currentQuestion.answers);

  if (answer.is_correct) {
    testsStore.incrementCorrectAnswers();
  }

  // Wait for animation to complete before moving to next question
  setTimeout(() => {
    moveToNextQuestion();
  }, 1500);
};

const moveToNextQuestion = () => {
  showResults.value = false;
  selectedAnswerIndex.value = null;

  // Move to next question or show results if done
  if (currentQuestionIndex.value < currentTest.value.length - 1) {
    nextTick(() => {
      currentQuestionIndex.value++;
    });
  } else {
    currentQuestionIndex.value = currentTest.value.length; // This will trigger showing results
  }
};

const calculatePercentage = () => {
  if (currentTest.value.length === 0) return "0.00";
  const percentage = (testsStore.correctAnswersCount / currentTest.value.length) * 100;
  return percentage.toFixed(2);
};

</script>

<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

.question-section, .results-section {
  width: 100%;
  max-width: 600px;
}

.question-container, .results-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: max(1dvw, 5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.question-header, .results-header {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
  text-shadow: none;
}

.answers-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}


.answer-button.correct {
  background-color: rgba(76, 175, 80, 0.3);
  border-color: #4CAF50;
  animation: pulse-green 1s;
}

.answer-button.incorrect {
  background-color: rgba(244, 67, 54, 0.3);
  border-color: #F44336;
  animation: pulse-red 1s;
}

.results-text {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.back-button {
  display: block;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #388E3C;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.content-area {
  min-height: 50vh;
  //padding: 1rem;
  width: 100%;
  background-color: rgba(0,0,0,0);
}

button {
  width: 100%;
  margin: max(2dvh, 10px) 0;
}

.screen-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.overflowed-container {
  align-items: center;
  min-width: 1dvh;
  max-height: 60dvh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}


@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

@keyframes pulse-red {
  0% {
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(244, 67, 54, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0);
  }
}

@media (pointer: coarse) and (hover: none) and (orientation: landscape) {
  .content-area {
    flex-grow: 1;
  }

  h2 {
    flex-grow: 0;
    max-width: 30dvw;
  }

  .screen-wrapper {
    flex-direction: row;
  }

  .buttons-container {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto auto;
    grid-auto-flow: row;
    gap: 10px;
  }

  .answer-button {
    margin: 0;
  }
}
</style>