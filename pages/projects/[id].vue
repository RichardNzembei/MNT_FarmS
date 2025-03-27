<template>
    <div class="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-4 sm:p-8">
        <!-- Back Button -->
        <NuxtLink to="/existingproject"
            class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300">
            <UIcon name="i-mdi-arrow-left"
                class="w-5 h-5 sm:w-6 sm:h-6 mr-2 transition-transform hover:-translate-x-2" />
            <span class="text-xs sm:text-sm font-medium">Back</span>
        </NuxtLink>

        <div class="flex items-center justify-center">
            <div v-if="!project" class="text-gray-500 text-base sm:text-xl font-semibold animate-pulse">
                project not found
            </div>

            <div v-else
                class="w-full max-w-4xl bg-white p-4 sm:p-8 rounded-lg shadow-lg animate-fade-in transition-transform transform hover:scale-105">
                <!-- Header -->
                <div class="flex items-center mb-4 sm:mb-6 space-x-2 sm:space-x-4">
                    <UIcon name="i-lucide-file" class="w-6 h-6 sm:w-10 sm:h-10 text-sky-500" />
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-green-700 tracking-wide">
                        Project Details
                    </h2>
                </div>

                <!-- Project Info -->
                <div class="mb-4 sm:mb-6">
                    <h3
                        class="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 space-x-2 sm:space-x-3">
                        <UIcon name="i-lucide-briefcase" class="w-6 h-6 sm:w-7 sm:h-7 text-green-500 animate-bounce" />
                        <span>{{ project.projectName }}</span>
                    </h3>
                    <p class="mt-2 sm:mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                        {{ project.description }}
                    </p>
                    <div class="mt-2 sm:mt-4 space-y-1 text-xs sm:text-base text-gray-700">
                        <p>
                            <span class="font-medium text-gray-800">Duration:</span>
                            {{ project.duration }} months
                        </p>
                        <p>
                            <span class="font-medium text-gray-800">Start Date:</span>
                            {{ project.startDate }}
                        </p>
                        <p>
                            <span class="font-medium text-gray-800">Land Size:</span>
                            {{ project.landSize }} Acres
                        </p>
                    </div>
                </div>

                <!-- Records Heading -->
                <div class="text-center mb-3 sm:mb-4">
                    <h1 class="text-green-500 text-2xl sm:text-3xl font-semibold mb-1">Records</h1>
                </div>

                <!-- Records Navigation -->
                <div class="flex flex-wrap sm:justify-center mb-4 sm:mb-6 gap-2 sm:gap-4">
                    <button
                        class="flex items-center justify-center border border-blue-500 text-blue-500 py-1 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white"
                        @click="setView('landPrep')" :class="{ 'bg-blue-500 text-white': currentView === 'landPrep' }">
                        <UIcon name="i-lucide-tractor" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        Land Prep
                    </button>
                    <button
                        class="flex items-center justify-center border border-blue-500 text-blue-500 py-1 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white"
                        @click="setView('labour')" :class="{ 'bg-blue-500 text-white': currentView === 'labour' }">
                        <UIcon name="i-lucide-users" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        Labour
                    </button>


                    <button
                        class="flex items-center justify-center border border-blue-500 text-blue-500 py-1 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white"
                        @click="setView('spray')" :class="{ 'bg-blue-500 text-white': currentView === 'spray' }">
                        <UIcon name="i-lucide-droplet" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        Spray
                    </button>
                    <button
                        class="flex items-center justify-center border border-blue-500 text-blue-500 py-1 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white"
                        @click="setView('fertilizer')"
                        :class="{ 'bg-blue-500 text-white': currentView === 'fertilizer' }">
                        <UIcon name="i-lucide-package" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        Fertilizer
                    </button>
                    <button
                        class="flex items-center justify-center border border-blue-500 text-blue-500 py-1 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white"
                        @click="setView('harvest')" :class="{ 'bg-blue-500 text-white': currentView === 'harvest' }">
                        <UIcon name="i-lucide-leaf" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        Harvest
                    </button>
                    <button
                        class="flex items-center justify-center border border-blue-500 text-blue-500 py-1 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white"
                        @click="setView('TotalCost')"
                        :class="{ 'bg-blue-500 text-white': currentView === 'TotalCost' }">
                        <UIcon name="i-lucide-wallet" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        Total Costs
                    </button>
                    <button
                        class="flex items-center justify-center border border-blue-500 text-blue-500 py-1 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white"
                        @click="setView('progress')" :class="{ 'bg-blue-500 text-white': currentView === 'progress' }">
                        <UIcon name="i-lucide-bar-chart" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        Progress
                    </button>
                </div>

                <!-- Labor Records Section -->
                <div v-if="currentView === 'labour'" class="mt-4 sm:mt-8">
                    <div class="flex items-center mb-2 sm:mb-4">
                        <UIcon name="i-lucide-clipboard" class="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
                        <h3 class="text-lg sm:text-xl font-semibold text-black">Labor Records</h3>
                    </div>
                    <button @click="toggleLaborForm"
                        class="flex items-center bg-blue-500 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 transition-all mb-3 sm:mb-4 text-xs sm:text-sm">
                        <UIcon name="i-lucide-plus" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {{ showLaborForm ? 'Hide Form' : 'Add Labor Record' }}
                    </button>
                    <form v-if="showLaborForm" @submit.prevent="saveLaborRecord"
                        class="bg-gray-50 p-3 sm:p-4 rounded-lg shadow mb-3 sm:mb-4 animate-slide-down">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                            <label for="date" class="text-black text-xs sm:text-sm">Date</label>
                            <input v-model="newLabor.date" type="date" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newLabor.numberOfWorkers" placeholder="Number of Workers" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newLabor.taskPerformed" placeholder="Task Performed" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newLabor.hoursWorked" placeholder="Hours Worked" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newLabor.wageRate" placeholder="Wage Rate" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newLabor.cropArea" placeholder="Crop Area" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                        </div>
                        <button type="submit"
                            class="bg-green-500 text-white py-1 px-3 sm:py-2 sm:px-4 mt-3 rounded-lg hover:bg-green-600 transition-all w-full sm:w-auto text-xs sm:text-sm"
                            :disabled="savingLabor">
                            {{ savingLabor ? 'Saving...' : 'Save' }}
                        </button>
                    </form>
                    <div class="overflow-x-auto mt-2 sm:mt-4 text-black">
                        <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden text-xs sm:text-sm">
                            <thead>
                                <tr class="bg-gray-100 border-b border-gray-300">
                                    <th class="p-2 sm:p-3 text-left">Date</th>
                                    <th class="p-2 sm:p-3 text-left">Workers</th>
                                    <th class="p-2 sm:p-3 text-left">Task</th>
                                    <th class="p-2 sm:p-3 text-left">Hours</th>
                                    <th class="p-2 sm:p-3 text-left">Wage(Per/W)</th>
                                    <th class="p-2 sm:p-3 text-left">Area(Acres)</th>
                                    <th class="p-2 sm:p-3 text-left">Total(KSH)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in project.laborTable" :key="record.id"
                                    class="border-t hover:bg-gray-50 transition-colors duration-200">
                                    <td class="p-2 sm:p-3">{{ record.date }}</td>
                                    <td class="p-2 sm:p-3">{{ record.numberOfWorkers }}</td>
                                    <td class="p-2 sm:p-3">{{ record.taskPerformed }}</td>
                                    <td class="p-2 sm:p-3">{{ record.hoursWorked }}</td>
                                    <td class="p-2 sm:p-3">{{ record.wageRate }}</td>
                                    <td class="p-2 sm:p-3">{{ record.cropArea }}</td>
                                    <td class="p-2 sm:p-3">{{ record.numberOfWorkers * record.wageRate }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Land Prep Records Section -->
                <div v-if="currentView === 'landPrep'" class="mt-4 sm:mt-8">
                    <div class="flex items-center mb-2 sm:mb-4">
                        <UIcon name="i-lucide-shovel" class="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />

                        <h3 class="text-lg sm:text-xl font-semibold text-black">Land Prep Records</h3>
                    </div>
                    <button @click="toggleLandPrepForm"
                        class="flex items-center bg-blue-500 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 transition-all mb-3 sm:mb-4 text-xs sm:text-sm">
                        <UIcon name="i-lucide-plus" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {{ showLandPrepForm ? 'Hide Form' : 'Add LandPrep Record' }}
                    </button>
                    <form v-if="showLandPrepForm" @submit.prevent="saveLandPrepRecord"
                        class="bg-gray-50 p-3 sm:p-4 rounded-lg shadow mb-3 sm:mb-4 animate-slide-down">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                            <label for="date" class="text-black text-xs sm:text-sm">Date</label>
                            <input v-model="newLandPrep.date" type="date" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newLandPrep.landPrepLabor" placeholder="Land Prep Labor" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newLandPrep.prepDescription" placeholder="Land Prep Description" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newLandPrep.prepPrice" placeholder="Labor Price" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                        </div>
                        <button type="submit"
                            class="bg-green-500 text-white py-1 px-3 sm:py-2 sm:px-4 mt-3 rounded-lg hover:bg-green-600 transition-all w-full sm:w-auto text-xs sm:text-sm"
                            :disabled="savingLandPrep">
                            {{ savingLandPrep ? 'Saving...' : 'Save' }}
                        </button>
                    </form>
                    <div class="overflow-x-auto mt-2 sm:mt-4 text-black">
                        <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden text-xs sm:text-sm">
                            <thead>
                                <tr class="bg-gray-100 border-b border-gray-300">
                                    <th class="p-2 sm:p-3 text-left">Date</th>
                                    <th class="p-2 sm:p-3 text-left">Labour Involved</th>
                                    <th class="p-2 sm:p-3 text-left">Description</th>
                                    <th class="p-2 sm:p-3 text-left">Total(KSH)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in project.landPrepTable" :key="record.id"
                                    class="border-t hover:bg-gray-50 transition-colors duration-200">
                                    <td class="p-2 sm:p-3">{{ record.date }}</td>
                                    <td class="p-2 sm:p-3">{{ record.landPrepLabor }}</td>
                                    <td class="p-2 sm:p-3">{{ record.prepDescription }}</td>
                                    <td class="p-2 sm:p-3">{{ record.prepPrice }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Harvest Records Section -->
                <div v-if="currentView === 'harvest'" class="mt-4 sm:mt-8">
                    <div class="flex items-center mb-2 sm:mb-4">
                        <UIcon name="i-lucide-clipboard" class="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
                        <h3 class="text-lg sm:text-xl font-semibold text-black">Harvest Records</h3>
                    </div>
                    <button @click="toggleHarvestForm"
                        class="flex items-center bg-blue-500 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 transition-all mb-3 sm:mb-4 text-xs sm:text-sm">
                        <UIcon name="i-lucide-plus" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {{ showHarvestForm ? 'Hide Form' : 'Add Harvest Record' }}
                    </button>
                    <form v-if="showHarvestForm" @submit.prevent="saveHarvestRecord"
                        class="bg-gray-50 p-3 sm:p-4 rounded-lg shadow mb-3 sm:mb-4 animate-slide-down">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                            <label for="date" class="text-black text-xs sm:text-sm">Date</label>
                            <input v-model="newHarvest.date" type="date" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newHarvest.quantity" placeholder="Number of (kgs/cartons/pieces)" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newHarvest.quality" placeholder="Local/Export" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newHarvest.pricePerUnit" placeholder="price per unit" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />

                        </div>
                        <button type="submit"
                            class="bg-green-500 text-white py-1 px-3 sm:py-2 sm:px-4 mt-3 rounded-lg hover:bg-green-600 transition-all w-full sm:w-auto text-xs sm:text-sm"
                            :disabled="savingHarvest">
                            {{ savingHarvest ? 'Saving...' : 'Save' }}
                        </button>
                    </form>
                    <div class="overflow-x-auto mt-2 sm:mt-4 text-black">
                        <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden text-xs sm:text-sm">
                            <thead>
                                <tr class="bg-gray-100 border-b border-gray-300">
                                    <th class="p-2 sm:p-3 text-left">Date</th>
                                    <th class="p-2 sm:p-3 text-left">Quantity(Kgs/ctns/pcs)</th>
                                    <th class="p-2 sm:p-3 text-left">Quality</th>
                                    <th class="p-2 sm:p-3 text-left">Price</th>
                                    <th class="p-2 sm:p-3 text-left">Total(Ksh)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in project.harvestTable" :key="record.id"
                                    class="border-t hover:bg-gray-50 transition-colors duration-200">
                                    <td class="p-2 sm:p-3">{{ record.date }}</td>
                                    <td class="p-2 sm:p-3">{{ record.quantity }}</td>
                                    <td class="p-2 sm:p-3">{{ record.quality }}</td>
                                    <td class="p-2 sm:p-3">{{ record.pricePerUnit }}</td>
                                    <td class="p-2 sm:p-3">{{ record.quantity * record.pricePerUnit }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Spraying Records Section -->
                <div v-if="currentView === 'spray'" class="mt-4 sm:mt-8">
                    <div class="flex items-center mb-2 sm:mb-4">
                        <UIcon name="i-lucide-search" class="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
                        <h3 class="text-lg sm:text-xl font-semibold text-black">Spraying Records</h3>
                    </div>
                    <button @click="toggleSprayingForm"
                        class="flex items-center bg-blue-500 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 transition-all mb-3 sm:mb-4 text-xs sm:text-sm">
                        <UIcon name="i-lucide-plus" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {{ showSprayingForm ? 'Hide Form' : 'Add Spraying Record' }}
                    </button>
                    <form v-if="showSprayingForm" @submit.prevent="saveSprayingRecord"
                        class="bg-gray-50 p-3 sm:p-4 rounded-lg shadow mb-3 sm:mb-4 animate-slide-down">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                            <label for="date" class="text-black text-xs sm:text-sm">Date</label>
                            <input v-model="newSpraying.date" type="date" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newSpraying.serialNo" placeholder="Serial No" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newSpraying.tradeName" placeholder="Trade Name" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newSpraying.regNo" placeholder="Registration No"
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newSpraying.activeIngredients" placeholder="Active Ingredients" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newSpraying.manufacturer" placeholder="Manufacturer" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newSpraying.agent" placeholder="Agent" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newSpraying.uses" placeholder="Uses" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                        </div>
                        <button type="submit"
                            class="bg-green-500 text-white py-1 px-3 sm:py-2 sm:px-4 mt-3 rounded-lg hover:bg-green-600 transition-all w-full sm:w-auto text-xs sm:text-sm"
                            :disabled="savingSpraying">
                            {{ savingSpraying ? 'Saving...' : 'Save' }}
                        </button>
                    </form>
                    <div class="overflow-x-auto mt-2 sm:mt-4 text-black">
                        <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden text-xs sm:text-sm">
                            <thead>
                                <tr class="bg-gray-100 border-b border-gray-300">
                                    <th class="p-2 sm:p-3 text-left">Serial No</th>
                                    <th class="p-2 sm:p-3 text-left">Trade Name</th>
                                    <th class="p-2 sm:p-3 text-left">Reg No</th>
                                    <th class="p-2 sm:p-3 text-left">Active Ingredients</th>
                                    <th class="p-2 sm:p-3 text-left">Manufacturer</th>
                                    <th class="p-2 sm:p-3 text-left">Agent</th>
                                    <th class="p-2 sm:p-3 text-left">Uses</th>
                                    <th class="p-2 sm:p-3 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in project.sprayingTable" :key="record.id"
                                    class="border-t hover:bg-gray-50 transition-colors duration-200">
                                    <td class="p-2 sm:p-3">{{ record.serialNo }}</td>
                                    <td class="p-2 sm:p-3">{{ record.tradeName }}</td>
                                    <td class="p-2 sm:p-3">{{ record.regNo }}</td>
                                    <td class="p-2 sm:p-3">{{ record.activeIngredients }}</td>
                                    <td class="p-2 sm:p-3">{{ record.manufacturer }}</td>
                                    <td class="p-2 sm:p-3">{{ record.agent }}</td>
                                    <td class="p-2 sm:p-3">{{ record.uses }}</td>
                                    <td class="p-2 sm:p-3">{{ record.date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Fertilizer Records Section -->
                <div v-if="currentView === 'fertilizer'" class="mt-4 sm:mt-8">
                    <div class="flex items-center mb-2 sm:mb-4">
                        <UIcon name="i-lucide-box" class="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
                        <h3 class="text-lg sm:text-xl font-semibold text-black">Fertilizer Records</h3>
                    </div>
                    <button @click="toggleFertilizerForm"
                        class="flex items-center bg-blue-500 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 transition-all mb-3 sm:mb-4 text-xs sm:text-sm">
                        <UIcon name="i-lucide-plus" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {{ showFertilizerForm ? 'Hide Form' : 'Add Fertilizer Record' }}
                    </button>
                    <form v-if="showFertilizerForm" @submit.prevent="saveFertilizerRecord"
                        class="bg-gray-50 p-3 sm:p-4 rounded-lg shadow mb-3 sm:mb-4 animate-slide-down">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                            <label for="date" class="text-black text-xs sm:text-sm">Date</label>
                            <input v-model="newFertilizer.date" type="date" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newFertilizer.stage" placeholder="Stage" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newFertilizer.type" placeholder="Type" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newFertilizer.name" placeholder="Name"
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                            <input v-model="newFertilizer.purpose" placeholder="Purpose" required
                                class="border p-1 sm:p-2 w-full bg-white text-black rounded text-xs sm:text-sm" />
                        </div>
                        <button type="submit"
                            class="bg-green-500 text-white py-1 px-3 sm:py-2 sm:px-4 mt-3 rounded-lg hover:bg-green-600 transition-all w-full sm:w-auto text-xs sm:text-sm"
                            :disabled="savingFertilizer">
                            {{ savingFertilizer ? 'Saving...' : 'Save' }}
                        </button>
                    </form>
                    <div class="overflow-x-auto mt-2 sm:mt-4 text-black">
                        <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden text-xs sm:text-sm">
                            <thead>
                                <tr class="bg-gray-100 border-b border-gray-300">
                                    <th class="p-2 sm:p-3 text-left">Stage</th>
                                    <th class="p-2 sm:p-3 text-left">Type</th>
                                    <th class="p-2 sm:p-3 text-left">Name</th>
                                    <th class="p-2 sm:p-3 text-left">Purpose</th>
                                    <th class="p-2 sm:p-3 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in project.fertilizerTable" :key="record.id"
                                    class="border-t hover:bg-gray-50 transition-colors duration-200">
                                    <td class="p-2 sm:p-3">{{ record.stage }}</td>
                                    <td class="p-2 sm:p-3">{{ record.type }}</td>
                                    <td class="p-2 sm:p-3">{{ record.name }}</td>
                                    <td class="p-2 sm:p-3">{{ record.purpose }}</td>
                                    <td class="p-2 sm:p-3">{{ record.date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- Total Costs Records Section -->
                <div v-if="currentView === 'TotalCost'" class="mt-4 sm:mt-8">
                    <div class="flex items-center mb-2 sm:mb-4">
                        <UIcon name="i-lucide-clipboard" class="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
                        <h3 class="text-lg sm:text-xl font-semibold text-black">Total Costs</h3>
                    </div>
                    <div class="overflow-x-auto mt-2 sm:mt-4 text-black">
                        <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden text-xs sm:text-sm">
                            <thead>
                                <tr class="bg-gray-100 border-b border-gray-300">
                                    <th class="p-2 sm:p-3 text-left">Revenue</th>
                                    <th class="p-2 sm:p-3 text-left">Labour</th>
                                    <th class="p-2 sm:p-3 text-left">Land Prep</th>
                                    <th class="p-2 sm:p-3 text-left">Harvest</th>
                                    <th class="p-2 sm:p-3 text-left">Profits</th>
                                    <th class="p-2 sm:p-3 text-left">Loss</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in project.harvestTable" :key="record.id"
                                    class="border-t hover:bg-gray-50 transition-colors duration-200">
                                    <td class="p-2 sm:p-3">.</td>
                                    <td class="p-2 sm:p-3">..</td>
                                    <td class="p-2 sm:p-3">..</td>
                                    <td class="p-2 sm:p-3">..</td>
                                    <td class="p-2 sm:p-3">..</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- Progress Records Section -->
                <div v-if="currentView === 'progress'" class="mt-4 sm:mt-8">
                    <div class="flex items-center mb-2 sm:mb-4">
                        <UIcon name="i-lucide-clipboard" class="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
                        <h3 class="text-lg sm:text-xl font-semibold text-black">Project Progress</h3>
                    </div>
                    <button @click="toggleProgressForm"
                        class="flex items-center bg-blue-500 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 transition-all mb-3 sm:mb-4 text-xs sm:text-sm">
                        <UIcon name="i-lucide-plus" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {{ showProgressForm ? 'Hide Form' : 'Add Progress Record' }}
                    </button>
                    <form v-if="showProgressForm" @submit.prevent="saveProgressRecord" :key="formKey"
                        class="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 animate-slide-down border border-gray-200">

                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div class="flex flex-col">
                                <label for="date" class="text-gray-700 text-sm font-medium">Date</label>
                                <input v-model="newProgress.date" type="date" required
                                    class="border border-gray-300 p-2 w-full bg-gray-50 text-gray-900 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" />
                            </div>
                            <div class="flex flex-col">
                                <label for="stage" class="text-gray-700 text-sm font-medium">Stage</label>
                                <input v-model="newProgress.stage" placeholder="Crop Stage" required
                                    class="border border-gray-300 p-2 w-full bg-gray-50 text-gray-900 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" />
                            </div>
                            <div>
                                <label for="crop-image" class="text-gray-700 text-sm font-medium block mb-1">Upload
                                    Image</label>
                                <input type="file" id="product-image" @change="handleImageUpload" accept="image/*"
                                    class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 text-gray-700 transition-all" />

                                <img v-if="imagePreview" :src="imagePreview" alt="Image preview"
                                    class="mt-3 w-36 h-36 object-cover rounded-lg shadow-md border border-gray-200" />
                            </div>
                        </div>
                        <button type="submit"
                            class="bg-green-500 text-white py-2 px-5 mt-4 rounded-lg hover:bg-green-600 transition-all w-full sm:w-auto text-sm font-semibold shadow-md"
                            :disabled="savingProgress">
                            {{ savingProgress ? 'Saving...' : 'Save' }}
                        </button>
                    </form>

                    <div class="overflow-x-auto mt-4 md:mt-6 text-black">
                        <div
                            class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            <div v-for="record in project.progressTable" :key="record.id"
                                class="bg-white rounded-lg md:rounded-2xl shadow-md sm:shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group">
                                <div class="relative">
                                    <img :src="record.imageUrl" alt="Progress Image"
                                        class="w-full h-48 xs:h-56 sm:h-64 md:h-72 object-cover rounded-t-lg md:rounded-t-2xl transition-opacity duration-300 group-hover:opacity-90" />
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-lg md:rounded-t-2xl">
                                    </div>
                                    <div class="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 sm:h-6 sm:w-6 text-white mr-1 sm:mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span
                                            class="text-white font-medium text-sm sm:text-base md:text-lg drop-shadow-md">{{
                                            record.date }}</span>
                                    </div>
                                </div>

                                <div class="p-3 sm:p-4 md:p-6">
                                    <div class="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 mt-0.5 mr-2 flex-shrink-0"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        <div>
                                            <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{{
                                                record.stage }}</h3>
                                            <p class="text-gray-600 text-xs sm:text-sm flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Last updated: {{ record.lastUpdated || 'Recently' }}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
                                        <button
                                            class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors text-sm sm:text-base">
                                            View details
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 ml-1"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        <div class="flex justify-end xs:justify-start">
                                            <span class="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold"
                                                :class="record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    record.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'">
                                                {{ record.status }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Generate Report Button -->
                <div class="text-center mt-4 sm:mt-6">
                    <button @click="generateReport"
                        class="flex items-center justify-center bg-blue-500 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 transition-all w-full sm:w-auto text-xs sm:text-sm">
                        <UIcon name="i-lucide-download" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Download Report
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '~/stores/project';
import * as XLSX from 'xlsx';
const imageFile = ref(null)
const imagePreview = ref(null)
const currentView = ref('labour');
const setView = (view) => {
    currentView.value = view;
};

const route = useRoute();
const projectStore = useProjectStore();
const loading = ref(false)
const project = ref(null);
const formKey = ref(0);

const resetForm = () => {
    newProgress.value = { date: "", stage: "" };
    imageFile.value = null;
    imagePreview.value = null;
    formKey.value += 1;
};


const handleImageUpload = (event) => {
    if (!event?.target?.files?.length) {
        console.error("No file selected.");
        return;
    }

    const file = event.target.files[0];
    if (!file.type.startsWith("image/")) {
        console.error("Selected file is not an image.");
        return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
        console.error("File size exceeds 2MB.");
        return;
    }

    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => (imagePreview.value = e.target.result);
    reader.readAsDataURL(file);
};


project.value = projectStore.projects.find(p => p.id === route.params.id);



// Form data
const newSpraying = ref({ serialNo: '', tradeName: '', regNo: '', activeIngredients: '', manufacturer: '', agent: '', uses: '', date: '' });
const newFertilizer = ref({ date: '', type: '', stage: '', purpose: '', name: '' });
const newLabor = ref({ date: '', numberOfWorkers: '', taskPerformed: '', hoursWorked: '', wageRate: '', cropArea: '' });
const newHarvest = ref({ date: '', quantity: '', quality: '', pricePerUnit: '' });
const newLandPrep = ref({ date: '', landPrepLabor: '', prepDescription: '', prepPrice: '' });
const newProgress = ref({ date: '', stage: "" })


// Form visibility
const showSprayingForm = ref(false);
const showFertilizerForm = ref(false);
const showLaborForm = ref(false);
const showHarvestForm = ref(false);
const showLandPrepForm = ref(false)
const showProgressForm = ref(false)

// Saving state flags
const savingLabor = ref(false);
const savingSpraying = ref(false);
const savingFertilizer = ref(false);
const savingHarvest = ref(false);
const savingLandPrep = ref(false)
const savingProgress = ref(false);

function toggleFertilizerForm() {
    showFertilizerForm.value = !showFertilizerForm.value;
}
function toggleSprayingForm() {
    showSprayingForm.value = !showSprayingForm.value;
}
function toggleLaborForm() {
    showLaborForm.value = !showLaborForm.value;
}
function toggleHarvestForm() {
    showHarvestForm.value = !showHarvestForm.value;
}
function toggleLandPrepForm() {
    showLandPrepForm.value = !showLandPrepForm.value;
}
function toggleProgressForm() {
    showProgressForm.value = !showProgressForm.value
}



const saveSprayingRecord = async () => {
    try {
        savingSpraying.value = true;
        await projectStore.addSprayingRecord(project.value.id, newSpraying.value);
        newSpraying.value = { serialNo: '', tradeName: '', regNo: '', activeIngredients: '', manufacturer: '', agent: '', uses: '', date: '' };
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
        newFertilizer.value = { date: '', type: '', stage: '', name: '', purpose: '' };
        showFertilizerForm.value = false;
    } catch (error) {
        console.error("Error saving fertilizer record:", error);
    } finally {
        savingFertilizer.value = false;
    }
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
        console.error("Error saving labor {{ record.quantity * record.pricePerUnit }}record:", error);
    } finally {
        savingLabor.value = false;
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
        console.error("Error saving Harvest record:", error);
    } finally {
        savingHarvest.value = false;
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
        console.error("Error saving Land Prep record:", error);
    } finally {
        savingLandPrep.value = false;
    }
};
const saveProgressRecord = async () => {
    if (!project.value || !project.value.id) {
        console.error("Project is not defined or missing an ID.");
        return;
    }

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
        // Prepare spraying data
        const sprayingSheetData = [
            ["Serial No", "Trade Name", "Reg No", "Active Ingredients", "Manufacturer", "Agent", "Uses", "Date"],
            ...project.value.sprayingTable.map(record => [
                record.serialNo,
                record.tradeName,
                record.regNo,
                record.activeIngredients,
                record.manufacturer,
                record.agent,
                record.uses,
                record.date
            ])
        ];

        // Prepare fertilizer data
        const fertilizerSheetData = [
            ["Date", "Stage", "Type", "Name", "Purpose"],
            ...project.value.fertilizerTable.map(record => [
                record.date,
                record.stage,
                record.type,
                record.name,
                record.purpose
            ])
        ];

        // Prepare labor data
        const laborSheetData = [
            ["Date", "Number of Workers", "Task Performed", "Hours Worked", "Wage Rate", "Total Wages Earned", "Crop/Animal Area"],
            ...project.value.laborTable.map(record => [
                record.date,
                record.numberOfWorkers,
                record.taskPerformed,
                record.hoursWorked,
                record.wageRate,
                record.numberOfWorkers * record.wageRate,
                record.cropArea,
            ])
        ];

        // Create workbook and sheets
        const wb = XLSX.utils.book_new();
        const sprayingSheet = XLSX.utils.aoa_to_sheet(sprayingSheetData);
        const fertilizerSheet = XLSX.utils.aoa_to_sheet(fertilizerSheetData);
        XLSX.utils.book_append_sheet(wb, sprayingSheet, "Spraying Records");
        XLSX.utils.book_append_sheet(wb, fertilizerSheet, "Fertilizer Records");

        // Generate and download the Excel file
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${project.value.projectName}-report.xlsx`;
        link.click();
    } catch (error) {
        console.error("Error generating report:", error);
    }
};
</script>