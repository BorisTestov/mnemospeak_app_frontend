<template>
  <div class="screen-wrapper">
    <div class="header">
      <button class="back-btn" @click="goBack">Назад</button>
    </div>

    <h2>Темы по грамматике</h2>
    <ul class="topic-list">
      <li v-for="topic in grammarTopics" :key="topic">
        <!-- На реальном проекте тут может быть кнопка/ссылка, ведущая к деталям темы -->
        <button class="topic-btn">{{ topic }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GrammarScreen",
  data() {
    return {
      grammarTopics: [
        "Глаголы",
        "Существительные",
        "Прилагательные",
        "Падежи",
        "Числительные",
        "Предлоги",
        "Местоимения",
        // ... до 20 тем
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: center;
}

.topic-list {
  list-style-type: none;
  padding: 0;
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.topic-list li:not(:last-child) {
  margin-bottom: 10px;
}

/* Since the button is width: 100%, you don't actually need flex on the li */
.topic-list li {
  align-items: center;
}

.topic-btn {
  width: 100%;
  text-align: center;
}
</style>
