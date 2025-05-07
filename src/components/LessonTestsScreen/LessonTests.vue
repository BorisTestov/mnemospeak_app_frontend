<template>
  <div class="screen-wrapper">
    <div v-if="loading" class="loading">Loading tests...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="content-area overflowed-container">
      <div class="tests-container">
      <button
          v-for="(test, index) in tests"
          :key="index"
          @click="handleButtonClick(index)"
          class="test-button"
      >
        {{ index === 0 ? 'Общий тест' : `Тест ${index}` }}
      </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavigation } from '@utils/navigation'
import {useLessonStore} from "@stores/LessonSettings";
import {useTestsDataStore} from "@stores/TestsData";
import topicsConfig from '@/config/topics'
import {get} from "@utils/api";
import {get_tests_by_lesson_id} from "@utils/api_calls.ts";

export default defineComponent({
  name: "LessonTestsScreen",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { goTest }  = useNavigation();
    const lessonStore = useLessonStore()
    const testsStore = useTestsDataStore();
    const loading = ref(true);
    const error = ref('');

    const lessonId = computed(() => lessonStore.lesson_id)

    let tests = ref(null);

    const handleLoaderError = (err) => {
      console.error('HTMLLoader error:', err);
      error.value = `Error loading content: ${err}`;
    };

    onMounted(async () => {
      try {
        loading.value = true;
        try {
          const data = await get_tests_by_lesson_id();
          testsStore.setTests(data);
          tests.value = data;
        } catch (apiErr) {
          console.error('API request failed:', apiErr);
          error.value = `Failed to load lesson data: ${apiErr.message || 'Unknown error'}`;
          loading.value = false;
          return; // Stop execution if API fails
        }
      } catch (err) {
        console.error('Error in component setup:', err);
        error.value = `Component error: ${err.message || 'Unknown error'}`;
      } finally {
        loading.value = false;
      }
    });

    const handleButtonClick = (index) => {
      testsStore.setTestIndex(index);
      goTest();

    };

    return {
      tests,
      handleButtonClick,
      loading,
      error
    }
  }
})
</script>

<style scoped>
.content-area {
  min-height: 50vh;
  padding: 1rem;
  width: 100%;
  background-color: rgba(0,0,0,0);
}


.navigation {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background-color: rgba(0,0,0,0);
}


.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  width: 95%;
  margin: max(2dvh, 10px) 0;
}

.screen-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.overflowed-container {
  align-items: center;
  min-width: 1dvh;
  max-height: 60dvh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.tests-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
</style>