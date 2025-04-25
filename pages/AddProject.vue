<template>
    <div class="bg-gray-200 dark:bg-gray-200  min-h-screen p-4 md:p-6">
      <NuxtLink 
        to="/"
        class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 group"
        aria-label="Back to previous page"
      >
        <UIcon 
          name="i-heroicons-arrow-left" 
          class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" 
          aria-hidden="true"
        />
        <span class="text-sm font-medium">Back</span>
      </NuxtLink>
  
      <main class="flex items-center justify-center">
        <div
          class="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
        >
          <h1 class="text-2xl font-bold text-gray-800 mb-6">Add New Project</h1>
          
          <form @submit.prevent="submitProject" class="space-y-6">
            <div>
              <label for="projectName" class="block text-sm font-medium text-gray-700 mb-1">
                Project Name <span class="text-red-500">*</span>
              </label>
              <input 
                id="projectName"
                v-model.trim="project.projectName" 
                type="text"
                class="w-full px-4 py-2.5 border border-gray-300 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter project name"
                required
                aria-required="true"
                :aria-invalid="errors.projectName ? 'true' : 'false'"
              />
              <p v-if="errors.projectName" class="mt-1 text-sm text-red-600">
                {{ errors.projectName }}
              </p>
            </div>
  
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description <span class="text-red-500">*</span>
              </label>
              <textarea 
                id="description"
                v-model.trim="project.description"
                class="w-full px-4 py-2.5 border border-gray-300 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all min-h-[100px]"
                placeholder="Enter project description"
                required
                aria-required="true"
                :aria-invalid="errors.description ? 'true' : 'false'"
              ></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-red-600">
                {{ errors.description }}
              </p>
            </div>
  
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Duration (Months) <span class="text-red-500">*</span>
                </label>
                <input 
                  id="duration"
                  v-model.number="project.duration" 
                  type="number"
                  min="1"
                  max="120"
                  class="w-full px-4 py-2.5 border border-gray-300 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="0"
                  required
                  aria-required="true"
                  :aria-invalid="errors.duration ? 'true' : 'false'"
                />
                <p v-if="errors.duration" class="mt-1 text-sm text-red-600">
                  {{ errors.duration }}
                </p>
              </div>
  
              <div>
                <label for="landSize" class="block text-sm font-medium text-gray-700 mb-1">
                  Land Size (Acres) <span class="text-red-500">*</span>
                </label>
                <input 
                  id="landSize"
                  v-model.trim="project.landSize" 
                  type="text"
                  pattern="^\d*\.?\d+$"
                  class="w-full px-4 py-2.5 border border-gray-300 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  required
                  aria-required="true"
                  :aria-invalid="errors.landSize ? 'true' : 'false'"
                />
                <p v-if="errors.landSize" class="mt-1 text-sm text-red-600">
                  {{ errors.landSize }}
                </p>
              </div>
            </div>
  
            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span class="text-red-500">*</span>
              </label>
              <input 
                id="startDate"
                v-model="project.startDate" 
                type="date"
                :min="minStartDate"
                class="w-full px-4 py-2.5 border border-gray-300 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
                aria-required="true"
                :aria-invalid="errors.startDate ? 'true' : 'false'"
              />
              <p v-if="errors.startDate" class="mt-1 text-sm text-red-600">
                {{ errors.startDate }}
              </p>
            </div>
  
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              :aria-busy="loading"
            >
              <span v-if="loading" class="flex items-center">
                <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </span>
              <span v-else>Save Project</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useProjectStore } from "~/stores/project";
  
  const router = useRouter();
  const projectStore = useProjectStore();
  
  // Form state
  const project = reactive({
    projectName: "",
    description: "",
    duration: null as number | null,
    startDate: "",
    landSize: ""
  });
  
  // Validation errors
  const errors = reactive({
    projectName: "",
    description: "",
    duration: "",
    startDate: "",
    landSize: ""
  });
  
  // Loading state
  const loading = ref(false);
  
  // Minimum start date (today)
  const minStartDate = computed(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  // Form validation
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    Object.keys(errors).forEach(key => {
      errors[key as keyof typeof errors] = "";
    });
  
    // Project name validation
    if (!project.projectName.trim()) {
      errors.projectName = "Project name is required";
      isValid = false;
    } else if (project.projectName.trim().length > 100) {
      errors.projectName = "Project name must be less than 100 characters";
      isValid = false;
    }
  
    // Description validation
    if (!project.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    } else if (project.description.trim().length > 500) {
      errors.description = "Description must be less than 500 characters";
      isValid = false;
    }
  
    // Duration validation
    if (project.duration === null || isNaN(project.duration)) {
      errors.duration = "Duration is required";
      isValid = false;
    } else if (project.duration < 1) {
      errors.duration = "Duration must be at least 1 month";
      isValid = false;
    } else if (project.duration > 120) {
      errors.duration = "Duration cannot exceed 120 months";
      isValid = false;
    }
  
    // Start date validation
    if (!project.startDate) {
      errors.startDate = "Start date is required";
      isValid = false;
    } else {
      const selectedDate = new Date(project.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.startDate = "Start date cannot be in the past";
        isValid = false;
      }
    }
  
    // Land size validation
    if (!project.landSize.trim()) {
      errors.landSize = "Land size is required";
      isValid = false;
    } else if (!/^\d*\.?\d+$/.test(project.landSize)) {
      errors.landSize = "Please enter a valid number";
      isValid = false;
    } else if (parseFloat(project.landSize) <= 0) {
      errors.landSize = "Land size must be greater than 0";
      isValid = false;
    }
  
    return isValid;
  };
  
  const submitProject = async () => {
    if (loading.value) return;
    
    if (!validateForm()) {
      return;
    }
  
    loading.value = true;
    
    try {
      await projectStore.addProject({
        projectName: project.projectName.trim(),
        description: project.description.trim(),
        duration: project.duration!,
        startDate: project.startDate,
        landSize: parseFloat(project.landSize)
      });
  
      // Reset form
      Object.assign(project, {
        projectName: "",
        description: "",
        duration: null,
        startDate: "",
        landSize: ""
      });
  
      // Show success message or redirect
      router.push("/projects?success=true");
      
    } catch (error) {
      console.error("Failed to save project:", error);
      // You might want to set a general form error here
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
  
  /* Focus styles for better accessibility */
  [aria-invalid="true"] {
    border-color: #ef4444;
  }
  
  [aria-invalid="true"]:focus {
    ring-color: #ef4444;
  }
  </style>