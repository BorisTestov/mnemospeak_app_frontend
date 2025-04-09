<template>
  <div class="screen-wrapper">
    <h2 class="header">{{ topicData.heading }}</h2>

    <div class="container overflowed-container">
      <button
          v-for="button in topicData.buttons"
          :key="button.id"
          class="topic-btn"
          @click="handleButtonClick(button)">
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavigation } from '@utils/navigation'
import topicsConfig from '@/config/topics'

export default defineComponent({
  name: "TopicScreen",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const navigation = useNavigation();
    const topicId = computed(() => route.params.topicId as string);

    // Get topic data based on the route parameter
    const topicData = computed(() => {
      const topic = topicsConfig[topicId.value];
      if (!topic) {
        // Handle invalid topic ID
        router.push('/'); // Redirect to home or show error
      }
      return topic || { heading: 'Topic Not Found', buttons: [] };
    });

    const handleButtonClick = (button) => {
      if (button.type === 'lesson') {
        navigation.goLesson(button.lessonId, button.hasTests);
      } else if (button.type === 'navigation') {
        // Handle navigation to another topic screen
        router.push({ name: 'Topic', params: { topicId: button.target } });
      } else if (button.action && typeof navigation[button.action] === 'function') {
        // Call any navigation function dynamically
        navigation[button.action](...(button.params || []));
      }
    };

    return {
      topicData,
      handleButtonClick
    }
  }
})
</script>

<style scoped>
/* Same styles as in your original component */
.screen-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
}

.overflowed-container {
  align-items: center;
  min-width: 1dvh;
  max-height: 60dvh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

@media (pointer: coarse) and (hover: none) and (orientation: landscape) {
  /* Your responsive styles */
  .screen-wrapper {
    height: 100dvh;
    display: grid;
    grid-template-areas: "header buttons";
    grid-template-columns: 35% 65%;
    grid-template-rows: 100%;
    justify-items: center;
    align-items: center;
    overflow: hidden;
  }

  .header {
    grid-area: header;
    align-self: center;
    padding-bottom: 32px;
  }

  .container {
    grid-area: buttons;
    margin: 0;
    padding: 16px;
    height: 100%;
    max-height: 100dvh;
  }

  .overflowed-container {
    min-width: 60vw;
    margin-right: 0;
    padding-right: 16px;
    padding-bottom: 32px;
    height: calc(100% - 32px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>