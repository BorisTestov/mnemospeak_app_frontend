<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLetterStore } from '@stores/LetterState'

const router = useRouter()
const letterStore = useLetterStore()

const selectLetterType = (type: 'official' | 'unofficial') => {
  letterStore.setLetterType(type)
  router.push('/letter-phrases')
}
</script>

<template>
  <div class="screen-wrapper">
    <h2 class="header">Выберите тип письма</h2>
    <div class="letter-types">
      <button @click="selectLetterType('official')">
        Официальное письмо
      </button>
      <button @click="selectLetterType('unofficial')">
        Письмо другу
      </button>
    </div>
  </div>
</template>

<style scoped>
.letter-types {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.letter-types button {
  width: 100%;
  padding: 1.5rem;
  font-size: 1.2rem;
  background-color: var(--sky-blue);
  border: 2px solid var(--light-blue);
  border-radius: 8px;
  cursor: pointer;
}

.letter-types button:hover {
  opacity: 0.9;
  transform: scale(0.98);
}
</style>