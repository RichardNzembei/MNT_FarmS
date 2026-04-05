<template>
  <div class="min-h-screen bg-stone-100 pb-8 font-sans antialiased text-stone-800">
    <!-- Header -->
    <div class="bg-white border-b border-stone-100 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
      <NuxtLink to="/existingproject" class="p-2 -ml-2 rounded-xl hover:bg-stone-100 transition-colors">
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-stone-600" />
      </NuxtLink>
      <div class="min-w-0 flex-1">
        <h1 class="text-base font-semibold text-stone-800 truncate">{{ project?.projectName || 'Project' }}</h1>
        <p class="text-xs text-stone-400">{{ project?.landSize }} acres · {{ project?.duration }} months</p>
      </div>
      <button v-if="project" @click="generateReport" class="p-2 rounded-xl hover:bg-stone-100 transition-colors" title="Download report">
        <UIcon name="i-heroicons-arrow-down-tray" class="w-5 h-5 text-stone-500" />
      </button>
    </div>

    <!-- Loading -->
    <div v-if="!project" class="flex flex-col items-center justify-center py-24 px-4">
      <div class="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-sm text-stone-500">Loading project...</p>
    </div>

    <template v-else>
      <!-- Project Info Card -->
      <div class="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-4">
          <p class="text-emerald-100 text-xs mb-1">Description</p>
          <p class="text-white text-sm leading-relaxed">{{ project.description }}</p>
        </div>
        <!-- Progress bar -->
        <div class="px-5 pt-3 pb-1">
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-xs text-stone-500 font-medium">Project Progress</span>
            <span class="text-xs font-bold" :class="progressPercent >= 100 ? 'text-emerald-600' : 'text-stone-700'">{{ progressPercent }}%</span>
          </div>
          <div class="w-full bg-stone-100 rounded-full h-2">
            <div
              class="h-2 rounded-full transition-all duration-500"
              :class="progressPercent >= 100 ? 'bg-emerald-500' : progressPercent >= 60 ? 'bg-amber-400' : 'bg-emerald-500'"
              :style="{ width: progressPercent + '%' }"
            ></div>
          </div>
        </div>
        <div class="grid grid-cols-3 divide-x divide-stone-100 text-center py-3">
          <div class="px-3">
            <p class="text-xs text-stone-400 mb-0.5">Start</p>
            <p class="text-sm font-semibold text-stone-700">{{ formatDate(project.startDate) }}</p>
          </div>
          <div class="px-3">
            <p class="text-xs text-stone-400 mb-0.5">Duration</p>
            <p class="text-sm font-semibold text-stone-700">{{ project.duration }}m</p>
          </div>
          <div class="px-3">
            <p class="text-xs text-stone-400 mb-0.5">Size</p>
            <p class="text-sm font-semibold text-stone-700">{{ project.landSize }} ac</p>
          </div>
        </div>
      </div>

      <!-- Tab Bar -->
      <div class="mx-4 mt-4">
        <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            v-for="view in views"
            :key="view.id"
            @click="currentView = view.id"
            class="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150"
            :class="currentView === view.id
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-50'"
          >
            <UIcon :name="view.icon" class="w-3.5 h-3.5" />
            {{ view.label }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="mx-4 mt-3">

        <!-- ══ LABOUR ══ -->
        <section v-if="currentView === 'labour'">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-stone-700 flex items-center gap-2">
              <UIcon name="i-heroicons-users" class="w-4 h-4 text-emerald-600" /> Labor Records
            </h2>
            <button @click="toggleForm('labor')" class="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 hover:bg-emerald-700 transition-colors">
              <UIcon :name="showLaborForm ? 'i-heroicons-x-mark' : 'i-heroicons-plus'" class="w-3.5 h-3.5" />
              {{ showLaborForm ? 'Cancel' : 'Add' }}
            </button>
          </div>

          <form v-if="showLaborForm" @submit.prevent="saveLaborRecord" class="bg-white rounded-2xl p-4 shadow-sm mb-3 space-y-3 animate-form-in">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="field-label">Date</label>
                <input v-model="newLabor.date" type="date" required class="field-input" />
              </div>
              <div>
                <label class="field-label">Workers</label>
                <input v-model.number="newLabor.numberOfWorkers" type="number" placeholder="0" required class="field-input" />
              </div>
            </div>
            <div>
              <label class="field-label">Task Performed</label>
              <input v-model="newLabor.taskPerformed" placeholder="What was done" required class="field-input" />
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="field-label">Hours</label>
                <input v-model.number="newLabor.hoursWorked" type="number" placeholder="0" required class="field-input" />
              </div>
              <div>
                <label class="field-label">Wage (Ksh)</label>
                <input v-model.number="newLabor.wageRate" type="number" placeholder="0" required class="field-input" />
              </div>
              <div>
                <label class="field-label">Area (ac)</label>
                <input v-model.number="newLabor.cropArea" type="number" placeholder="0" required class="field-input" />
              </div>
            </div>
            <button type="submit" :disabled="savingLabor" class="submit-btn">
              <UIcon v-if="savingLabor" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
              {{ savingLabor ? 'Saving...' : 'Save Record' }}
            </button>
          </form>

          <div class="space-y-2">
            <div v-for="r in project.laborTable" :key="r.id" class="record-card">
              <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-semibold text-stone-500">{{ formatDate(r.date) }}</span>
                <span class="text-xs font-bold text-emerald-600">Ksh {{ formatNum(r.numberOfWorkers * r.wageRate) }}</span>
              </div>
              <p class="text-sm font-medium text-stone-800 mb-1">{{ r.taskPerformed }}</p>
              <div class="flex gap-3 text-xs text-stone-500">
                <span>{{ r.numberOfWorkers }} workers</span>
                <span>{{ r.hoursWorked }} hrs</span>
                <span>{{ r.cropArea }} ac</span>
              </div>
            </div>
            <div v-if="!project.laborTable.length" class="empty-state">No labor records yet</div>
          </div>
        </section>

        <!-- ══ LAND PREP ══ -->
        <section v-if="currentView === 'landPrep'">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-stone-700 flex items-center gap-2">
              <UIcon name="i-heroicons-wrench-screwdriver" class="w-4 h-4 text-emerald-600" /> Land Prep
            </h2>
            <button @click="toggleForm('landPrep')" class="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 hover:bg-emerald-700 transition-colors">
              <UIcon :name="showLandPrepForm ? 'i-heroicons-x-mark' : 'i-heroicons-plus'" class="w-3.5 h-3.5" />
              {{ showLandPrepForm ? 'Cancel' : 'Add' }}
            </button>
          </div>

          <form v-if="showLandPrepForm" @submit.prevent="saveLandPrepRecord" class="bg-white rounded-2xl p-4 shadow-sm mb-3 space-y-3 animate-form-in">
            <div>
              <label class="field-label">Date</label>
              <input v-model="newLandPrep.date" type="date" required class="field-input" />
            </div>
            <div>
              <label class="field-label">Labor Description</label>
              <input v-model="newLandPrep.landPrepLabor" placeholder="Type of labor" required class="field-input" />
            </div>
            <div>
              <label class="field-label">Description</label>
              <input v-model="newLandPrep.prepDescription" placeholder="Work done" required class="field-input" />
            </div>
            <div>
              <label class="field-label">Cost (Ksh)</label>
              <input v-model.number="newLandPrep.prepPrice" type="number" placeholder="0" required class="field-input" />
            </div>
            <button type="submit" :disabled="savingLandPrep" class="submit-btn">
              <UIcon v-if="savingLandPrep" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
              {{ savingLandPrep ? 'Saving...' : 'Save Record' }}
            </button>
          </form>

          <div class="space-y-2">
            <div v-for="r in project.landPrepTable" :key="r.id" class="record-card">
              <div class="flex justify-between items-start mb-1">
                <span class="text-xs font-semibold text-stone-500">{{ formatDate(r.date) }}</span>
                <span class="text-xs font-bold text-emerald-600">Ksh {{ formatNum(r.prepPrice) }}</span>
              </div>
              <p class="text-sm font-medium text-stone-800">{{ r.landPrepLabor }}</p>
              <p class="text-xs text-stone-500 mt-0.5">{{ r.prepDescription }}</p>
            </div>
            <div v-if="!project.landPrepTable.length" class="empty-state">No land prep records yet</div>
          </div>
        </section>

        <!-- ══ HARVEST ══ -->
        <section v-if="currentView === 'harvest'">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-stone-700 flex items-center gap-2">
              <UIcon name="i-heroicons-archive-box" class="w-4 h-4 text-emerald-600" /> Harvest
            </h2>
            <button @click="toggleForm('harvest')" class="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 hover:bg-emerald-700 transition-colors">
              <UIcon :name="showHarvestForm ? 'i-heroicons-x-mark' : 'i-heroicons-plus'" class="w-3.5 h-3.5" />
              {{ showHarvestForm ? 'Cancel' : 'Add' }}
            </button>
          </div>

          <form v-if="showHarvestForm" @submit.prevent="saveHarvestRecord" class="bg-white rounded-2xl p-4 shadow-sm mb-3 space-y-3 animate-form-in">
            <div>
              <label class="field-label">Date</label>
              <input v-model="newHarvest.date" type="date" required class="field-input" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="field-label">Quantity</label>
                <input v-model.number="newHarvest.quantity" type="number" placeholder="kgs / cartons" required class="field-input" />
              </div>
              <div>
                <label class="field-label">Price / Unit (Ksh)</label>
                <input v-model.number="newHarvest.pricePerUnit" type="number" placeholder="0" required class="field-input" />
              </div>
            </div>
            <div>
              <label class="field-label">Quality</label>
              <select v-model="newHarvest.quality" required class="field-input">
                <option value="">Select grade</option>
                <option value="Export">Export</option>
                <option value="Local">Local</option>
              </select>
            </div>
            <button type="submit" :disabled="savingHarvest" class="submit-btn">
              <UIcon v-if="savingHarvest" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
              {{ savingHarvest ? 'Saving...' : 'Save Record' }}
            </button>
          </form>

          <div class="space-y-2">
            <div v-for="r in project.harvestTable" :key="r.id" class="record-card">
              <div class="flex justify-between items-start mb-1">
                <span class="text-xs font-semibold text-stone-500">{{ formatDate(r.date) }}</span>
                <span class="text-xs font-bold text-emerald-600">Ksh {{ formatNum(r.quantity * r.pricePerUnit) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <p class="text-sm font-medium text-stone-800">{{ r.quantity }} units</p>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" :class="r.quality === 'Export' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'">{{ r.quality }}</span>
              </div>
              <p class="text-xs text-stone-500 mt-0.5">Ksh {{ formatNum(r.pricePerUnit) }} / unit</p>
            </div>
            <div v-if="!project.harvestTable.length" class="empty-state">No harvest records yet</div>
          </div>
        </section>

        <!-- ══ SPRAY ══ -->
        <section v-if="currentView === 'spray'">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-stone-700 flex items-center gap-2">
              <UIcon name="i-heroicons-beaker" class="w-4 h-4 text-emerald-600" /> Spraying
            </h2>
            <button @click="toggleForm('spray')" class="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 hover:bg-emerald-700 transition-colors">
              <UIcon :name="showSprayingForm ? 'i-heroicons-x-mark' : 'i-heroicons-plus'" class="w-3.5 h-3.5" />
              {{ showSprayingForm ? 'Cancel' : 'Add' }}
            </button>
          </div>

          <form v-if="showSprayingForm" @submit.prevent="saveSprayingRecord" class="bg-white rounded-2xl p-4 shadow-sm mb-3 space-y-3 animate-form-in">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="field-label">Date</label>
                <input v-model="newSpraying.date" type="date" required class="field-input" />
              </div>
              <div>
                <label class="field-label">Serial No</label>
                <input v-model="newSpraying.serialNo" placeholder="SN-001" required class="field-input" />
              </div>
            </div>
            <div>
              <label class="field-label">Trade Name</label>
              <input v-model="newSpraying.tradeName" placeholder="Product trade name" required class="field-input" />
            </div>
            <div>
              <label class="field-label">Reg No</label>
              <input v-model="newSpraying.regNo" placeholder="Registration number" class="field-input" />
            </div>
            <div>
              <label class="field-label">Active Ingredients</label>
              <input v-model="newSpraying.activeIngredients" placeholder="e.g. Glyphosate 36%" required class="field-input" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="field-label">Manufacturer</label>
                <input v-model="newSpraying.manufacturer" placeholder="Company" required class="field-input" />
              </div>
              <div>
                <label class="field-label">Agent</label>
                <input v-model="newSpraying.agent" placeholder="Local agent" required class="field-input" />
              </div>
            </div>
            <div>
              <label class="field-label">Uses / Purpose</label>
              <input v-model="newSpraying.uses" placeholder="What it treats" required class="field-input" />
            </div>
            <button type="submit" :disabled="savingSpraying" class="submit-btn">
              <UIcon v-if="savingSpraying" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
              {{ savingSpraying ? 'Saving...' : 'Save Record' }}
            </button>
          </form>

          <div class="space-y-2">
            <div v-for="r in project.sprayingTable" :key="r.id" class="record-card">
              <div class="flex justify-between items-start mb-1">
                <span class="text-sm font-semibold text-stone-800">{{ r.tradeName }}</span>
                <span class="text-xs text-stone-400">{{ formatDate(r.date) }}</span>
              </div>
              <p class="text-xs text-stone-500 mb-1">{{ r.activeIngredients }}</p>
              <div class="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-stone-400">
                <span>{{ r.manufacturer }}</span>
                <span>{{ r.agent }}</span>
                <span>{{ r.uses }}</span>
              </div>
            </div>
            <div v-if="!project.sprayingTable.length" class="empty-state">No spraying records yet</div>
          </div>
        </section>

        <!-- ══ FERTILIZER ══ -->
        <section v-if="currentView === 'fertilizer'">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-stone-700 flex items-center gap-2">
              <UIcon name="i-heroicons-cube" class="w-4 h-4 text-emerald-600" /> Fertilizer
            </h2>
            <button @click="toggleForm('fertilizer')" class="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 hover:bg-emerald-700 transition-colors">
              <UIcon :name="showFertilizerForm ? 'i-heroicons-x-mark' : 'i-heroicons-plus'" class="w-3.5 h-3.5" />
              {{ showFertilizerForm ? 'Cancel' : 'Add' }}
            </button>
          </div>

          <form v-if="showFertilizerForm" @submit.prevent="saveFertilizerRecord" class="bg-white rounded-2xl p-4 shadow-sm mb-3 space-y-3 animate-form-in">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="field-label">Date</label>
                <input v-model="newFertilizer.date" type="date" required class="field-input" />
              </div>
              <div>
                <label class="field-label">Stage</label>
                <input v-model="newFertilizer.stage" placeholder="e.g. Flowering" required class="field-input" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="field-label">Type</label>
                <input v-model="newFertilizer.type" placeholder="e.g. NPK, DAP" required class="field-input" />
              </div>
              <div>
                <label class="field-label">Name</label>
                <input v-model="newFertilizer.name" placeholder="Brand name" class="field-input" />
              </div>
            </div>
            <div>
              <label class="field-label">Purpose</label>
              <input v-model="newFertilizer.purpose" placeholder="Why it was applied" required class="field-input" />
            </div>
            <button type="submit" :disabled="savingFertilizer" class="submit-btn">
              <UIcon v-if="savingFertilizer" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
              {{ savingFertilizer ? 'Saving...' : 'Save Record' }}
            </button>
          </form>

          <div class="space-y-2">
            <div v-for="r in project.fertilizerTable" :key="r.id" class="record-card">
              <div class="flex justify-between items-start mb-1">
                <span class="text-sm font-semibold text-stone-800">{{ r.type }} — {{ r.name }}</span>
                <span class="text-xs text-stone-400">{{ formatDate(r.date) }}</span>
              </div>
              <p class="text-xs text-emerald-600 font-medium mb-0.5">Stage: {{ r.stage }}</p>
              <p class="text-xs text-stone-500">{{ r.purpose }}</p>
            </div>
            <div v-if="!project.fertilizerTable.length" class="empty-state">No fertilizer records yet</div>
          </div>
        </section>

        <!-- ══ PROGRESS ══ -->
        <section v-if="currentView === 'progress'">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-stone-700 flex items-center gap-2">
              <UIcon name="i-heroicons-photo" class="w-4 h-4 text-emerald-600" /> Progress
            </h2>
            <button @click="toggleForm('progress')" class="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 hover:bg-emerald-700 transition-colors">
              <UIcon :name="showProgressForm ? 'i-heroicons-x-mark' : 'i-heroicons-plus'" class="w-3.5 h-3.5" />
              {{ showProgressForm ? 'Cancel' : 'Add' }}
            </button>
          </div>

          <form v-if="showProgressForm" @submit.prevent="saveProgressRecord" class="bg-white rounded-2xl p-4 shadow-sm mb-3 space-y-3 animate-form-in">
            <div>
              <label class="field-label">Date</label>
              <input v-model="newProgress.date" type="date" required class="field-input" />
            </div>
            <div>
              <label class="field-label">Stage / Milestone</label>
              <input v-model="newProgress.stage" placeholder="e.g. Germination complete" required class="field-input" />
            </div>
            <div>
              <label class="field-label">Photo (optional)</label>
              <label class="mt-1.5 flex items-center gap-3 cursor-pointer">
                <div class="flex items-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl bg-white text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                  <UIcon name="i-heroicons-camera" class="w-4 h-4" />
                  {{ imageFile ? imageFile.name : 'Choose photo' }}
                </div>
                <input type="file" @change="handleImageUpload" accept="image/*" class="sr-only" />
              </label>
              <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="mt-2 w-full max-h-48 object-cover rounded-xl border border-stone-200" />
            </div>
            <button type="submit" :disabled="savingProgress" class="submit-btn">
              <UIcon v-if="savingProgress" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
              {{ savingProgress ? 'Uploading...' : 'Save Progress' }}
            </button>
          </form>

          <!-- Progress Stats -->
          <div v-if="project.progressTable.length" class="bg-white rounded-2xl p-4 shadow-sm mb-3 flex items-center gap-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-emerald-600">{{ project.progressTable.length }}</p>
              <p class="text-xs text-stone-400">Milestones</p>
            </div>
            <div class="flex-1">
              <div class="flex justify-between text-xs text-stone-400 mb-1">
                <span>{{ formatDate(project.startDate) }}</span>
                <span>{{ progressPercent }}% elapsed</span>
              </div>
              <div class="w-full bg-stone-100 rounded-full h-2">
                <div class="h-2 rounded-full bg-emerald-500" :style="{ width: progressPercent + '%' }"></div>
              </div>
              <div class="mt-1 text-xs text-stone-400">
                Latest: {{ project.progressTable.slice().sort((a,b) => new Date(b.date)-new Date(a.date))[0]?.stage }}
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div v-if="project.progressTable.length" class="relative pl-6">
            <div class="absolute left-2.5 top-0 bottom-0 w-px bg-stone-200"></div>
            <div v-for="(r, idx) in [...project.progressTable].sort((a,b) => new Date(b.date)-new Date(a.date))" :key="r.id" class="relative mb-4">
              <div class="absolute -left-[18px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                :class="idx === 0 ? 'bg-emerald-500' : 'bg-stone-300'">
              </div>
              <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                <div v-if="r.imageUrl" class="aspect-video relative">
                  <img :src="r.imageUrl" :alt="r.stage" class="w-full h-full object-cover" loading="lazy" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                    <p class="text-white text-sm font-semibold">{{ r.stage }}</p>
                    <p class="text-white/70 text-xs">{{ formatDate(r.date) }}</p>
                  </div>
                </div>
                <div v-else class="p-4 flex items-center gap-3">
                  <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-heroicons-flag" class="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-stone-800">{{ r.stage }}</p>
                    <p class="text-xs text-stone-400 mt-0.5">{{ formatDate(r.date) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">No progress milestones yet</div>
        </section>

        <!-- ══ AUDIT ══ -->
        <section v-if="currentView === 'audit'">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-stone-700 flex items-center gap-2">
              <UIcon name="i-heroicons-clipboard-document-list" class="w-4 h-4 text-emerald-600" /> Activity Audit
            </h2>
            <span class="text-xs text-stone-400 bg-white px-2.5 py-1 rounded-xl border border-stone-100">{{ auditFeed.length }} records</span>
          </div>

          <!-- Summary chips -->
          <div class="flex gap-2 flex-wrap mb-4">
            <div class="bg-white rounded-xl px-3 py-2 shadow-sm border border-stone-100 text-center flex-1 min-w-[80px]">
              <p class="text-base font-bold text-stone-800">{{ project.laborTable.length }}</p>
              <p class="text-xs text-stone-400">Labour</p>
            </div>
            <div class="bg-white rounded-xl px-3 py-2 shadow-sm border border-stone-100 text-center flex-1 min-w-[80px]">
              <p class="text-base font-bold text-stone-800">{{ project.harvestTable.length }}</p>
              <p class="text-xs text-stone-400">Harvest</p>
            </div>
            <div class="bg-white rounded-xl px-3 py-2 shadow-sm border border-stone-100 text-center flex-1 min-w-[80px]">
              <p class="text-base font-bold text-stone-800">{{ project.sprayingTable.length }}</p>
              <p class="text-xs text-stone-400">Spray</p>
            </div>
            <div class="bg-white rounded-xl px-3 py-2 shadow-sm border border-stone-100 text-center flex-1 min-w-[80px]">
              <p class="text-base font-bold text-stone-800">{{ project.fertilizerTable.length }}</p>
              <p class="text-xs text-stone-400">Fertilizer</p>
            </div>
          </div>

          <!-- Grouped by date -->
          <div v-if="auditFeed.length" class="space-y-4">
            <div v-for="([date, entries]) in auditFeedByDate" :key="date">
              <p class="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2 px-1">{{ formatDate(date) }}</p>
              <div class="space-y-2">
                <div v-for="(entry, i) in entries" :key="i" class="bg-white rounded-xl p-3.5 shadow-sm border border-stone-100 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" :class="entry.color">
                    <UIcon :name="entry.icon" class="w-4 h-4" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 mb-0.5">
                      <span class="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-500">{{ entry.type }}</span>
                    </div>
                    <p class="text-sm font-medium text-stone-800 leading-snug">{{ entry.title }}</p>
                    <p class="text-xs text-stone-400 mt-0.5 leading-snug">{{ entry.detail }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">No activity recorded yet</div>
        </section>

        <!-- ══ FINANCIALS ══ -->
        <section v-if="currentView === 'financials'">
          <h2 class="text-sm font-semibold text-stone-700 flex items-center gap-2 mb-3">
            <UIcon name="i-heroicons-banknotes" class="w-4 h-4 text-emerald-600" /> Financial Summary
          </h2>

          <!-- Net summary -->
          <div class="bg-white rounded-2xl shadow-sm p-5 mb-3">
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="bg-emerald-50 rounded-xl p-3">
                <p class="text-xs text-stone-500 mb-1">Total Revenue</p>
                <p class="text-lg font-bold text-emerald-700">Ksh {{ formatNum(totalRevenue) }}</p>
              </div>
              <div class="bg-red-50 rounded-xl p-3">
                <p class="text-xs text-stone-500 mb-1">Total Costs</p>
                <p class="text-lg font-bold text-red-600">Ksh {{ formatNum(totalCosts) }}</p>
              </div>
            </div>
            <div class="border-t border-stone-100 pt-3">
              <p class="text-xs text-stone-500 mb-1">Net Profit</p>
              <p class="text-2xl font-bold" :class="netProfit >= 0 ? 'text-emerald-700' : 'text-red-600'">
                Ksh {{ formatNum(netProfit) }}
              </p>
            </div>
          </div>

          <!-- Breakdown -->
          <div class="bg-white rounded-2xl shadow-sm divide-y divide-stone-100">
            <div class="flex justify-between items-center px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-red-400 rounded-full"></div>
                <span class="text-sm text-stone-700">Labor Costs</span>
              </div>
              <span class="text-sm font-semibold text-stone-700">Ksh {{ formatNum(laborCosts) }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span class="text-sm text-stone-700">Land Prep Costs</span>
              </div>
              <span class="text-sm font-semibold text-stone-700">Ksh {{ formatNum(landPrepCosts) }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span class="text-sm text-stone-700">Harvest Revenue</span>
              </div>
              <span class="text-sm font-semibold text-emerald-600">Ksh {{ formatNum(harvestRevenue) }}</span>
            </div>
          </div>
        </section>

      </div>

      <!-- Download Report button (bottom) -->
      <div class="mx-4 mt-5">
        <button @click="generateReport" class="w-full flex items-center justify-center gap-2 bg-stone-800 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-stone-900 active:scale-[0.98] transition-all">
          <UIcon name="i-heroicons-arrow-down-tray" class="w-4 h-4" />
          Download Full Report
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '~/stores/project';
import * as XLSX from 'xlsx';

definePageMeta({ middleware: 'auth' });

const route = useRoute();
const projectStore = useProjectStore();

// ── Reactive project from store ──────────────────────────────────────────────
const project = computed(() => projectStore.projects.find((p) => p.id === route.params.id) || null);

onMounted(async () => {
  if (projectStore.projects.length === 0) {
    try { await projectStore.fetchProjects(); } catch (e) { console.error(e); }
  }
  if (!project.value) {
    try { await projectStore.getProjectById(route.params.id); } catch (e) { console.error(e); }
  }
});

// ── Views ────────────────────────────────────────────────────────────────────
const currentView = ref('labour');
const views = [
  { id: 'labour',     label: 'Labour',     icon: 'i-heroicons-users' },
  { id: 'landPrep',   label: 'Land Prep',  icon: 'i-heroicons-wrench-screwdriver' },
  { id: 'harvest',    label: 'Harvest',    icon: 'i-heroicons-archive-box' },
  { id: 'spray',      label: 'Spray',      icon: 'i-heroicons-beaker' },
  { id: 'fertilizer', label: 'Fertilizer', icon: 'i-heroicons-cube' },
  { id: 'progress',   label: 'Progress',   icon: 'i-heroicons-photo' },
  { id: 'financials', label: 'Finance',    icon: 'i-heroicons-banknotes' },
  { id: 'audit',      label: 'Audit',      icon: 'i-heroicons-clipboard-document-list' },
];

// ── Form visibility ──────────────────────────────────────────────────────────
const showLaborForm     = ref(false);
const showLandPrepForm  = ref(false);
const showHarvestForm   = ref(false);
const showSprayingForm  = ref(false);
const showFertilizerForm = ref(false);
const showProgressForm  = ref(false);

const toggleForm = (type) => {
  const map = { labor: showLaborForm, landPrep: showLandPrepForm, harvest: showHarvestForm, spray: showSprayingForm, fertilizer: showFertilizerForm, progress: showProgressForm };
  map[type].value = !map[type].value;
};

// ── Saving states ────────────────────────────────────────────────────────────
const savingLabor      = ref(false);
const savingLandPrep   = ref(false);
const savingHarvest    = ref(false);
const savingSpraying   = ref(false);
const savingFertilizer = ref(false);
const savingProgress   = ref(false);

// ── Form models ──────────────────────────────────────────────────────────────
const newLabor = ref({ date: '', numberOfWorkers: '', taskPerformed: '', hoursWorked: '', wageRate: '', cropArea: '' });
const newLandPrep = ref({ date: '', landPrepLabor: '', prepDescription: '', prepPrice: '' });
const newHarvest = ref({ date: '', quantity: '', quality: '', pricePerUnit: '' });
const newSpraying = ref({ date: '', serialNo: '', tradeName: '', regNo: '', activeIngredients: '', manufacturer: '', agent: '', uses: '' });
const newFertilizer = ref({ date: '', type: '', stage: '', name: '', purpose: '' });
const newProgress = ref({ date: '', stage: '' });
const imageFile = ref(null);
const imagePreview = ref(null);

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });
};
const formatNum = (n) => {
  const num = Number(n);
  if (isNaN(num)) return '0';
  return num.toLocaleString('en-KE');
};

// ── Financial computeds ──────────────────────────────────────────────────────
// ── Progress percentage ──────────────────────────────────────────────────────
const progressPercent = computed(() => {
  if (!project.value?.startDate || !project.value?.duration) return 0;
  const start = new Date(project.value.startDate).getTime();
  const end = start + project.value.duration * 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const pct = Math.round(((now - start) / (end - start)) * 100);
  return Math.min(100, Math.max(0, pct));
});

// ── Audit feed ───────────────────────────────────────────────────────────────
const auditFeed = computed(() => {
  if (!project.value) return [];
  const entries = [
    ...(project.value.laborTable || []).map(r => ({
      type: 'Labour', icon: 'i-heroicons-users', color: 'bg-blue-100 text-blue-600',
      title: r.taskPerformed || 'Labor record',
      detail: `${r.numberOfWorkers} workers · ${r.hoursWorked} hrs · Ksh ${formatNum(r.numberOfWorkers * r.wageRate)}`,
      date: r.date, createdAt: r.createdAt,
    })),
    ...(project.value.landPrepTable || []).map(r => ({
      type: 'Land Prep', icon: 'i-heroicons-wrench-screwdriver', color: 'bg-orange-100 text-orange-600',
      title: r.landPrepLabor || 'Land prep record',
      detail: `${r.prepDescription} · Ksh ${formatNum(r.prepPrice)}`,
      date: r.date, createdAt: r.createdAt,
    })),
    ...(project.value.harvestTable || []).map(r => ({
      type: 'Harvest', icon: 'i-heroicons-archive-box', color: 'bg-emerald-100 text-emerald-600',
      title: `${r.quantity} units harvested`,
      detail: `${r.quality} grade · Ksh ${formatNum(r.pricePerUnit)}/unit · Total Ksh ${formatNum(r.quantity * r.pricePerUnit)}`,
      date: r.date, createdAt: r.createdAt,
    })),
    ...(project.value.sprayingTable || []).map(r => ({
      type: 'Spraying', icon: 'i-heroicons-beaker', color: 'bg-purple-100 text-purple-600',
      title: r.tradeName || 'Spraying record',
      detail: `${r.activeIngredients} · ${r.manufacturer}`,
      date: r.date, createdAt: r.createdAt,
    })),
    ...(project.value.fertilizerTable || []).map(r => ({
      type: 'Fertilizer', icon: 'i-heroicons-cube', color: 'bg-amber-100 text-amber-600',
      title: `${r.type} — ${r.name || 'Fertilizer'}`,
      detail: `Stage: ${r.stage} · ${r.purpose}`,
      date: r.date, createdAt: r.createdAt,
    })),
    ...(project.value.progressTable || []).map(r => ({
      type: 'Progress', icon: 'i-heroicons-photo', color: 'bg-stone-100 text-stone-600',
      title: r.stage || 'Progress milestone',
      detail: r.imageUrl ? 'Photo attached' : 'No photo',
      date: r.date, createdAt: r.createdAt,
    })),
  ];
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
});

const auditFeedByDate = computed(() => {
  const groups = {};
  for (const entry of auditFeed.value) {
    const key = entry.date || 'Unknown date';
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }
  return Object.entries(groups).sort(([a], [b]) => new Date(b) - new Date(a));
});

const laborCosts = computed(() =>
  (project.value?.laborTable || []).reduce((sum, r) => sum + (r.numberOfWorkers * r.wageRate || 0), 0)
);
const landPrepCosts = computed(() =>
  (project.value?.landPrepTable || []).reduce((sum, r) => sum + (Number(r.prepPrice) || 0), 0)
);
const harvestRevenue = computed(() =>
  (project.value?.harvestTable || []).reduce((sum, r) => sum + (r.quantity * r.pricePerUnit || 0), 0)
);
const totalRevenue = computed(() => harvestRevenue.value);
const totalCosts   = computed(() => laborCosts.value + landPrepCosts.value);
const netProfit    = computed(() => totalRevenue.value - totalCosts.value);

// ── Image upload ─────────────────────────────────────────────────────────────
const handleImageUpload = (e) => {
  const file = e?.target?.files?.[0];
  if (!file || !file.type.startsWith('image/')) return;
  if (file.size > 2 * 1024 * 1024) { alert('Image must be under 2MB'); return; }
  imageFile.value = file;
  const reader = new FileReader();
  reader.onload = (ev) => (imagePreview.value = ev.target.result);
  reader.readAsDataURL(file);
};

// ── Save actions ─────────────────────────────────────────────────────────────
const saveLaborRecord = async () => {
  try {
    savingLabor.value = true;
    await projectStore.addLaborRecord(project.value.id, newLabor.value);
    newLabor.value = { date: '', numberOfWorkers: '', taskPerformed: '', hoursWorked: '', wageRate: '', cropArea: '' };
    showLaborForm.value = false;
  } catch (e) { console.error(e); } finally { savingLabor.value = false; }
};

const saveLandPrepRecord = async () => {
  try {
    savingLandPrep.value = true;
    await projectStore.addLandPrepRecord(project.value.id, newLandPrep.value);
    newLandPrep.value = { date: '', landPrepLabor: '', prepDescription: '', prepPrice: '' };
    showLandPrepForm.value = false;
  } catch (e) { console.error(e); } finally { savingLandPrep.value = false; }
};

const saveHarvestRecord = async () => {
  try {
    savingHarvest.value = true;
    await projectStore.addHarvestRecord(project.value.id, newHarvest.value);
    newHarvest.value = { date: '', quantity: '', quality: '', pricePerUnit: '' };
    showHarvestForm.value = false;
  } catch (e) { console.error(e); } finally { savingHarvest.value = false; }
};

const saveSprayingRecord = async () => {
  try {
    savingSpraying.value = true;
    await projectStore.addSprayingRecord(project.value.id, newSpraying.value);
    newSpraying.value = { date: '', serialNo: '', tradeName: '', regNo: '', activeIngredients: '', manufacturer: '', agent: '', uses: '' };
    showSprayingForm.value = false;
  } catch (e) { console.error(e); } finally { savingSpraying.value = false; }
};

const saveFertilizerRecord = async () => {
  try {
    savingFertilizer.value = true;
    await projectStore.addFertilizerRecord(project.value.id, newFertilizer.value);
    newFertilizer.value = { date: '', type: '', stage: '', name: '', purpose: '' };
    showFertilizerForm.value = false;
  } catch (e) { console.error(e); } finally { savingFertilizer.value = false; }
};

const saveProgressRecord = async () => {
  if (!project.value?.id) return;
  try {
    savingProgress.value = true;
    await projectStore.addProgressPrepRecord(project.value.id, newProgress.value, imageFile.value);
    newProgress.value = { date: '', stage: '' };
    imageFile.value = null;
    imagePreview.value = null;
    showProgressForm.value = false;
  } catch (e) { console.error(e); } finally { savingProgress.value = false; }
};

// ── Report ───────────────────────────────────────────────────────────────────
const generateReport = () => {
  if (!project.value) return;
  try {
    const wb = XLSX.utils.book_new();
    const p = project.value;
    const lc = laborCosts.value;
    const lpc = landPrepCosts.value;
    const hr = harvestRevenue.value;
    const total = lc + lpc;
    const net = hr - total;

    // ── Sheet 1: Summary ──
    const summaryData = [
      ['PROJECT REPORT', ''],
      ['', ''],
      ['Project Name', p.projectName],
      ['Description', p.description],
      ['Start Date', p.startDate],
      ['Duration', `${p.duration} months`],
      ['Land Size', `${p.landSize} acres`],
      ['Progress', `${progressPercent.value}%`],
      ['Report Generated', new Date().toLocaleDateString('en-KE')],
      ['', ''],
      ['FINANCIAL SUMMARY', ''],
      ['Total Revenue (Harvest)', `Ksh ${hr.toLocaleString('en-KE')}`],
      ['Total Costs (Labor + Land Prep)', `Ksh ${total.toLocaleString('en-KE')}`],
      ['  - Labor Costs', `Ksh ${lc.toLocaleString('en-KE')}`],
      ['  - Land Prep Costs', `Ksh ${lpc.toLocaleString('en-KE')}`],
      ['Net Profit / Loss', `Ksh ${net.toLocaleString('en-KE')}`],
      ['', ''],
      ['RECORD COUNTS', ''],
      ['Labor Records', p.laborTable.length],
      ['Land Prep Records', p.landPrepTable.length],
      ['Harvest Records', p.harvestTable.length],
      ['Spraying Records', p.sprayingTable.length],
      ['Fertilizer Records', p.fertilizerTable.length],
      ['Progress Milestones', p.progressTable.length],
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summaryData), 'Summary');

    // ── Sheet 2: Audit log ──
    const auditRows = auditFeed.value.map(e => [e.date, e.type, e.title, e.detail]);
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
      ['Date', 'Category', 'Activity', 'Details'],
      ...auditRows,
    ]), 'Audit Log');

    // ── Sheet 3: Labor ──
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
      ['Date', 'Workers', 'Task Performed', 'Hours', 'Wage Rate (Ksh)', 'Total Wages (Ksh)', 'Area (ac)'],
      ...p.laborTable.map((r) => [r.date, r.numberOfWorkers, r.taskPerformed, r.hoursWorked, r.wageRate, r.numberOfWorkers * r.wageRate, r.cropArea]),
    ]), 'Labor');

    // ── Sheet 4: Land Prep ──
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
      ['Date', 'Labor Type', 'Description', 'Cost (Ksh)'],
      ...p.landPrepTable.map((r) => [r.date, r.landPrepLabor, r.prepDescription, r.prepPrice]),
    ]), 'Land Prep');

    // ── Sheet 5: Harvest ──
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
      ['Date', 'Quantity', 'Quality', 'Price/Unit (Ksh)', 'Total Revenue (Ksh)'],
      ...p.harvestTable.map((r) => [r.date, r.quantity, r.quality, r.pricePerUnit, r.quantity * r.pricePerUnit]),
    ]), 'Harvest');

    // ── Sheet 6: Spraying ──
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
      ['Date', 'Serial No', 'Trade Name', 'Reg No', 'Active Ingredients', 'Manufacturer', 'Agent', 'Uses'],
      ...p.sprayingTable.map((r) => [r.date, r.serialNo, r.tradeName, r.regNo, r.activeIngredients, r.manufacturer, r.agent, r.uses]),
    ]), 'Spraying');

    // ── Sheet 7: Fertilizer ──
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
      ['Date', 'Stage', 'Type', 'Name', 'Purpose'],
      ...p.fertilizerTable.map((r) => [r.date, r.stage, r.type, r.name, r.purpose]),
    ]), 'Fertilizer');

    // ── Sheet 8: Progress ──
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
      ['Date', 'Milestone / Stage', 'Photo URL'],
      ...p.progressTable.map((r) => [r.date, r.stage, r.imageUrl || '']),
    ]), 'Progress');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${p.projectName}-report.xlsx`;
    link.click();
  } catch (e) { console.error('Report error:', e); }
};
</script>

<style scoped>
.field-label {
  @apply block text-xs font-medium text-stone-600 mb-1.5;
}
.field-input {
  @apply w-full px-3 py-2.5 border border-stone-200 rounded-xl bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-stone-300;
  font-size: 16px; /* prevents iOS zoom */
}
.submit-btn {
  @apply w-full bg-emerald-600 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 active:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
.record-card {
  @apply bg-white rounded-xl p-4 border border-stone-100 shadow-sm;
}
.empty-state {
  @apply text-center text-sm text-stone-400 py-10 bg-white rounded-2xl border border-dashed border-stone-200;
}
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
@keyframes form-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-form-in { animation: form-in 0.2s ease-out; }
</style>
