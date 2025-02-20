<template>
  <div class="splash-container" v-if="visible">
    <transition name="fade-in" appear>
      <div v-if="showContent" class="splash-screen">
        <img :src="imagePath" alt="Splash Screen" class="splash-image" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'SplashScreen',
  props: {
    imagePath: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  emits: ['splash-complete'],
  setup(props, { emit }) {
    const visible = ref(true);
    const showContent = ref(true);

    onMounted(() => {
      setTimeout(() => {
        // Start fade-out
        showContent.value = false;

        // Remove container after fade completes
        setTimeout(() => {
          visible.value = false;
          emit('splash-complete');
        }, 800);
      }, props.duration);
    });

    return {
      visible,
      showContent
    };
  }
});
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 9999;
}

.splash-image {
  max-width: 80%;
  max-height: 80%;
}

.splash-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

/* Enhanced fade transitions */
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.5s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
</style>