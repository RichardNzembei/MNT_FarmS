<template>
    <div class=" p-4 sm:p-6 font-inter antialiased text-stone-800 bg-gray-200 dark:bg-gray-200 min-h-screen">
      <!-- Back Button -->
      <NuxtLink
        to="/existingproject"
        class="flex items-center text-emerald-700 hover:text-emerald-800 mb-6 p-3 -ml-3 rounded-full transition-all duration-300 active:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 group"
        aria-label="Go back to projects"
      >
        <UIcon
          name="i-mdi-arrow-left"
          class="w-7 h-7 mr-2 transition-transform duration-300 group-hover:-translate-x-1.5"
        />
        <span class="text-lg font-semibold tracking-wide">Back to Projects</span>
      </NuxtLink>
  
      <!-- Main Content -->
      <div class="max-w-md sm:max-w-lg mx-auto">
        <!-- Loading/Not Found State -->
        <div v-if="!project" class="bg-white rounded-3xl p-8 text-center shadow-md">
          <UIcon name="i-mdi-loading" class="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
          <p class="text-stone-600 text-lg font-medium">Loading project details...</p>
        </div>
  
        <!-- Project Content -->
        <div v-else class="bg-white rounded-3xl shadow-md overflow-hidden relative">
          <!-- Decorative Leaf Overlay -->
          <div class="absolute inset-0 opacity-5 bg-leaf-pattern pointer-events-none"></div>
  
          <!-- Project Header -->
          <div class="p-6 border-b border-stone-100">
            <div class="flex items-start space-x-5">
              <div class="bg-emerald-100 p-3 rounded-xl">
                <UIcon name="i-lucide-file" class="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h1 class="text-2xl font-playfair font-bold text-stone-900 line-clamp-2">{{ project.projectName }}</h1>
                <p class="text-base text-stone-600 mt-2 line-clamp-3">{{ project.description }}</p>
              </div>
            </div>
          </div>
  
          <!-- Project Metadata -->
          <div class="p-6 grid grid-cols-2 gap-5 text-base">
            <div class="flex items-start space-x-3">
              <UIcon name="i-lucide-calendar" class="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-stone-500 text-sm">Duration</p>
                <p class="font-semibold">{{ project.duration }} months</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <UIcon name="i-lucide-calendar-days" class="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-stone-500 text-sm">Start Date</p>
                <p class="font-semibold">{{ project.startDate }}</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <UIcon name="i-lucide-land-plot" class="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-stone-500 text-sm">Land Size</p>
                <p class="font-semibold">{{ project.landSize }} Acres</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <UIcon name="i-lucide-bar-chart" class="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-stone-500 text-sm">Progress</p>
                <p class="font-semibold">{{ project.progress || 0 }}%</p>
              </div>
            </div>
          </div>
  
          <!-- Records Navigation -->
          <div class="px-6 pb-3 border-b border-stone-100">
            <div class="relative">
              <div class="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-emerald-300">
                <div class="flex space-x-3 w-max">
                  <button
                    v-for="view in views"
                    :key="view.id"
                    @click="setView(view.id)"
                    class="flex items-center px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    :class="{
                      'bg-emerald-100 text-emerald-700': currentView === view.id,
                      'bg-stone-100 text-stone-700 hover:bg-stone-200': currentView !== view.id
                    }"
                    :aria-label="`View ${view.label} records`"
                    role="tab"
                    :aria-selected="currentView === view.id"
                  >
                    <UIcon :name="view.icon" class="w-5 h-5 mr-2" />
                    {{ view.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Current View Content -->
          <div class="p-6">
            <!-- Labor Records -->
            <section v-if="currentView === 'labour'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold flex items-center">
                  <UIcon name="i-lucide-users" class="w-6 h-6 text-emerald-600 mr-3" />
                  Labor Records
                </h2>
                <button
                  @click="toggleForm('labor')"
                  class="flex items-center bg-emerald-600 text-white py-2.5 px-5 rounded-full active:bg-emerald-700 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :aria-expanded="showLaborForm"
                >
                  <UIcon name="i-lucide-plus" class="w-5 h-5 mr-2" />
                  {{ showLaborForm ? 'Cancel' : 'Add Record' }}
                </button>
              </div>
  
              <form
                v-if="showLaborForm"
                @submit.prevent="saveLaborRecord"
                class="bg-emerald-50 p-5 rounded-2xl space-y-5 animation-fade-slide"
              >
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Date</label>
                  <input
                    v-model="newLabor.date"
                    type="date"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
  
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-1.5">Workers</label>
                    <input
                      v-model.number="newLabor.numberOfWorkers"
                      type="number"
                      placeholder="0"
                      required
                      class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-1.5">Hours</label>
                    <input
                      v-model.number="newLabor.hoursWorked"
                      type="number"
                      placeholder="0"
                      required
                      class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    />
                  </div>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Task</label>
                  <input
                    v-model="newLabor.taskPerformed"
                    placeholder="Task performed"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
  
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-1.5">Wage Rate</label>
                    <input
                      v-model.number="newLabor.wageRate"
                      type="number"
                      placeholder="Ksh"
                      required
                      class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-1.5">Area</label>
                    <input
                      v-model.number="newLabor.cropArea"
                      type="number"
                      placeholder="Acres"
                      required
                      class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    />
                  </div>
                </div>
  
                <button
                  type="submit"
                  class="w-full bg-emerald-600 text-white py-3 px-5 rounded-full active:bg-emerald-700 text-base font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :disabled="savingLabor"
                >
                  <UIcon v-if="savingLabor" name="i-mdi-loading" class="w-5 h-5 mr-2 animate-spin" />
                  {{ savingLabor ? 'Saving...' : 'Save Record' }}
                </button>
              </form>
  
              <div class="space-y-4">
                <div
                  v-for="record in project.laborTable"
                  :key="record.id"
                  class="bg-white p-4 rounded-xl border border-stone-200 hover:bg-emerald-50 active:bg-emerald-100 transition-all duration-200"
                >
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div><span class="font-semibold">Date:</span> {{record.date }}</div>
                    <div><span class="font-semibold">Workers:</span> {{ record.numberOfWorkers }}</div>
                    <div><span class="font-semibold">Task:</span> {{ record.taskPerformed }}</div>
                    <div><span class="font-semibold">Hours:</span> {{ record.hoursWorked }}</div>
                    <div><span class="font-semibold">Wage:</span> {{ record.wageRate }}</div>
                    <div><span class="font-semibold">Area:</span> {{ record.cropArea }}</div>
                    <div class="col-span-2">
                      <span class="font-semibold">Total:</span>
                      <span class="text-emerald-600 font-medium">{{record.numberOfWorkers * record.wageRate }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="!project.laborTable.length" class="p-6 text-center text-stone-500 text-base">
                  No labor records found
                </div>
              </div>
            </section>
  
            <!-- Land Prep Records -->
            <section v-if="currentView === 'landPrep'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold flex items-center">
                  <UIcon name="i-lucide-shovel" class="w-6 h-6 text-emerald-600 mr-3" />
                  Land Prep Records
                </h2>
                <button
                  @click="toggleForm('landPrep')"
                  class="flex items-center bg-emerald-600 text-white py-2.5 px-5 rounded-full active:bg-emerald-700 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :aria-expanded="showLandPrepForm"
                >
                  <UIcon name="i-lucide-plus" class="w-5 h-5 mr-2" />
                  {{ showLandPrepForm ? 'Cancel' : 'Add Record' }}
                </button>
              </div>
  
              <form
                v-if="showLandPrepForm"
                @submit.prevent="saveLandPrepRecord"
                class="bg-emerald-50 p-5 rounded-2xl space-y-5 animation-fade-slide"
              >
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Date</label>
                  <input
                    v-model="newLandPrep.date"
                    type="date"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Labor</label>
                  <input
                    v-model="newLandPrep.landPrepLabor"
                    placeholder="Land Prep Labor"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Description</label>
                  <input
                    v-model="newLandPrep.prepDescription"
                    placeholder="Description"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Price</label>
                  <input
                    v-model.number="newLandPrep.prepPrice"
                    type="number"
                    placeholder="Labor Price"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full bg-emerald-600 text-white py-3 px-5 rounded-full active:bg-emerald-700 text-base font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :disabled="savingLandPrep"
                >
                  <UIcon v-if="savingLandPrep" name="i-mdi-loading" class="w-5 h-5 mr-2 animate-spin" />
                  {{ savingLandPrep ? 'Saving...' : 'Save Record' }}
                </button>
              </form>
  
              <div class="space-y-4">
                <div
                  v-for="record in project.landPrepTable"
                  :key="record.id"
                  class="bg-white p-4 rounded-xl border border-stone-200 hover:bg-emerald-50 active:bg-emerald-100 transition-all duration-200"
                >
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div><span class="font-semibold">Date:</span> {{ formatDate(record.date) }}</div>
                    <div><span class="font-semibold">Labor:</span> {{ record.landPrepLabor }}</div>
                    <div class="col-span-2"><span class="font-semibold">Description:</span> {{ record.prepDescription }}</div>
                    <div class="col-span-2">
                      <span class="font-semibold">Total:</span>
                      <span class="text-emerald-600 font-medium">{{ formatCurrency(record.prepPrice) }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="!project.landPrepTable.length" class="p-6 text-center text-stone-500 text-base">
                  No land prep records found
                </div>
              </div>
            </section>
  
            <!-- Harvest Records -->
            <section v-if="currentView === 'harvest'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold flex items-center">
                  <UIcon name="i-lucide-leaf" class="w-6 h-6 text-emerald-600 mr-3" />
                  Harvest Records
                </h2>
                <button
                  @click="toggleForm('harvest')"
                  class="flex items-center bg-emerald-600 text-white py-2.5 px-5 rounded-full active:bg-emerald-700 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :aria-expanded="showHarvestForm"
                >
                  <UIcon name="i-lucide-plus" class="w-5 h-5 mr-2" />
                  {{ showHarvestForm ? 'Cancel' : 'Add Record' }}
                </button>
              </div>
  
              <form
                v-if="showHarvestForm"
                @submit.prevent="saveHarvestRecord"
                class="bg-emerald-50 p-5 rounded-2xl space-y-5 animation-fade-slide"
              >
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Date</label>
                  <input
                    v-model="newHarvest.date"
                    type="date"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Quantity</label>
                  <input
                    v-model.number="newHarvest.quantity"
                    type="number"
                    placeholder="Quantity (kgs/cartons)"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Quality</label>
                  <input
                    v-model="newHarvest.quality"
                    placeholder="Local/Export"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Price/Unit</label>
                  <input
                    v-model.number="newHarvest.pricePerUnit"
                    type="number"
                    placeholder="Price per Unit"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full bg-emerald-600 text-white py-3 px-5 rounded-full active:bg-emerald-700 text-base font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :disabled="savingHarvest"
                >
                  <UIcon v-if="savingHarvest" name="i-mdi-loading" class="w-5 h-5 mr-2 animate-spin" />
                  {{ savingHarvest ? 'Saving...' : 'Save Record' }}
                </button>
              </form>
  
              <div class="space-y-4">
                <div
                  v-for="record in project.harvestTable"
                  :key="record.id"
                  class="bg-white p-4 rounded-xl border border-stone-200 hover:bg-emerald-50 active:bg-emerald-100 transition-all duration-200"
                >
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div><span class="font-semibold">Date:</span> {{ formatDate(record.date) }}</div>
                    <div><span class="font-semibold">Quantity:</span> {{ record.quantity }}</div>
                    <div><span class="font-semibold">Quality:</span> {{ record.quality }}</div>
                    <div><span class="font-semibold">Price:</span> {{ record.pricePerUnit }}</div>
                    <div class="col-span-2">
                      <span class="font-semibold">Total:</span>
                      <span class="text-emerald-600 font-medium">{{ formatCurrency(record.quantity * record.pricePerUnit) }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="!project.harvestTable.length" class="p-6 text-center text-stone-500 text-base">
                  No harvest records found
                </div>
              </div>
            </section>
  
            <!-- Spray Records -->
            <section v-if="currentView === 'spray'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold flex items-center">
                  <UIcon name="i-lucide-droplet" class="w-6 h-6 text-emerald-600 mr-3" />
                  Spraying Records
                </h2>
                <button
                  @click="toggleForm('spray')"
                  class="flex items-center bg-emerald-600 text-white py-2.5 px-5 rounded-full active:bg-emerald-700 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :aria-expanded="showSprayingForm"
                >
                  <UIcon name="i-lucide-plus" class="w-5 h-5 mr-2" />
                  {{ showSprayingForm ? 'Cancel' : 'Add Record' }}
                </button>
              </div>
  
              <form
                v-if="showSprayingForm"
                @submit.prevent="saveSprayingRecord"
                class="bg-emerald-50 p-5 rounded-2xl space-y-5 animation-fade-slide"
              >
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Date</label>
                  <input
                    v-model="newSpraying.date"
                    type="date"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Serial No</label>
                  <input
                    v-model="newSpraying.serialNo"
                    placeholder="Serial No"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Trade Name</label>
                  <input
                    v-model="newSpraying.tradeName"
                    placeholder="Trade Name"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Reg No</label>
                  <input
                    v-model="newSpraying.regNo"
                    placeholder="Registration No"
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Ingredients</label>
                  <input
                    v-model="newSpraying.activeIngredients"
                    placeholder="Active Ingredients"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Manufacturer</label>
                  <input
                    v-model="newSpraying.manufacturer"
                    placeholder="Manufacturer"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Agent</label>
                  <input
                    v-model="newSpraying.agent"
                    placeholder="Agent"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Uses</label>
                  <input
                    v-model="newSpraying.uses"
                    placeholder="Uses"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full bg-emerald-600 text-white py-3 px-5 rounded-full active:bg-emerald-700 text-base font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :disabled="savingSpraying"
                >
                  <UIcon v-if="savingSpraying" name="i-mdi-loading" class="w-5 h-5 mr-2 animate-spin" />
                  {{ savingSpraying ? 'Saving...' : 'Save Record' }}
                </button>
              </form>
  
              <div class="space-y-4">
                <div
                  v-for="record in project.sprayingTable"
                  :key="record.id"
                  class="bg-white p-4 rounded-xl border border-stone-200 hover:bg-emerald-50 active:bg-emerald-100 transition-all duration-200"
                >
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div><span class="font-semibold">Serial:</span> {{ record.serialNo }}</div>
                    <div><span class="font-semibold">Trade:</span> {{ record.tradeName }}</div>
                    <div><span class="font-semibold">Reg:</span> {{ record.regNo }}</div>
                    <div><span class="font-semibold">Ingredients:</span> {{ record.activeIngredients }}</div>
                    <div><span class="font-semibold">Manufacturer:</span> {{ record.manufacturer }}</div>
                    <div><span class="font-semibold">Agent:</span> {{ record.agent }}</div>
                    <div><span class="font-semibold">Uses:</span> {{ record.uses }}</div>
                    <div><span class="font-semibold">Date:</span> {{ formatDate(record.date) }}</div>
                  </div>
                </div>
                <div v-if="!project.sprayingTable.length" class="p-6 text-center text-stone-500 text-base">
                  No spraying records found
                </div>
              </div>
            </section>
  
            <!-- Fertilizer Records -->
            <section v-if="currentView === 'fertilizer'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold flex items-center">
                  <UIcon name="i-lucide-package" class="w-6 h-6 text-emerald-600 mr-3" />
                  Fertilizer Records
                </h2>
                <button
                  @click="toggleForm('fertilizer')"
                  class="flex items-center bg-emerald-600 text-white py-2.5 px-5 rounded-full active:bg-emerald-700 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :aria-expanded="showFertilizerForm"
                >
                  <UIcon name="i-lucide-plus" class="w-5 h-5 mr-2" />
                  {{ showFertilizerForm ? 'Cancel' : 'Add Record' }}
                </button>
              </div>
  
              <form
                v-if="showFertilizerForm"
                @submit.prevent="saveFertilizerRecord"
                class="bg-emerald-50 p-5 rounded-2xl space-y-5 animation-fade-slide"
              >
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Date</label>
                  <input
                    v-model="newFertilizer.date"
                    type="date"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Stage</label>
                  <input
                    v-model="newFertilizer.stage"
                    placeholder="Stage"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Type</label>
                  <input
                    v-model="newFertilizer.type"
                    placeholder="Type"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Name</label>
                  <input
                    v-model="newFertilizer.name"
                    placeholder="Name"
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Purpose</label>
                  <input
                    v-model="newFertilizer.purpose"
                    placeholder="Purpose"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full bg-emerald-600 text-white py-3 px-5 rounded-full active:bg-emerald-700 text-base font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :disabled="savingFertilizer"
                >
                  <UIcon v-if="savingFertilizer" name="i-mdi-loading" class="w-5 h-5 mr-2 animate-spin" />
                  {{ savingFertilizer ? 'Saving...' : 'Save Record' }}
                </button>
              </form>
  
              <div class="space-y-4">
                <div
                  v-for="record in project.fertilizerTable"
                  :key="record.id"
                  class="bg-white p-4 rounded-xl border border-stone-200 hover:bg-emerald-50 active:bg-emerald-100 transition-all duration-200"
                >
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div><span class="font-semibold">Stage:</span> {{ record.stage }}</div>
                    <div><span class="font-semibold">Type:</span> {{ record.type }}</div>
                    <div><span class="font-semibold">Name:</span> {{ record.name }}</div>
                    <div><span class="font-semibold">Purpose:</span> {{ record.purpose }}</div>
                    <div><span class="font-semibold">Date:</span> {{ formatDate(record.date) }}</div>
                  </div>
                </div>
                <div v-if="!project.fertilizerTable.length" class="p-6 text-center text-stone-500 text-base">
                  No fertilizer records found
                </div>
              </div>
            </section>
  
            <!-- Total Costs Section -->
            <section v-if="currentView === 'TotalCost'" class="space-y-6">
              <h2 class="text-xl font-semibold flex items-center">
                <UIcon name="i-lucide-wallet" class="w-6 h-6 text-emerald-600 mr-3" />
                Financial Summary
              </h2>
  
              <div class="bg-emerald-50 rounded-2xl p-5 space-y-5">
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-white p-4 rounded-xl shadow-sm">
                    <p class="text-sm text-stone-600 mb-1.5">Total Revenue</p>
                    <p class="text-xl font-bold text-emerald-600">under dev</p>
                  </div>
                  <div class="bg-white p-4 rounded-xl shadow-sm">
                    <p class="text-sm text-stone-600 mb-1.5">Total Costs</p>
                    <p class="text-xl font-bold text-red-600">under dev</p>
                  </div>
                </div>
  
                <div class="bg-white p-5 rounded-xl">
                  <p class="text-sm text-stone-600 mb-1.5">Net Profit</p>
                  <p
                    class="text-2xl font-bold"
                  >
                  under dev
                  </p>
                </div>
              </div>
  
              <div class="space-y-4">
                <div class="bg-white p-4 rounded-xl border border-stone-200 hover:bg-emerald-50 transition-all duration-200">
                  <div class="flex justify-between text-sm">
                    <span class="font-semibold">Labor Costs</span>
                    <span class="text-emerald-600 font-medium">under dev</span>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-stone-200 hover:bg-emerald-50 transition-all duration-200">
                  <div class="flex justify-between text-sm">
                    <span class="font-semibold">Land Preparation</span>
                    <span class="text-emerald-600 font-medium">under dev</span>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-stone-200 hover:bg-emerald-50 transition-all duration-200">
                  <div class="flex justify-between text-sm">
                    <span class="font-semibold">Harvest Revenue</span>
                    <span class="text-emerald-600 font-medium">under dev</span>
                  </div>
                </div>
              </div>
            </section>
  
            <!-- Progress Records -->
            <section v-if="currentView === 'progress'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold flex items-center">
                  <UIcon name="i-lucide-bar-chart-2" class="w-6 h-6 text-emerald-600 mr-3" />
                  Project Progress
                </h2>
                <button
                  @click="toggleForm('progress')"
                  class="flex items-center bg-emerald-600 text-white py-2.5 px-5 rounded-full active:bg-emerald-700 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :aria-expanded="showProgressForm"
                >
                  <UIcon name="i-lucide-plus" class="w-5 h-5 mr-2" />
                  {{ showProgressForm ? 'Cancel' : 'Add Record' }}
                </button>
              </div>
  
              <form
                v-if="showProgressForm"
                @submit.prevent="saveProgressRecord"
                class="bg-emerald-50 p-5 rounded-2xl space-y-5 animation-fade-slide"
              >
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Date</label>
                  <input
                    v-model="newProgress.date"
                    type="date"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Stage</label>
                  <input
                    v-model="newProgress.stage"
                    placeholder="Current stage"
                    required
                    class="w-full p-3 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-1.5">Upload Image</label>
                  <div class="mt-1.5 flex items-center">
                    <label class="cursor-pointer">
                      <div class="flex items-center justify-center px-5 py-3 border border-stone-300 rounded-lg bg-white text-sm font-semibold text-stone-700 active:bg-stone-50">
                        <UIcon name="i-lucide-upload" class="w-5 h-5 mr-2" />
                        Choose File
                      </div>
                      <input
                        type="file"
                        @change="handleImageUpload"
                        accept="image/*"
                        class="sr-only"
                      />
                    </label>
                    <span v-if="imageFile" class="ml-4 text-sm text-stone-600 truncate">{{ imageFile.name }}</span>
                  </div>
                  <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Preview"
                    class="mt-3 w-full h-auto max-h-56 object-contain rounded-xl border border-stone-200"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full bg-emerald-600 text-white py-3 px-5 rounded-full active:bg-emerald-700 text-base font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :disabled="savingProgress"
                >
                  <UIcon v-if="savingProgress" name="i-mdi-loading" class="w-5 h-5 mr-2 animate-spin" />
                  {{ savingProgress ? 'Saving...' : 'Save Progress' }}
                </button>
              </form>
  
              <div class="space-y-4">
                <div
                  v-for="record in project.progressTable"
                  :key="record.id"
                  class="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 active:scale-[0.98] transition-transform duration-300"
                >
                  <div class="relative aspect-video">
                    <img
                      :src="record.imageUrl"
                      :alt="`Progress photo for ${record.stage}`"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-5 flex flex-col justify-end">
                      <p class="text-white font-semibold text-lg">{{ record.stage }}</p>
                      <p class="text-white text-sm">{{ record.date}}</p>
                    </div>
                  </div>
                  <div class="p-5">
                    <div class="flex justify-between items-center">
                      <button class="text-emerald-600 text-base font-semibold flex items-center">
                        View Details
                        <UIcon name="i-lucide-chevron-right" class="w-5 h-5 ml-1" />
                      </button>
                      <span
                        class="px-3 py-1.5 rounded-full text-xs font-semibold"
                        :class="{
                          'bg-emerald-100 text-emerald-800': record.status === 'Completed',
                          'bg-blue-100 text-blue-800': record.status === 'In Progress',
                          'bg-amber-100 text-amber-800': !record.status || record.status === 'Pending'
                        }"
                      >
                        {{ record.status || 'Recorded' }}
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="!project.progressTable.length" class="text-center py-8 text-stone-500">
                  <UIcon name="i-lucide-camera-off" class="w-10 h-10 mx-auto mb-3 text-stone-300" />
                  <p class="text-base">No progress records yet</p>
                </div>
              </div>
            </section>
          </div>
  
          <!-- Report Generation -->
          <div class="p-6 border-t border-stone-100 bg-stone-50">
            <button
              @click="generateReport"
              class="w-full flex items-center justify-center bg-emerald-600 text-white py-3 px-5 rounded-full active:bg-emerald-700 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <UIcon name="i-lucide-download" class="w-6 h-6 mr-2" />
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
  
  /* Font Definitions */
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
  
  /* Leaf Pattern Background */
  .bg-leaf-pattern {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20 5C15 5 10 10 10 15C10 20 15 25 20 25C25 25 30 20 30 15C30 10 25 5 20 5ZM20 7C24 7 28 11 28 15C28 19 24 23 20 23C16 23 12 19 12 15C12 11 16 7 20 7Z' fill='%2399f6e4'/%3E%3C/svg%3E");
    background-repeat: repeat;
  }
  
  /* Custom Scrollbar */
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: #6ee7b7 #f5f5f4;
  }
  .scrollbar-thin::-webkit-scrollbar {
    height: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f5f5f4;
    border-radius: 3px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #6ee7b7;
    border-radius: 3px;
    transition: background 0.3s;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #10b981;
  }
  
  /* Input Placeholder */
  input::placeholder {
    color: #78716c;
    font-size: 0.875rem;
    opacity: 0.7;
  }
  
  /* Input Focus Animation */
  input:focus,
  input:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
  }
  
  /* Card Hover Effect */
  .card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  /* Disabled Button */
  button:disabled {
    background-color: #d6d3d1;
    color: #78716c;
    cursor: not-allowed;
    transform: none !important;
  }
  
  /* Form Animation */
  .animation-fade-slide {
    animation: fadeSlide 0.4s ease-out;
  }
  @keyframes fadeSlide {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Image Loading Animation */
  img[loading="lazy"] {
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
  }
  img[loading="lazy"][src] {
    opacity: 1;
  }
  
  /* Responsive Typography */
  h1 {
    font-size: clamp(1.5rem, 5vw, 1.875rem);
  }
  h2 {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
  }
  .text-base {
    font-size: clamp(0.875rem, 3.5vw, 1rem);
  }
  .text-sm {
    font-size: clamp(0.75rem, 3vw, 0.875rem);
  }
  
  /* Aspect Ratio */
  .aspect-video {
    aspect-ratio: 16 / 9;
  }
  
  /* Line Clamping */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Touch Targets */
  button,
  a,
  [role="button"] {
    min-height: 48px;
    min-width: 48px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Prevent Zoom on Input Focus */
  input,
  select,
  textarea {
    font-size: 16px;
  }
  
  /* Active State Effects */
  .active\:scale-95:active {
    transform: scale(0.95);
  }
  .active\:scale-98:active {
    transform: scale(0.98);
  }
  .active\:bg-emerald-700:active {
    background-color: #047857;
  }
  .active\:bg-stone-50:active {
    background-color: #f5f5f4;
  }
  
  /* Shadow Sizes */
  .shadow-sm {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  }
  .shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }
  
  /* Focus Rings */
  .focus\:ring-2:focus {
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
  }
  .focus\:border-emerald-500:focus {
    border-color: #10b981;
  }
  </style>
  <script setup>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import { useProjectStore } from "~/stores/project";
  import * as XLSX from "xlsx";
  
  // State Management
  const route = useRoute();
  const projectStore = useProjectStore();
  const project = ref(null);
  const currentView = ref("labour");
  const imageFile = ref(null);
  const imagePreview = ref(null);
  const loading = ref(false);
  
  // Form Visibility
  const showLaborForm = ref(false);
  const showLandPrepForm = ref(false);
  const showHarvestForm = ref(false);
  const showSprayingForm = ref(false);
  const showFertilizerForm = ref(false);
  const showProgressForm = ref(false);
  
  // Saving States
  const savingLabor = ref(false);
  const savingLandPrep = ref(false);
  const savingHarvest = ref(false);
  const savingSpraying = ref(false);
  const savingFertilizer = ref(false);
  const savingProgress = ref(false);
  
  // Form Data
  const newLabor = ref({
    date: "",
    numberOfWorkers: "",
    taskPerformed: "",
    hoursWorked: "",
    wageRate: "",
    cropArea: "",
  });
  const newLandPrep = ref({
    date: "",
    landPrepLabor: "",
    prepDescription: "",
    prepPrice: "",
  });
  const newHarvest = ref({
    date: "",
    quantity: "",
    quality: "",
    pricePerUnit: "",
  });
  const newSpraying = ref({
    serialNo: "",
    tradeName: "",
    regNo: "",
    activeIngredients: "",
    manufacturer: "",
    agent: "",
    uses: "",
    date: "",
  });
  const newFertilizer = ref({
    date: "",
    type: "",
    stage: "",
    purpose: "",
    name: "",
  });
  const newProgress = ref({
    date: "",
    stage: "",
  });
  
  // Navigation Views
  const views = [
    { id: "labour", label: "Labour", icon: "i-lucide-users" },
    { id: "landPrep", label: "Land Prep", icon: "i-lucide-tractor" },
    { id: "harvest", label: "Harvest", icon: "i-lucide-leaf" },
    { id: "spray", label: "Spray", icon: "i-lucide-droplet" },
    { id: "fertilizer", label: "Fertilizer", icon: "i-lucide-package" },
    { id: "TotalCost", label: "Total Costs", icon: "i-lucide-wallet" },
    { id: "progress", label: "Progress", icon: "i-lucide-bar-chart" },
  ];
  
  // Methods
  const setView = (view) => {
    currentView.value = view;
  };
  
  const toggleForm = (formType) => {
    const forms = {
      labor: showLaborForm,
      landPrep: showLandPrepForm,
      harvest: showHarvestForm,
      spray: showSprayingForm,
      fertilizer: showFertilizerForm,
      progress: showProgressForm,
    };
    forms[formType].value = !forms[formType].value;
  };
  
  const handleImageUpload = (event) => {
    if (!event?.target?.files?.length) return;
    const file = event.target.files[0];
    if (!file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) return; // 2MB limit
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => (imagePreview.value = e.target.result);
    reader.readAsDataURL(file);
  };
  
  const resetForm = () => {
    newProgress.value = { date: "", stage: "" };
    imageFile.value = null;
    imagePreview.value = null;
  };
  
  const saveLaborRecord = async () => {
    try {
      savingLabor.value = true;
      await projectStore.addLaborRecord(project.value.id, newLabor.value);
      newLabor.value = {
        date: "",
        numberOfWorkers: "",
        taskPerformed: "",
        hoursWorked: "",
        wageRate: "",
        cropArea: "",
      };
      showLaborForm.value = false;
    } catch (error) {
      console.error("Error saving labor record:", error);
    } finally {
      savingLabor.value = false;
    }
  };
  
  const saveLandPrepRecord = async () => {
    try {
      savingLandPrep.value = true;
      await projectStore.addLandPrepRecord(project.value.id, newLandPrep.value);
      newLandPrep.value = {
        date: "",
        landPrepLabor: "",
        prepDescription: "",
        prepPrice: "",
      };
      showLandPrepForm.value = false;
    } catch (error) {
      console.error("Error saving land prep record:", error);
    } finally {
      savingLandPrep.value = false;
    }
  };
  
  const saveHarvestRecord = async () => {
    try {
      savingHarvest.value = true;
      await projectStore.addHarvestRecord(project.value.id, newHarvest.value);
      newHarvest.value = {
        date: "",
        quantity: "",
        quality: "",
        pricePerUnit: "",
      };
      showHarvestForm.value = false;
    } catch (error) {
      console.error("Error saving harvest record:", error);
    } finally {
      savingHarvest.value = false;
    }
  };
  
  const saveSprayingRecord = async () => {
    try {
      savingSpraying.value = true;
      await projectStore.addSprayingRecord(project.value.id, newSpraying.value);
      newSpraying.value = {
        serialNo: "",
        tradeName: "",
        regNo: "",
        activeIngredients: "",
        manufacturer: "",
        agent: "",
        uses: "",
        date: "",
      };
      showSprayingForm.value = false;
    } catch (error) {
      console.error("Error saving spraying record:", error);
    } finally {
      savingSpraying.value = false;
    }
  };
  
  const saveFertilizerRecord = async () => {
    try {
      savingFertilizer.value = true;
      await projectStore.addFertilizerRecord(project.value.id, newFertilizer.value);
      newFertilizer.value = {
        date: "",
        type: "",
        stage: "",
        name: "",
        purpose: "",
      };
      showFertilizerForm.value = false;
    } catch (error) {
      console.error("Error saving fertilizer record:", error);
    } finally {
      savingFertilizer.value = false;
    }
  };
  
  const saveProgressRecord = async () => {
    if (!project.value?.id) return;
    try {
      savingProgress.value = true;
      await projectStore.addProgressPrepRecord(
        project.value.id,
        newProgress.value,
        imageFile.value
      );
      resetForm();
      showProgressForm.value = false;
    } catch (error) {
      console.error("Error saving progress record:", error);
    } finally {
      savingProgress.value = false;
    }
  };
  
  const generateReport = () => {
    try {
      const wb = XLSX.utils.book_new();
  
      // Labor Sheet
      const laborSheetData = [
        [
          "Date",
          "Number of Workers",
          "Task Performed",
          "Hours Worked",
          "Wage Rate",
          "Total Wages",
          "Crop Area",
        ],
        ...project.value.laborTable.map((record) => [
          record.date,
          record.numberOfWorkers,
          record.taskPerformed,
          record.hoursWorked,
          record.wageRate,
          record.numberOfWorkers * record.wageRate,
          record.cropArea,
        ]),
      ];
      const laborSheet = XLSX.utils.aoa_to_sheet(laborSheetData);
      XLSX.utils.book_append_sheet(wb, laborSheet, "Labor Records");
  
      // Land Prep Sheet
      const landPrepSheetData = [
        ["Date", "Labor", "Description", "Price"],
        ...project.value.landPrepTable.map((record) => [
          record.date,
          record.landPrepLabor,
          record.prepDescription,
          record.prepPrice,
        ]),
      ];
      const landPrepSheet = XLSX.utils.aoa_to_sheet(landPrepSheetData);
      XLSX.utils.book_append_sheet(wb, landPrepSheet, "Land Prep Records");
  
      // Harvest Sheet
      const harvestSheetData = [
        ["Date", "Quantity", "Quality", "Price/Unit", "Total"],
        ...project.value.harvestTable.map((record) => [
          record.date,
          record.quantity,
          record.quality,
          record.pricePerUnit,
          record.quantity * record.pricePerUnit,
        ]),
      ];
      const harvestSheet = XLSX.utils.aoa_to_sheet(harvestSheetData);
      XLSX.utils.book_append_sheet(wb, harvestSheet, "Harvest Records");
  
      // Spraying Sheet
      const sprayingSheetData = [
        [
          "Serial No",
          "Trade Name",
          "Reg No",
          "Active Ingredients",
          "Manufacturer",
          "Agent",
          "Uses",
          "Date",
        ],
        ...project.value.sprayingTable.map((record) => [
          record.serialNo,
          record.tradeName,
          record.regNo,
          record.activeIngredients,
          record.manufacturer,
          record.agent,
          record.uses,
          record.date,
        ]),
      ];
      const sprayingSheet = XLSX.utils.aoa_to_sheet(sprayingSheetData);
      XLSX.utils.book_append_sheet(wb, sprayingSheet, "Spraying Records");
  
      // Fertilizer Sheet
      const fertilizerSheetData = [
        ["Date", "Stage", "Type", "Name", "Purpose"],
        ...project.value.fertilizerTable.map((record) => [
          record.date,
          record.stage,
          record.type,
          record.name,
          record.purpose,
        ]),
      ];
      const fertilizerSheet = XLSX.utils.aoa_to_sheet(fertilizerSheetData);
      XLSX.utils.book_append_sheet(wb, fertilizerSheet, "Fertilizer Records");
  
      // Progress Sheet
      const progressSheetData = [
        ["Date", "Stage", "Status"],
        ...project.value.progressTable.map((record) => [
          record.date,
          record.stage,
          record.status,
        ]),
      ];
      const progressSheet = XLSX.utils.aoa_to_sheet(progressSheetData);
      XLSX.utils.book_append_sheet(wb, progressSheet, "Progress Records");
  
      // Generate and Download
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${project.value.projectName}-report.xlsx`;
      link.click();
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };
  
  // Initialize
  project.value = computed(() =>
    projectStore.projects.find((p) => p.id === route.params.id)
  ).value;
  </script>
  
  