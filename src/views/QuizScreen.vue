<template>
  <div class="quiz-screen">
    <!-- Отладочный блок: выводим статус WebApp и данные пользователя -->
    <div class="debug" v-if="devMode">
      <p><strong>Telegram WebApp:</strong> {{ webAppStatus }}</p>
      <p v-if="userId"><strong>User ID:</strong> {{ userId }}</p>
      <pre v-if="debugInfo">Debug Data: {{ debugInfo }}</pre>
    </div>

    <!-- Полоса прогресса (отображается, если заданы total и answered) -->
    <div class="progress-container" v-if="total > 0">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <p class="progress-text">
        {{ answered }}/{{ total }}
      </p>
    </div>

    <!-- Контент квиза -->
    <div class="quiz-card" v-if="currentQuestion">
      <h2 class="question">{{ currentQuestion.question }}</h2>
      <p class="question-translation">{{ currentQuestion.question_translated }}</p>
      <div class="answers">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          class="answer-btn"
          :class="getAnswerClass(index)"
          @click="selectAnswer(index)"
          :disabled="isAnswered"
        >
          {{ option.text }} ({{ option.text_translate }})
        </button>
      </div>
    </div>

    <!-- Если вопросов больше нет -->
    <div class="loading" v-else>
      <p v-if="isFinished">Вы ответили на все вопросы!</p>
      <p v-else>Загрузка вопроса...</p>
    </div>

    <!-- Нижняя панель с кнопками -->
    <footer class="bottom-bar">
      <div class="button-container">
        <button class="back-btn" @click="goBack">Назад</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "QuizScreen",
  data() {
    return {
      currentQuestion: null,    // объект текущего вопроса
      selectedAnswerIndex: null,  // выбранный вариант ответа
      isAnswered: false,          // отвечено ли на вопрос
      total: 0,                   // общее количество вопросов
      answered: 0,                // количество отвеченных вопросов
      userId: null,               // telegram user_id
      isFinished: false,          // все вопросы отвечены
      devMode: true,              // режим отладки, можно выключить после тестирования
      debugData: null,            // для сохранения данных Telegram WebApp
    };
  },
  computed: {
    progressPercent() {
      return this.total ? (this.answered / this.total) * 100 : 0;
    },
    webAppStatus() {
      if (window.Telegram && window.Telegram.WebApp) {
        return "Подключен";
      }
      return "Не подключен";
    },
    debugInfo() {
      // Если имеются данные из Telegram, выводим их в отладочном блоке
      return this.debugData ? JSON.stringify(this.debugData, null, 2) : "Нет данных";
    },
  },
  methods: {
    async fetchQuestion() {
      // Получаем user_id из данных Telegram Web Apps (если они доступны)
      if (!this.userId && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        this.debugData = window.Telegram.WebApp.initDataUnsafe;
        if (user) {
          this.userId = user.id;
          console.log("Telegram user_id:", this.userId);
        } else {
          console.warn("Нет данных о пользователе в Telegram WebApp");
        }
      }

      // Формируем JSON для отправки в теле запроса
      const payload = {
        user_id: this.userId,
        level: "A1"  // Пока жестко закодировано
      };

      try {
        const response = await fetch("https://stantion.ru.tuna.am/api/get_questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error("Ошибка загрузки вопроса");
        }
        const data = await response.json();
        // Если все вопросы отвечены, устанавливаем флаг завершения и очищаем currentQuestion
        if (data.answered >= data.total) {
          this.isFinished = true;
          this.currentQuestion = null;
        } else {
          this.currentQuestion = data;
          this.total = data.total;
          this.answered = data.answered;
          // Сброс состояния ответа
          this.selectedAnswerIndex = null;
          this.isAnswered = false;
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    },
    getAnswerClass(index) {
      if (!this.isAnswered) return "";
      return this.currentQuestion.options[index].is_correct
        ? "correct"
        : index === this.selectedAnswerIndex
        ? "wrong"
        : "";
    },
    selectAnswer(index) {
      if (this.isAnswered) return;
      this.selectedAnswerIndex = index;
      this.isAnswered = true;
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    },
    nextQuestion() {
      if (this.isFinished) return;
      this.fetchQuestion();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    // Вызываем Telegram.WebApp.ready(), если ещё не вызвано (на всякий случай)
    if (window.Telegram && window.Telegram.WebApp && typeof window.Telegram.WebApp.ready === "function") {
      window.Telegram.WebApp.ready();
    }
    this.fetchQuestion();
  },
};
</script>

<style scoped>
/* Общий контейнер */
.quiz-screen {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 16px;
  box-sizing: border-box;
}

/* Отладочный блок */
.debug {
  background-color: #e0e0e0;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  font-size: 0.9rem;
}

/* Полоса прогресса */
.progress-container {
  text-align: center;
  margin-bottom: 16px;
}

.progress-bar {
  width: 80vw;
  height: 12px;
  margin: 0 auto;
  background-color: #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #90caf9;
  transition: width 0.5s;
}

.progress-text {
  margin-top: 8px;
  font-size: 0.9rem;
}

/* Карточка квиза */
.quiz-card {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}

.question {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.question-translation {
  font-size: 1rem;
  color: #555;
  margin-bottom: 16px;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 320px;
  width: 100%;
}

.answer-btn {
  width: 100%;
  background-color: #fce070;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  transition: transform 0.2s, background-color 0.2s;
}

.answer-btn:hover {
  cursor: pointer;
  transform: scale(1.02);
}

.answer-btn.correct {
  background-color: #a7e9af;
}

.answer-btn.wrong {
  background-color: #f4a9a8;
}

/* Нижняя панель */
.bottom-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

/* Контейнер кнопок */
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Кнопка "Назад" */
.back-btn {
  background-color: #fce070;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.2s;
}

.back-btn:hover {
  background-color: #fbe15a;
  transform: scale(1.02);
}
</style>
