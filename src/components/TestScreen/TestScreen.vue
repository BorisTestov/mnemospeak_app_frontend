<template>
  <div class="screen-wrapper">
    <!-- Quiz questions section -->
    <div v-if="currentQuestionIndex < currentTest.length" class="question-section">
      <transition name="fade" mode="out-in">
        <div :key="currentQuestionIndex" class="question-container">
          <h2 class="question-header">{{ currentQuestion.question }}</h2>
          <div class="answers-container">
            <button
                v-for="(answer, index) in currentQuestion.answers"
                :key="index"
                class="answer-button"
                :class="{
                'correct': showResults && answer.is_correct,
                'incorrect': showResults && selectedAnswerIndex === index && !answer.is_correct
              }"
                @click="handleAnswerClick(answer, index)"
                :disabled="showResults"
            >
              {{ answer.text }}
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Results section -->
    <div v-else class="results-section">
      <div class="results-container">
        <h2 class="results-header">Результаты</h2>
        <p class="results-text">
          Вы правильно ответили на {{ testsStore.correctAnswersCount }} вопросов из {{ currentTest.length }}
          ({{ calculatePercentage() }}%)
        </p>
        <button class="back-button" @click="goBack">Вернуться к списку тестов</button>
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
  padding: 2rem;
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

.answer-button {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  width: 100%;
  text-align: center;
}

.answer-button:hover:not(:disabled) {
  background-color: #f0f0f0;
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
</style>