<template>
  <div class="screen-wrapper">
    <div v-if="loading" class="loading">Loading lesson...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <HTMLLoader
        v-else
        :title="lessonTitle"
        :files="lessonFiles"
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
    const lessonId = computed(() => lessonStore.lesson_id)



    const handleLoaderError = (err) => {
      console.error('HTMLLoader error:', err);
      error.value = `Error loading content: ${err}`;
    };

    onMounted(async () => {
      try {
        loading.value = true;

        // No fallback data - show error if API fails
        let parts = [];

        try {
          console.log(`Fetching lesson parts for ID: ${lessonId.value}`);
          const data = await get(`/lessons/${lessonId.value}/parts`);
          console.log('API Response:', data);

          if (data && Array.isArray(data)) {
            parts = data;
          } else {
            console.warn('API response not in expected format');
            throw new Error('Invalid data format received from server');
          }
        } catch (apiErr) {
          console.error('API request failed:', apiErr);
          error.value = `Failed to load lesson data: ${apiErr.message || 'Unknown error'}`;
          loading.value = false;
          return; // Stop execution if API fails
        }

        // Show error if no parts found
        if (parts.length === 0) {
          error.value = 'No lesson parts found';
          loading.value = false;
          return;
        }

        // Extract lesson title from first part
        lessonTitle.value = parts[0]?.title || 'Lesson';

        // Get file paths
        const filePaths = parts
            .filter(part => Boolean(part.file_path)) // Only include parts with a file_path
            .sort((a, b) => a.order - b.order) // Sort ascending by order
            .map(part => ({
              lesson_id: part.lesson_id,
              order: part.order,
              id: part.id,
              file_path: part.file_path
            }));

        if (filePaths.length === 0) {
          error.value = 'No valid files found for this lesson';
        } else {
          lessonFiles.value = filePaths;
        }
      } catch (err) {
        console.error('Error in component setup:', err);
        error.value = `Component error: ${err.message || 'Unknown error'}`;
      } finally {
        loading.value = false;
      }
    });

    return {
      lessonTitle,
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