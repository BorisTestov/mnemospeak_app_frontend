<template>
  <div class="screen-wrapper">
    <div v-if="loading" class="loading">Loading lesson...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <HTMLLoader
        v-else
        :title="lessonTitle"
        :data="lessonData"
        :has-tests="hasTests"
        @error="handleLoaderError"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, onActivated, computed} from 'vue';
import { useNavigation } from '@utils/navigation';
import HTMLLoader from '@components/HTMLLoader/HTMLLoader.vue';
import { get } from '@utils/api';
import {useLessonStore} from "@stores/LessonSettings";
import {get_lesson_by_id} from "@utils/api_calls";

export default defineComponent({
  name: "LessonScreen",
  components: {
    HTMLLoader
  },
  setup() {
    const lessonTitle = ref('');
    const lessonFiles = ref<string[]>([]);
    const loading = ref(true);
    const error = ref('');

    const lessonStore = useLessonStore()
    const hasTests = computed(() => lessonStore.has_tests)
    const lessonData = ref('');



    const handleLoaderError = (err) => {
      console.error('HTMLLoader error:', err);
      error.value = `Ошибка загрузки контента: ${err}`;
    };

    onMounted(async () => {
      try {
        loading.value = true;
        let parts = null;

        try {
          parts = await get_lesson_by_id();
          console.log(parts);
          if (parts.length === 0) {
            error.value = 'Части уроков не найдены';
          }
        } catch (err) {
          console.error("Error fetching lessons:", err)
        } finally {
          loading.value = false
        }
        // Extract lesson title from first part
        lessonTitle.value = parts[0]?.title || 'Lesson';
        lessonData.value = parts?.map(part => (part.content));


      } catch (err) {
        console.error('Error in component setup:', err);
        error.value = `Ошибка компонента: ${err.message || 'Неизвестная ошибка'}`;
      } finally {
        loading.value = false;
      }
    });

    return {
      lessonTitle,
      lessonData,
      lessonFiles,
      loading,
      error,
      handleLoaderError,
      hasTests
    };
  }
});
</script>

<style scoped>
.tests_button {
  max-width: 30%;
  position: absolute;
  top: 88dvh;
  font-size: 1rem;
}

.screen-wrapper {
  width: 100%;
  height: 100%;
}

.error {
  color: red;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 4px;
  margin: 1rem;
  background-color: rgba(255, 0, 0, 0.1);
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>