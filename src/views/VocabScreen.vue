<template>
  <div class="screen-wrapper">
    <div class="header">
      <h2>Режим лексики</h2>
    </div>

    <div class="vocab-modes">
      <button @click="goFlashcards">Флеш-карты</button>
      <button @click="goTests">Тесты</button>
      <button @click="goStudyWords">Изучение слов</button>
    </div>

    <!-- Кнопка "Назад" внизу и по центру -->
    <div class="bottom-bar">
      <button class="back-btn" @click="goBack">Назад</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "VocabScreen",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goFlashcards() {
      alert("Переходим к флеш-картам (пока заглушка)!");
      // Здесь может быть переход на новый экран
      // this.$router.push({ name: 'Flashcards' })
    },
    goTests() {
      this.$router.push({name: 'Quiz'});
    },
    goStudyWords() {
      alert("Переходим к изучению слов (пока заглушка)!");
    }
  }
}
</script>

<style scoped>
/* Основной контейнер */
.screen-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Кнопка "Назад" внизу */
  height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}

/* Заголовок */
.header {
  text-align: center;
  width: 100%;
}

/* Кнопки режимов */
.vocab-modes {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 300px;
}

/* Нижняя панель для кнопки "Назад" */
.bottom-bar {
  width: 100%;
  display: flex;
  justify-content: center; /* Центрируем кнопку */
  padding-bottom: 16px; /* Отступ от края экрана */
}

/* Кнопка "Назад" */
.back-btn {
  background-color: #fce070;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  transition: transform 0.2s, background-color 0.2s;
}

.back-btn:hover {
  cursor: pointer;
  background-color: #fbe15a;
  transform: scale(1.05);
}

.back-btn:active {
  transform: scale(0.98);
}
</style>