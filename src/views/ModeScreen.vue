<template>
  <div class="screen-wrapper">
    <h2>Выберите режим:</h2>

    <div class="modes">
      <button class="mode-btn" @click="goGrammar">
        <i class="fas fa-book"></i> Грамматика
      </button>
      <button class="mode-btn" @click="goVocab">
        <i class="fas fa-language"></i> Лексика
      </button>
    </div>

    <!-- Кнопка "Назад" -->
    <button class="back-btn" @click="goBack">Назад</button>
  </div>
</template>

<script>
export default {
  name: "ModeScreen",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goGrammar() {
      this.$router.push({ name: "Grammar" });
    },
    goVocab() {
      this.$router.push({ name: "Vocab" });
    },
  },
};
</script>

<style scoped>
/* Общий стиль экрана */
.screen-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Распределяем элементы */
  padding: 8px;
  height: 625px; /* Фиксированная высота для небольших экранов */
  box-sizing: border-box;
}

/* Заголовок */
h2 {
  margin: 0;
  font-size: 1.8rem;
  text-align: center;
  padding-top: 8px;
}

/* Кнопки режимов */
.modes {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px; /* Расстояние между кнопками */
  width: 100%;
}

.mode-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #fce070;
  border: none;
  border-radius: 16px;
  padding: 24px 32px; /* Крупные кнопки */
  font-size: 1.5rem; /* Увеличенный размер текста */
  font-weight: bold;
  text-align: center;
  width: 90%; /* Почти на всю ширину экрана */
  max-width: 400px; /* Ограничение ширины */
  transition: transform 0.2s, background-color 0.2s;
}

.mode-btn i {
  font-size: 2rem; /* Увеличенный размер иконок */
}

.mode-btn:hover {
  cursor: pointer;
  background-color: #fbe15a;
  transform: scale(1.02);
}

.mode-btn:active {
  transform: scale(0.98);
}

/* Кнопка "Назад" */
.back-btn {
  background-color: #fce070;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  width: 80%; /* Достаточно большая, но меньше кнопок "Грамматика" и "Лексика" */
  max-width: 300px;
  transition: transform 0.2s, background-color 0.2s;
  margin-bottom: 8px; /* Небольшой отступ от нижнего края */
}

.back-btn:hover {
  cursor: pointer;
  background-color: #fbe15a;
  transform: scale(1.02);
}

.back-btn:active {
  transform: scale(0.98);
}
</style>
