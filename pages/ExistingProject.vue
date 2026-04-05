<template>
  <div class="min-h-screen bg-stone-100">
    <!-- Header -->
    <div class="bg-white border-b border-stone-100 px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="p-2 -ml-2 rounded-xl hover:bg-stone-100 transition-colors">
          <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-stone-600" />
        </NuxtLink>
        <h1 class="text-base font-semibold text-stone-800">Projects</h1>
      </div>
      <button
        @click="refreshProjects"
        class="p-2 rounded-xl hover:bg-stone-100 transition-colors"
        aria-label="Refresh"
      >
        <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 text-stone-500" :class="{ 'animate-spin': isLoading }" />
      </button>
    </div>

    <div class="px-4 py-4 space-y-3">
      <!-- Loading skeletons -->
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl p-5 shadow-sm animate-pulse">
          <div class="h-5 bg-stone-100 rounded-lg w-2/3 mb-2"></div>
          <div class="h-3.5 bg-stone-100 rounded-lg w-full mb-3"></div>
          <div class="flex gap-2">
            <div class="h-6 bg-stone-100 rounded-full w-20"></div>
            <div class="h-6 bg-stone-100 rounded-full w-24"></div>
            <div class="h-6 bg-stone-100 rounded-full w-16"></div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="sortedProjects.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center mb-4">
          <UIcon name="i-heroicons-folder-open" class="w-8 h-8 text-stone-400" />
        </div>
        <p class="text-stone-600 font-medium mb-1">No projects yet</p>
        <p class="text-stone-400 text-sm mb-5">Create your first farming project</p>
        <NuxtLink to="/addproject" class="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 active:bg-emerald-800 transition-colors">
          Create Project
        </NuxtLink>
      </div>

      <!-- Projects list -->
      <div v-else class="space-y-3">
        <div
          v-for="project in sortedProjects"
          :key="project.id"
          class="bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-200"
          :class="project.isPinned ? 'border-emerald-200' : 'border-stone-100'"
        >
          <div class="p-5">
            <!-- Title row -->
            <div class="flex items-start justify-between gap-2 mb-2">
              <div class="flex items-center gap-2 min-w-0">
                <UIcon v-if="project.isPinned" name="i-heroicons-bookmark-solid" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <h2 class="text-base font-semibold text-stone-800 truncate">{{ project.projectName }}</h2>
              </div>
              <div class="relative flex-shrink-0" v-click-outside="() => closeSettings(project.id)">
                <button
                  @click.stop="toggleSettings(project.id)"
                  class="p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <UIcon name="i-heroicons-ellipsis-vertical" class="w-4 h-4 text-stone-400" />
                </button>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95"
                >
                  <div v-if="projectSettings[project.id]" class="absolute right-0 top-8 w-44 bg-white rounded-xl shadow-lg border border-stone-100 py-1 z-20">
                    <button @click="togglePinProject(project.id)" class="flex items-center w-full px-3.5 py-2.5 text-sm text-stone-700 hover:bg-stone-50 gap-2.5">
                      <UIcon :name="project.isPinned ? 'i-heroicons-bookmark-slash' : 'i-heroicons-bookmark'" class="w-4 h-4 text-stone-400" />
                      {{ project.isPinned ? 'Unpin' : 'Pin project' }}
                    </button>
                    <button @click="confirmDelete(project.id)" class="flex items-center w-full px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 gap-2.5">
                      <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </transition>
              </div>
            </div>

            <p class="text-stone-500 text-sm line-clamp-2 mb-3">{{ project.description }}</p>

            <!-- Meta chips -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
                <UIcon name="i-heroicons-calendar" class="w-3 h-3" />
                {{ formatDate(project.startDate) }}
              </span>
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                <UIcon name="i-heroicons-clock" class="w-3 h-3" />
                {{ project.duration }} months
              </span>
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                <UIcon name="i-heroicons-map" class="w-3 h-3" />
                {{ project.landSize }} acres
              </span>
            </div>

            <NuxtLink
              :to="`/projects/${project.id}`"
              class="block w-full text-center py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
            >
              View Project
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- FAB -->
    <NuxtLink
      to="/addproject"
      class="fixed bottom-6 right-5 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-700 active:scale-95 transition-all"
      aria-label="New project"
    >
      <UIcon name="i-heroicons-plus" class="w-6 h-6" />
    </NuxtLink>

    <!-- Delete modal -->
    <UModal v-model="isDeleteModalOpen">
      <UCard>
        <template #header>
          <span class="font-semibold text-stone-800">Delete Project</span>
        </template>
        <p class="text-sm text-stone-600">Are you sure? This action cannot be undone.</p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="gray" variant="ghost" @click="isDeleteModalOpen = false">Cancel</UButton>
            <UButton color="red" @click="deleteProject" :loading="isDeleting">Delete</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProjectStore } from '~/stores/project';

definePageMeta({ middleware: 'auth' });

const projectStore = useProjectStore();
const projectSettings = ref({});
const isLoading = ref(false);
const isDeleteModalOpen = ref(false);
const isDeleting = ref(false);
const projectToDelete = ref(null);

const sortedProjects = computed(() =>
  [...projectStore.projects].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  })
);

const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });
};

const toggleSettings = (id) => {
  Object.keys(projectSettings.value).forEach((k) => { if (k !== id) projectSettings.value[k] = false; });
  projectSettings.value[id] = !projectSettings.value[id];
};

const closeSettings = (id) => { projectSettings.value[id] = false; };

const togglePinProject = async (id) => {
  try {
    await projectStore.togglePinProject(id);
  } catch (e) {
    console.error(e);
  } finally {
    closeSettings(id);
  }
};

const confirmDelete = (id) => {
  projectToDelete.value = id;
  isDeleteModalOpen.value = true;
  closeSettings(id);
};

const deleteProject = async () => {
  if (!projectToDelete.value) return;
  isDeleting.value = true;
  try {
    await projectStore.deleteProject(projectToDelete.value);
    isDeleteModalOpen.value = false;
  } catch (e) {
    console.error(e);
  } finally {
    isDeleting.value = false;
  }
};

const refreshProjects = async () => {
  isLoading.value = true;
  try {
    await projectStore.fetchProjects();
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (projectStore.projects.length === 0) await refreshProjects();
});
</script>
