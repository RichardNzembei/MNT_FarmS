<template>
    <div class="action-cards">
      <NuxtLink 
        to="/addproject" 
        class="action-card new-project"
        prefetch
      >
        <div class="card-content">
          <div class="card-icon">
            <UIcon name="i-heroicons-plus-circle" class="icon" />
          </div>
          <h3 class="card-title">New Project</h3>
          <p class="card-description">Start a new farming project</p>
        </div>
      </NuxtLink>
  
      <NuxtLink 
        to="/existingproject" 
        class="action-card existing-projects"
        prefetch
      >
        <div class="card-content">
          <div class="card-icon">
            <UIcon name="i-heroicons-folder-open" class="icon" />
          </div>
          <h3 class="card-title">My Projects</h3>
          <p class="card-description">View existing projects</p>
        </div>
      </NuxtLink>
    </div>
  </template>
  
  <style scoped>
  .action-cards {
    @apply grid grid-cols-2 gap-4;
  }
  
  .action-card {
    @apply h-40 rounded-xl shadow-sm flex flex-col justify-center items-center 
           transition-all duration-300 cursor-pointer overflow-hidden relative;
  }
  
  .new-project {
    @apply bg-gradient-to-br from-green-500 to-green-600 text-white;
  }
  
  .existing-projects {
    @apply bg-white border border-gray-200 text-gray-800 hover:border-green-300;
  }
  
  .card-content {
    @apply flex flex-col items-center justify-center p-4 z-10;
  }
  
  .card-icon {
    @apply mb-3;
  }
  
  .icon {
    @apply w-10 h-10;
  }
  
  .new-project .icon {
    @apply text-white;
  }
  
  .existing-projects .icon {
    @apply text-green-600;
  }
  
  .card-title {
    @apply font-bold text-center;
  }
  
  .new-project .card-title {
    @apply text-white text-lg;
  }
  
  .existing-projects .card-title {
    @apply text-gray-800 text-lg;
  }
  
  .card-description {
    @apply text-xs mt-1 text-center;
  }
  
  .new-project .card-description {
    @apply text-green-100;
  }
  
  .existing-projects .card-description {
    @apply text-gray-500;
  }
  
  /* Hover effects */
  .action-card:hover {
    @apply shadow-md transform scale-[1.02];
  }
  
  .new-project:hover {
    @apply from-green-600 to-green-700;
  }
  
  .existing-projects:hover {
    @apply bg-gray-50;
  }
  
  /* Ripple effect */
  .action-card::after {
    content: '';
    @apply absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300;
  }
  
  .action-card:hover::after {
    @apply opacity-5;
  }
  </style>