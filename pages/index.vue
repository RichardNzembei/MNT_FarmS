<template>
   <div class="app-container">
     <!-- Header with improved spacing -->
     <div class="header-container">
       <HomeHeader />
     </div>
     
     <!-- Main content with better scrolling behavior -->
     <main class="content-container">
       <!-- Project add section with subtle animation -->
       <div class="section-container" :class="{'animate-fade-up': isMounted}">
         <ProjectAdd />
       </div>
       
       <!-- Pinned projects with better visual hierarchy -->
       <div class="section-container mt-6" :class="{'animate-fade-up-delay': isMounted}">
         <AppPinned />
       </div>
     </main>
   </div>
 </template>
 
 <script setup>
 import { ref, onMounted } from 'vue'
 
 const isMounted = ref(false)
 
 onMounted(() => {
   isMounted.value = true
 })
 </script>
 
 <style>
 .app-container {
   @apply min-h-screen bg-gray-200 pb-20;
 }
 
 .header-container {
   @apply sticky top-0 z-10 px-4 pt-4 pb-2 bg-gradient-to-b from-white to-transparent;
 }
 
 .content-container {
   @apply px-4 pb-6;
 }
 
 .section-container {
   @apply mb-6;
 }
 
 /* Animation classes */
 .animate-fade-up {
   animation: fadeUp 0.6s ease-out forwards;
 }
 
 .animate-fade-up-delay {
   animation: fadeUp 0.6s ease-out 0.1s forwards;
 }
 
 @keyframes fadeUp {
   from {
     opacity: 0;
     transform: translateY(20px);
   }
   to {
     opacity: 1;
     transform: translateY(0);
   }
 }
 
 /* Improved transitions */
 .fade-enter-active,
 .fade-leave-active {
   transition: opacity 0.3s ease;
 }
 
 .fade-enter-from,
 .fade-leave-to {
   opacity: 0;
 }
 </style>