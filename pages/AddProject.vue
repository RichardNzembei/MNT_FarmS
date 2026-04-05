<template>
  <div class="min-h-screen bg-stone-100">
    <!-- Header -->
    <div class="bg-white border-b border-stone-100 px-4 py-4 flex items-center gap-3">
      <NuxtLink to="/" class="p-2 -ml-2 rounded-xl hover:bg-stone-100 transition-colors">
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-stone-600" />
      </NuxtLink>
      <h1 class="text-base font-semibold text-stone-800">New Project</h1>
    </div>

    <div class="px-4 py-5">
      <div class="bg-white rounded-2xl shadow-sm p-5">
        <form @submit.prevent="submitProject" class="space-y-4">
          <!-- Project Name -->
          <div>
            <label class="block text-sm font-medium text-stone-700 mb-1.5">
              Project Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model.trim="project.projectName"
              type="text"
              placeholder="e.g. Tomatoes 2025"
              class="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-stone-400"
              :class="{ 'border-red-400': errors.projectName }"
            />
            <p v-if="errors.projectName" class="mt-1 text-xs text-red-500">{{ errors.projectName }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-stone-700 mb-1.5">
              Description <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model.trim="project.description"
              rows="3"
              placeholder="Briefly describe this project..."
              class="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none placeholder:text-stone-400"
              :class="{ 'border-red-400': errors.description }"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-xs text-red-500">{{ errors.description }}</p>
          </div>

          <!-- Duration + Land Size -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-stone-700 mb-1.5">
                Duration (months) <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="project.duration"
                type="number"
                min="1"
                max="120"
                placeholder="e.g. 6"
                class="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-stone-400"
                :class="{ 'border-red-400': errors.duration }"
              />
              <p v-if="errors.duration" class="mt-1 text-xs text-red-500">{{ errors.duration }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-stone-700 mb-1.5">
                Land Size (acres) <span class="text-red-500">*</span>
              </label>
              <input
                v-model.trim="project.landSize"
                type="text"
                pattern="^\d*\.?\d+$"
                placeholder="e.g. 3.5"
                class="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-stone-400"
                :class="{ 'border-red-400': errors.landSize }"
              />
              <p v-if="errors.landSize" class="mt-1 text-xs text-red-500">{{ errors.landSize }}</p>
            </div>
          </div>

          <!-- Start Date -->
          <div>
            <label class="block text-sm font-medium text-stone-700 mb-1.5">
              Start Date <span class="text-red-500">*</span>
            </label>
            <input
              v-model="project.startDate"
              type="date"
              class="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              :class="{ 'border-red-400': errors.startDate }"
            />
            <p v-if="errors.startDate" class="mt-1 text-xs text-red-500">{{ errors.startDate }}</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-emerald-600 text-white py-3.5 px-4 rounded-xl text-sm font-semibold hover:bg-emerald-700 active:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
          >
            <UIcon v-if="loading" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
            {{ loading ? 'Saving...' : 'Create Project' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '~/stores/project';

definePageMeta({ middleware: 'auth' });

const router = useRouter();
const projectStore = useProjectStore();

const project = reactive({
  projectName: '',
  description: '',
  duration: null as number | null,
  startDate: '',
  landSize: '',
});

const errors = reactive({
  projectName: '',
  description: '',
  duration: '',
  startDate: '',
  landSize: '',
});

const loading = ref(false);

const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach((k) => (errors[k as keyof typeof errors] = ''));

  if (!project.projectName) {
    errors.projectName = 'Project name is required';
    isValid = false;
  } else if (project.projectName.length > 100) {
    errors.projectName = 'Must be under 100 characters';
    isValid = false;
  }

  if (!project.description) {
    errors.description = 'Description is required';
    isValid = false;
  } else if (project.description.length > 500) {
    errors.description = 'Must be under 500 characters';
    isValid = false;
  }

  if (project.duration === null || isNaN(project.duration!)) {
    errors.duration = 'Required';
    isValid = false;
  } else if (project.duration! < 1) {
    errors.duration = 'At least 1 month';
    isValid = false;
  }

  if (!project.startDate) {
    errors.startDate = 'Start date is required';
    isValid = false;
  }

  if (!project.landSize) {
    errors.landSize = 'Required';
    isValid = false;
  } else if (parseFloat(project.landSize) <= 0) {
    errors.landSize = 'Must be greater than 0';
    isValid = false;
  }

  return isValid;
};

const submitProject = async () => {
  if (loading.value || !validateForm()) return;
  loading.value = true;
  try {
    const id = await projectStore.addProject({
      projectName: project.projectName,
      description: project.description,
      duration: project.duration!,
      startDate: project.startDate,
      landSize: parseFloat(project.landSize),
    });
    router.push(`/projects/${id}`);
  } catch (error) {
    console.error('Failed to save project:', error);
  } finally {
    loading.value = false;
  }
};
</script>
