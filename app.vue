<script setup lang="ts">
import { NuxtPage } from '#components';
import { useProjectStore } from '@/stores/project';
import { useHead } from 'nuxt/app';
import { onMounted,ref } from 'vue';

const projectStore = useProjectStore();
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.json' }
  ]
});

if (process.client && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

onMounted(async () => {
  await projectStore.fetchProjects();
});
</script>

<template>
    <NuxtPage />
</template>
