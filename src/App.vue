<template>
  <div class="app-container">
    <!-- Анимация переходов между роутами -->
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Общие стили приложения */
.app-container {
  background-color: #fff9db; /* Светло-жёлтый фон */
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Анимации при смене маршрутов */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Общие стили для кнопок */
button {
  display: inline-block;
  background-color: #fce070;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 8px 0;
  font-size: 1rem;
  font-weight: bold;
  transition: transform 0.2s, background-color 0.2s;
  width: 100%;
  max-width: 300px; /* чтобы на мобильном красиво */
}
button:hover {
  cursor: pointer;
  background-color: #fbe15a;
  transform: scale(1.02);
}
button:active {
  transform: scale(0.98);
}

/* Для удобства выравниваем контент по центру на мобильном */
.screen-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  max-width: 500px; /* Можно ограничить ширину, чтобы на планшетах/десктопе не растягивалось */
  margin: 0 auto;
}

/* Заголовки */
h1, h2, h3 {
  text-align: center;
}
</style>
