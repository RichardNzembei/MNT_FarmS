<script setup>
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/project';

const projectStore = useProjectStore();
onMounted(() => { projectStore.fetchProjects(); });
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm p-4">
    <div class="flex justify-between items-center mb-3">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-bookmark-solid" class="w-4 h-4 text-emerald-600" />
        <h2 class="text-sm font-semibold text-stone-800">Pinned Projects</h2>
      </div>
      <NuxtLink to="/existingproject" class="text-xs text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-700">
        View All
        <UIcon name="i-heroicons-chevron-right" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>
    <ProjectExisting />
  </div>
</template>
