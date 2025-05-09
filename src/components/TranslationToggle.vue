<template>
  <div class="translation-container">
    <button class="translation-btn" @click="toggleTranslation">
      {{ isTranslationVisible ? 'Скрыть перевод' : 'Показать перевод' }}
      <div
          v-if="isTranslationVisible && autoHide"
          class="progress-bar"
          :style="{ animationDuration: `${timeout}ms` }"
      ></div>
    </button>
    <slot :showTranslation="isTranslationVisible"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'TranslationToggle',
  props: {
    timeout: {
      type: Number,
      default: 10000, // 10 seconds
    },
    autoHide: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const isTranslationVisible = ref(false);
    let timer: number | null = null;

    const toggleTranslation = () => {
      isTranslationVisible.value = !isTranslationVisible.value;
      if (props.autoHide && isTranslationVisible.value) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          isTranslationVisible.value = false;
        }, props.timeout) as unknown as number;
      }
    };

    watch(() => isTranslationVisible.value, (newValue) => {
      if (!newValue && timer) {
        clearTimeout(timer);
      }
    });

    return {
      isTranslationVisible,
      toggleTranslation,
    };
  },
});
</script>

<style scoped>
.translation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.translation-btn {
  padding: 0.5rem 1rem;
  background-color: var(--sky-blue);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: forestgreen;
  transform-origin: right;
  animation: shrink linear forwards;
}

@keyframes shrink {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>