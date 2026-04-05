<template>
  <div class="grid grid-cols-2 gap-3">
    <NuxtLink to="/addproject" class="group bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm active:scale-95 transition-transform duration-150">
      <div class="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-3">
        <UIcon name="i-heroicons-plus" class="w-6 h-6 text-white" />
      </div>
      <span class="text-white font-semibold text-sm">New Project</span>
      <span class="text-emerald-100 text-xs mt-0.5">Start farming project</span>
    </NuxtLink>

    <NuxtLink to="/existingproject" class="group bg-white border border-stone-200 rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm active:scale-95 transition-transform duration-150 hover:border-emerald-300">
      <div class="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
        <UIcon name="i-heroicons-folder-open" class="w-6 h-6 text-emerald-600" />
      </div>
      <span class="text-stone-800 font-semibold text-sm">My Projects</span>
      <span class="text-stone-400 text-xs mt-0.5">View all projects</span>
    </NuxtLink>
  </div>
</template>
