<script setup>
import { useProjectStore } from '@/stores/project';
import { computed } from 'vue';

const projectStore = useProjectStore();
const pinnedProjects = computed(() => projectStore.projects.filter(p => p.status === 'pin'));
</script>

<template>
  <div v-if="pinnedProjects.length" class="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
    <NuxtLink
      v-for="project in pinnedProjects"
      :key="project.id"
      :to="`/projects/${project.id}`"
      class="flex-shrink-0 w-36 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm active:scale-95 transition-transform duration-150"
    >
      <span class="text-2xl">🌱</span>
      <div class="mt-3">
        <p class="text-white font-semibold text-sm leading-tight line-clamp-2">{{ project.projectName }}</p>
        <p class="text-emerald-200 text-xs mt-1">{{ project.duration }} months</p>
      </div>
    </NuxtLink>
  </div>
  <div v-else class="py-6 text-center">
    <p class="text-sm text-stone-400">No pinned projects yet</p>
    <p class="text-xs text-stone-300 mt-1">Pin a project to see it here</p>
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
