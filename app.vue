<script setup lang="ts">
import { NuxtPage } from '#components';
import { useHead } from 'nuxt/app';

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
</script>

<template>
    <NuxtPage />
</template>
