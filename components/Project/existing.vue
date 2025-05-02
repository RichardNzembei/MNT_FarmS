<script setup>
import { useProjectStore } from '@/stores/project';
import { onMounted, computed } from 'vue';

const projectStore = useProjectStore();


// Computed property to filter pinned projects
const pinnedProjects = computed(() =>
    projectStore.projects.filter(project => project.status === "pin")
);
</script>

<template>
  <div class="p-8 overflow-x-auto scroll-smooth">
    <div v-if="pinnedProjects.length" class="flex gap-8 w-max">
      <template v-for="project in pinnedProjects" :key="project.id">
        <NuxtLink :to="`/projects/${project.id}`">
          <div
            class="w-40 h-40 bg-gradient-to-br from-green-700 to-green-900 text-white border-2 border-green-800 rounded-2xl shadow-xl 
            flex flex-col justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-green-800 hover:to-green-950 
            transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in relative overflow-hidden"
          >
            <div class="absolute inset-0 bg-[url('/images/leaf-pattern.svg')] opacity-10"></div>
            <span class="text-4xl font-bold animate-float">🌱</span>
            <h1 class="mt-2 text-lg font-semibold">{{ project.projectName }}</h1>
            <p class="text-sm text-green-300">ongoing</p>
          </div>
        </NuxtLink>
      </template>
    </div>
    <div v-else class="text-center text-stone-600">
      <p class="text-lg font-semibold">No pinned projects found</p>
    </div>
  </div>
</template>
