<template>
  <header class="app-header">
    <div class="header-content">
      <div class="branding">
        <h1 class="app-title">Reuben's Farms</h1>
        <p class="app-tagline">One Blood, One Piece!</p>
      </div>

      <div class="notification-badge">
        <UButton icon="i-heroicons-bell" size="xl" variant="ghost" color="white" class="bell-icon"
          @click="handleNotificationClick" />
        <span class="badge-count">{{ count }}</span>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
        <h2 class="text-lg font-bold mb-2">Notifications</h2>
        <p class="text-gray-600">This feature is under development 🚧</p>
        <button @click="showModal = false" class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Close
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const count = 4
const showModal = ref(false)

const handleNotificationClick = () => {
  showModal.value = true
}
</script>

<style scoped>
.app-header {
  @apply bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-md p-4 mb-4;
}

.header-content {
  @apply flex justify-between items-center;
}

.branding {
  @apply space-y-1;
}

.app-title {
  @apply text-2xl font-bold text-white;
}

.app-tagline {
  @apply text-sm font-medium text-green-100;
}

.notification-badge {
  @apply relative flex items-center;
}

.bell-icon {
  @apply text-white hover:text-green-200 transition-colors;
}

.badge-count {
  @apply absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-pulse;
}

@keyframes subtle-pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: subtle-pulse 2s infinite;
}
</style>
