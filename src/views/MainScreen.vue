<template>
  <div class="screen-wrapper">
    <h1>Изучаем греческий язык</h1>
    <button @click="goNext">Далее</button>
  </div>
</template>

<script>
export default {
  name: "MainScreen",
  methods: {
    goNext() {
      // Переходим на выбор уровня
      this.$router.push({ name: 'Level' });
    }
  }
}
</script>

<style scoped>
/* Можно добавить локальные стили именно для MainScreen */
h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
</style>
