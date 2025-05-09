<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFlashCardStore } from '@stores/FlashCardState'
import { ref } from 'vue'

const router = useRouter()
const flashCardStore = useFlashCardStore()
const showConfirmation = ref(false)

const themes = [
  { id: 'food', name: 'Еда' },
  { id: 'time', name: 'Время' },
  { id: 'actions', name: 'Действия' },
  { id: 'family', name: 'Семья' },
  { id: 'adverbs', name: 'Наречия' },
  { id: 'adjectives', name: 'Прилагательные' }
]

const selectCategory = (category: string) => {
  flashCardStore.setCategory(category)
  router.push('/flashcards')
}

const clearState = () => {
  showConfirmation.value = true
}

const confirmClear = () => {
  flashCardStore.clearAll()
  showConfirmation.value = false
}
</script>

<template>
  <div class="screen-wrapper">
    <div class="content-area">
      <button
          class="general-button"
          @click="selectCategory('general')"
      >
        Все флешкарты
      </button>

      <div class="themes-grid">
        <button
            v-for="theme in themes"
            :key="theme.id"
            class="theme-button"
            @click="selectCategory(theme.id)"
        >
          {{ theme.name }}
        </button>
      </div>

      <button
          class="clear-button"
          @click="clearState"
      >
        Сбросить прогресс
      </button>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showConfirmation" class="confirmation-overlay">
      <div class="confirmation-dialog">
        <p>Вы уверены, что хотите сбросить весь прогресс?</p>
        <div class="confirmation-buttons">
          <button @click="confirmClear">Да</button>
          <button @click="showConfirmation = false">Нет</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen-wrapper {
  width: 100%;
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.general-button {
  width: 100%;
  padding: 1.5rem;
  font-size: 1.2rem;
  background-color: var(--light-yellow);
  border: 2px solid var(--yellow);
  border-radius: 8px;
  cursor: pointer;
}

.themes-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
}

.theme-button {
  width: calc(50% - 0.3rem);
  padding: 1.2rem;
  font-size: 1.1rem;
  background-color: var(--sky-blue);
  border: 2px solid var(--light-blue);
  border-radius: 8px;
  cursor: pointer;
  text-wrap: wrap;
  white-space: normal;
  height: 14dvh;
  word-wrap: break-word;
}

button:hover {
  opacity: 0.9;
  transform: scale(0.98);
}

.clear-button {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  background-color: #ff6b6b;
  border: 2px solid #ff5252;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmation-dialog {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  max-width: 80%;
}

.confirmation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.confirmation-buttons button {
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.confirmation-buttons button:first-child {
  background-color: #ff6b6b;
  border: 1px solid #ff5252;
  color: white;
}

.confirmation-buttons button:last-child {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}
</style>