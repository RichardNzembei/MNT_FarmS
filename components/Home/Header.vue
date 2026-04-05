<template>
  <header class="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl shadow-lg px-5 py-4">
    <div class="flex justify-between items-center">
      <div class="min-w-0">
        <h1 class="text-xl font-bold text-white tracking-tight truncate">{{ farmName }}</h1>
        <p class="text-xs text-emerald-100 mt-0.5">Farm Management</p>
      </div>
      <div class="flex items-center gap-1">
        <button
          @click="showModal = true"
          class="relative p-2 rounded-full hover:bg-emerald-500 transition-colors"
          aria-label="Notifications"
        >
          <UIcon name="i-heroicons-bell" class="w-6 h-6 text-white" />
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
        </button>
        <button
          @click="handleLogout"
          class="p-2 rounded-full hover:bg-emerald-500 transition-colors"
          aria-label="Sign out"
        >
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-6 h-6 text-white" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" @click.self="showModal = false">
        <div class="bg-white rounded-2xl p-6 w-full max-w-xs text-center shadow-xl">
          <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <UIcon name="i-heroicons-bell" class="w-6 h-6 text-emerald-600" />
          </div>
          <h2 class="text-base font-semibold text-stone-800 mb-1">Notifications</h2>
          <p class="text-sm text-stone-500 mb-4">This feature is coming soon.</p>
          <button @click="showModal = false" class="w-full py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors">
            Got it
          </button>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const showModal = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const farmName = computed(() => authStore.user?.farmName || 'My Farm')

const handleLogout = () => {
  authStore.logout()
  router.push('/auth/login')
}
</script>
