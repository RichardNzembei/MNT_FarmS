<template>
    <section class="pinned-section">
      <div class="section-header">
        <h2 class="section-title">
          <UIcon name="i-mdi-pin" class="pin-icon" />
          Pinned Projects
        </h2>
        <UButton 
          label="View All" 
          variant="ghost" 
          size="xs" 
          color="gray" 
          icon="i-heroicons-chevron-right"
          class="view-all"
        />
      </div>
      
      <div class="projects-container">
        <ProjectExisting />
      </div>
    </section>
  </template>
  
  <style scoped>
  .pinned-section {
    @apply bg-white rounded-xl shadow-sm p-4;
  }
  
  .section-header {
    @apply flex justify-between items-center mb-4;
  }
  
  .section-title {
    @apply text-lg font-semibold text-gray-800 flex items-center;
  }
  
  .pin-icon {
    @apply text-green-500 mr-2;
  }
  
  .view-all {
    @apply text-gray-500 hover:text-green-600;
  }
  
  .projects-container {
    @apply space-y-3;
  }
  </style>