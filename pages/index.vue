<template>
  <div class="min-h-screen bg-stone-100 pb-8">
    <div class="px-4 pt-4 pb-2">
      <HomeHeader />
    </div>
    <main class="px-4 pt-2 space-y-4">
      <div :class="{ 'animate-fade-up': isMounted }">
        <ProjectAdd />
      </div>
      <div :class="{ 'animate-fade-up-delay': isMounted }">
        <AppPinned />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({ middleware: 'auth' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })
</script>

<style>
.animate-fade-up {
  animation: fadeUp 0.5s ease-out forwards;
}
.animate-fade-up-delay {
  animation: fadeUp 0.5s ease-out 0.08s both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
