<template>
  <transition name="slide-down">
    <div v-if="isVisible" class="error-notification">
      <div class="error-content">
        <div class="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <span class="error-message">{{ message }}</span>
        <button @click="closeNotification" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ErrorNotification',
  props: {
    message: {
      type: String,
      default: 'Something is wrong. Reload page or contact developer.'
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    autoHideDuration: {
      type: Number,
      default: 5000
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    let timeout: number | null = null;

    watch(() => props.isVisible, (newValue) => {
      if (newValue && props.autoHideDuration > 0) {
        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = window.setTimeout(() => {
          emit('close');
        }, props.autoHideDuration);
      }
    });

    const closeNotification = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      emit('close');
    };

    return {
      closeNotification
    };
  }
});
</script>

<style scoped>
.error-notification {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 9999;
}

.error-content {
  display: flex;
  align-items: center;
  background-color: #fef2f2;
  border: 1px solid #f87171;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 24rem;
  width: calc(100% - 2rem);
}

.error-icon {
  color: #ef4444;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.error-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.error-message {
  flex-grow: 1;
}

.close-button {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 0;
}

.close-button svg {
  width: 1rem;
  height: 1rem;
}

.close-button:hover {
  color: #b91c1c;
}

/* Animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>

<!-- ErrorService.ts -->
<script lang="ts">
import { ref, readonly } from 'vue';

interface ErrorState {
  message: string;
  isVisible: boolean;
}

const errorState = ref<ErrorState>({
  message: '',
  isVisible: false
});

export const useErrorService = () => {
  const showError = (message: string, duration = 5000) => {
    errorState.value.message = message;
    errorState.value.isVisible = true;

    // Return a promise that resolves when the notification closes
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        hideError();
        resolve();
      }, duration);
    });
  };

  const hideError = () => {
    errorState.value.isVisible = false;
  };

  return {
    errorState: readonly(errorState),
    showError,
    hideError
  };
};

// Create a global event bus for errors
export const errorEventBus = {
  showError: (message: string) => {
    const event = new CustomEvent('show-error', { detail: { message } });
    window.dispatchEvent(event);
  }
};
</script>