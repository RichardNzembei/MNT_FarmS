<template>
  <div class="p-4 bg-gray-200 dark:bg-gray-200 min-h-screen">
    <!-- Improved back button with better touch target -->
    <NuxtLink
      to="/"
      class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300 active:scale-95"
      aria-label="Go back"
    >
      <UIcon
        name="i-heroicons-arrow-left"
        class="w-6 h-6 mr-2 hover:-translate-x-1 transition-transform"
      />
      <span class="text-sm font-medium">Back</span>
    </NuxtLink>

    <!-- Page header with loading state -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Projects</h1>
      <button
        @click="refreshProjects"
        class="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
        aria-label="Refresh projects"
      >
        <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 text-gray-600" :class="{ 'animate-spin': isLoading }" />
      </button>
    </div>

    <!-- Empty state with action button -->
    <div
      v-if="projectStore.projects.length === 0 && !isLoading"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <UIcon name="i-heroicons-folder-open" class="w-12 h-12 text-gray-400 mb-4" />
      <p class="text-gray-500 mb-4">No projects available yet</p>
      <NuxtLink
        to="/projects/create"
        class="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-all"
      >
        Create New Project
      </NuxtLink>
    </div>

    <!-- Loading skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 gap-4">
      <div v-for="i in 3" :key="i" class="bg-white rounded-xl p-5 shadow-sm border">
        <div class="animate-pulse space-y-3">
          <div class="h-6 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="flex space-x-2 pt-2">
            <div class="h-6 bg-gray-200 rounded w-20"></div>
            <div class="h-6 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Projects grid - single column for mobile -->
    <div v-else class="grid grid-cols-1 gap-4">
      <div
        v-for="project in sortedProjects"
        :key="project.id"
        class="relative bg-white shadow-sm rounded-xl p-5 border border-gray-100 hover:border-blue-200 transition-all duration-200 active:scale-[0.98]"
        :class="{ 'ring-2 ring-blue-500 border-blue-500': project.isPinned }"
      >
        <!-- Pinned indicator -->
        <div v-if="project.isPinned" class="absolute top-2 left-2">
          <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-blue-500" />
        </div>

        <!-- Project settings dropdown with better mobile interaction -->
        <div class="absolute top-3 right-3" v-click-outside="() => closeSettings(project.id)">
          <button
            @click.stop="toggleSettings(project.id)"
            class="p-1 rounded-full hover:bg-gray-100 focus:outline-none active:bg-gray-200"
            aria-label="Project settings"
          >
            <UIcon
              name="i-lucide-more-vertical"
              class="w-5 h-5 text-gray-500 hover:text-gray-700"
            />
          </button>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="projectSettings[project.id]"
              class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
            >
              <button
                @click="togglePinProject(project.id)"
                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <UIcon :name="project.isPinned ? 'i-heroicons-map-pin-slash' : 'i-heroicons-map-pin'" class="w-4 h-4 mr-2" />
                {{ project.isPinned ? 'Unpin' : 'Pin' }}
              </button>
              <button
                @click="archiveProject(project.id)"
                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <UIcon name="i-heroicons-archive-box" class="w-4 h-4 mr-2" />
                Archive
              </button>
              <button
                @click="confirmDelete(project.id)"
                class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </transition>
        </div>

        <!-- Project content with better spacing -->
        <div class="pr-6">
          <h2 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ project.projectName }}</h2>
          <p class="text-gray-600 mt-1 text-sm line-clamp-2">{{ project.description }}</p>

          <!-- Project metadata with icons -->
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <UIcon name="i-heroicons-calendar" class="w-3 h-3 mr-1" />
              {{ formatDate(project.startDate) }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <UIcon name="i-heroicons-clock" class="w-3 h-3 mr-1" />
              {{ project.duration }} months
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              <UIcon name="i-heroicons-map" class="w-3 h-3 mr-1" />
              {{ project.landSize }} Acres
            </span>
          </div>
        </div>

        <!-- Action buttons with better touch targets -->
        <div class="mt-4 flex space-x-2">
          <NuxtLink
            :to="`/projects/${project.id}`"
            class="flex-1 text-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            View Details
          </NuxtLink>
          <button
            @click="navigateToTasks(project.id)"
            class="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
          >
            Tasks
          </button>
        </div>
      </div>
    </div>

    <!-- Floating action button for mobile -->
    <div class="fixed bottom-6 right-6 md:hidden">
      <NuxtLink
        to="/projects/create"
        class="flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-all"
        aria-label="Create new project"
      >
        <UIcon name="i-heroicons-plus" class="w-6 h-6" />
      </NuxtLink>
    </div>

    <!-- Delete confirmation modal -->
    <UModal v-model="isDeleteModalOpen">
      <UCard>
        <template #header>
          Confirm Deletion
        </template>

        <p class="text-gray-600 mb-4">Are you sure you want to delete this project? This action cannot be undone.</p>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton
              color="gray"
              variant="ghost"
              @click="isDeleteModalOpen = false"
            >
              Cancel
            </UButton>
            <UButton
              color="red"
              @click="deleteProject"
              :loading="isDeleting"
            >
              Delete Project
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProjectStore } from '~/stores/project';

const projectStore = useProjectStore();
const projectSettings = ref({});
const isLoading = ref(false);
const isDeleteModalOpen = ref(false);
const isDeleting = ref(false);
const projectToDelete = ref(null);

// Sort projects with pinned ones first
const sortedProjects = computed(() => {
  return [...projectStore.projects].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
});

const toggleSettings = (projectId) => {
  // Close all other open settings first
  Object.keys(projectSettings.value).forEach(id => {
    if (id !== projectId) projectSettings.value[id] = false;
  });
  projectSettings.value[projectId] = !projectSettings.value[projectId];
};

const closeSettings = (projectId) => {
  projectSettings.value[projectId] = false;
};

const togglePinProject = async (projectId) => {
  try {
    await projectStore.togglePinProject(projectId);
    closeSettings(projectId);
  } catch (error) {
    console.error('Error toggling pin status:', error);
  }
};

const archiveProject = async (projectId) => {
  try {
    await projectStore.updateProjectStatus(projectId, 'archived');
    closeSettings(projectId);
  } catch (error) {
    console.error('Error archiving project:', error);
  }
};

const confirmDelete = (projectId) => {
  projectToDelete.value = projectId;
  isDeleteModalOpen.value = true;
  closeSettings(projectId);
};

const deleteProject = async () => {
  if (!projectToDelete.value) return;
  
  isDeleting.value = true;
  try {
    await projectStore.deleteProject(projectToDelete.value);
    isDeleteModalOpen.value = false;
  } catch (error) {
    console.error('Error deleting project:', error);
  } finally {
    isDeleting.value = false;
  }
};

const refreshProjects = async () => {
  isLoading.value = true;
  try {
    await projectStore.fetchProjects();
  } catch (error) {
    console.error('Error refreshing projects:', error);
  } finally {
    isLoading.value = false;
  }
};

const navigateToTasks = (projectId) => {
  navigateTo(`/projects/${projectId}/tasks`);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

onMounted(async () => {
  if (projectStore.projects.length === 0) {
    await refreshProjects();
  }
});
</script>

<style scoped>
/* Custom transitions for better mobile feel */
.active:scale-95 {
  transition: transform 0.1s ease;
}

.active:scale-95:active {
  transform: scale(0.95);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>