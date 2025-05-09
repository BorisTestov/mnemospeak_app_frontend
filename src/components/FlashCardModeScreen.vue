<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFlashCardStore } from '@stores/FlashCardState'

const router = useRouter()
const flashCardStore = useFlashCardStore()

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
  gap: 1rem;
}

.theme-button {
  width: calc(50% - 0.6rem);
  padding: 1.2rem;
  font-size: 1.1rem;
  background-color: var(--sky-blue);
  border: 2px solid var(--light-blue);
  border-radius: 8px;
  cursor: pointer;
  text-wrap: wrap;
  white-space: normal;
  height: 15dvh;
  word-wrap: break-word;
}

button:hover {
  opacity: 0.9;
  transform: scale(0.98);
}
</style>