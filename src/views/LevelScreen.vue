<template>
  <div class="screen-wrapper">
    <h2>Выберите уровень:</h2>

    <div class="levels-container">
      <button v-for="level in levels" :key="level"
              class="circle-btn"
              @click="chooseLevel(level)">
        {{ level }}
      </button>
    </div>

    <!-- Кнопка "Назад" теперь снизу -->
    <button class="back-btn" @click="goBack">Назад</button>
  </div>
</template>

<script>
export default {
  name: "LevelScreen",
  data() {
    return {
      levels: ["A1", "A2", "B1", "B2"] // Можете поменять на свои уровни
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    chooseLevel(level) {
      this.$router.push({ name: 'Mode' }); // Переход на экран выбора режима
    }
  }
}
</script>

<style scoped>
/* Весь экран */
.screen-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Распределяет элементы по вертикали */
  padding: 24px;
  height: 100vh; /* Задаём высоту экрана для позиционирования */
  box-sizing: border-box;
}

/* Заголовок */
h2 {
  margin-bottom: 2rem;
}

/* Круглые кнопки под уровни */
.levels-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Кнопки уровней */
.circle-btn {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Кнопка "Назад" внизу */
.back-btn {
  background-color: #fce070;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin-top: auto; /* Отправляет кнопку вниз */
  margin-bottom: 16px; /* Отступ от нижнего края */
  transition: transform 0.2s, background-color 0.2s;
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
