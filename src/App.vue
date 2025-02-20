<template>
  <div class="app-container">
    <template v-if="showSplash">
      <SplashScreen
          imagePath="/splash.png"
          :duration="1000"
          @splash-complete="showSplash = false"
      />
    </template>

    <template v-else>
      <!-- Header Image -->
      <img src="/header.png" alt="Header" class="header-image" />

      <!-- Main Content -->
      <div class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

      <!-- Footer Image -->
      <img src="/footer.png" alt="Footer" class="footer-image" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import SplashScreen from '@components/SplashScreen/SplashScreen.vue';
import { useTelegramUserStore } from '@stores/telegramUser';

export default defineComponent({
  name: "App",
  components: {
    SplashScreen
  },
  setup() {
    const route = useRoute();
    const telegramStore = useTelegramUserStore();
    const showSplash = ref(false);
    const firstLoad = ref(true);

    // Show splash only on main route, first load, and from Telegram
    onMounted(() => {
      const mainRoutePath = '/'; // Change this to your main route path
      const isTelegramUser = telegramStore.initializeFromTelegram();

      if (route.path === mainRoutePath && firstLoad.value && isTelegramUser) {
        showSplash.value = true;
        firstLoad.value = false;
        localStorage.setItem('appLastVisit', new Date().toString());
      }
    });

    // Watch route changes
    watch(() => route.path, (newPath) => {
      const mainRoutePath = '/'; // Change this to your main route path

      // Only show splash on main route, page reload, and from Telegram
      if (newPath === mainRoutePath && isPageReload() && telegramStore.isAuthenticated) {
        showSplash.value = true;
        localStorage.setItem('appLastVisit', new Date().toString());
      }
    });

    // Helper to detect page reload vs navigation
    const isPageReload = () => {
      // Use session storage instead of timing logic
      const hasVisitedThisSession = sessionStorage.getItem('appVisitedThisSession');
      if (!hasVisitedThisSession) {
        sessionStorage.setItem('appVisitedThisSession', 'true');
        return true;
      }
      return false;
    };

    return {
      showSplash
    };
  }
});
</script>

<style>
.app-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.header-image, .footer-image {
  position: fixed;
  width: 100%; /* Full width */
  height: 10vh; /* Fixed height at 10% of viewport */
  object-fit: full; /* Scale to cover full width while maintaining aspect ratio */
  z-index: 1; /* Higher than background, lower than content */
  left: 0;
}

.header-image {
  top: 0;
}

.footer-image {
  bottom: 0;
}

.main-content {
  position: relative;
  z-index: 2; /* Higher than header/footer images */
  padding: 10vh 20px; /* Top/bottom padding equal to header/footer height */
  min-height: 80vh; /* Main content takes at least 80% of viewport height */
}

/* Existing transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>