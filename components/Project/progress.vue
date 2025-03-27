<template>
    <div class="progress-records-container">
      <div class="overflow-x-auto mt-6 sm:mt-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="record in project.progressTable" 
            :key="record.id"
            class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <!-- Image Section -->
            <div class="relative h-48 sm:h-56 w-full bg-gray-100">
              <img 
                :src="record.imageUrl" 
                :alt="`Progress image for ${record.stage} on ${formatDate(record.date)}`"
                class="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                @error="handleImageError"
              />
              <div v-if="!record.imageUrl" class="absolute inset-0 flex items-center justify-center text-gray-400">
                <PhotoIcon class="h-12 w-12" />
              </div>
            </div>
  
            <!-- Content Section -->
            <div class="p-4 sm:p-5">
              <div class="flex items-center justify-between mb-2">
                <span class="inline-block px-2 py-1 text-xs font-semibold leading-tight bg-blue-100 text-blue-800 rounded-full">
                  {{ formatDate(record.date) }}
                </span>
                <button 
                  @click="deleteRecord(record.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete progress record"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
  
              <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {{ record.stage }}
              </h3>
  
              <div class="flex items-center text-sm text-gray-500">
                <CalendarIcon class="h-4 w-4 mr-1" />
                <span>Created {{ formatTimeAgo(record.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useProjectStore } from '~/stores/project';
  import { PhotoIcon, TrashIcon, CalendarIcon } from '@heroicons/vue/24/outline'

  const projectStore = useProjectStore();
  const props = defineProps({
    project: {
      type: Object,
      required: true,
      validator: (value) => {
        return Array.isArray(value.progressTable)
      }
    }
  })
  
  const emit = defineEmits(['delete'])
  
  const handleImageError = (event) => {
    const img = event.target
    img.src = '/placeholder-image.jpg'
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  
  const formatTimeAgo = (date) => {
    const now = new Date()
    const created = new Date(date)
    const diffInDays = Math.floor((now - created) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'today'
    if (diffInDays === 1) return 'yesterday'
    return `${diffInDays} days ago`
  }
  
  const deleteRecord = (id) => {
    emit('delete', id)
  }
  </script>
  
  <style scoped>
  .progress-records-container {
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .hover\:shadow-lg:hover {
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  </style>