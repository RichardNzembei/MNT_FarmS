<template>
    <div class="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-4 sm:p-8">
        <!-- Back Button -->
        <NuxtLink to="/existingproject"
            class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300">
            <UIcon name="i-lucide-arrow-left"
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
                        @click="setView('labour')" :class="{ 'bg-blue-500 text-white': currentView === 'labour' }">
                        <UIcon name="i-lucide-users" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        Labour
                    </button>
                    <button
                        class="flex items-center justify-center border border-blue-500 text-blue-500 py-1 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white"
                        @click="setView('harvest')" :class="{ 'bg-blue-500 text-white': currentView === 'harvest' }">
                        <UIcon name="i-lucide-leaf" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        Harvest
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

                <!-- Labor Records Section -->
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
                            <input v-model="newHarvest.quantity" placeholder="Number of (kgs/crts/pcs)" required
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
                                    <th class="p-2 sm:p-3 text-left">Quantity(Kgs/cartoons/pieces)</th>
                                    <th class="p-2 sm:p-3 text-left">Quality</th>
                                    <th class="p-2 sm:p-3 text-left">Price</th>
                                    <th class="p-2 sm:p-3 text-left">Total</th>
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

const currentView = ref('labour');
const setView = (view) => {
    currentView.value = view;
};

const route = useRoute();
const projectStore = useProjectStore();
const loading = ref(false)
const project = ref(null);


project.value = projectStore.projects.find(p => p.id === route.params.id);



// Form data
const newSpraying = ref({ serialNo: '', tradeName: '', regNo: '', activeIngredients: '', manufacturer: '', agent: '', uses: '', date: '' });
const newFertilizer = ref({ date: '', type: '', stage: '', purpose: '', name: '' });
const newLabor = ref({ date: '', numberOfWorkers: '', taskPerformed: '', hoursWorked: '', wageRate: '', cropArea: '' });
const newHarvest = ref({ date: '', quantity: '', quality: '', pricePerUnit: '' })

// Form visibility
const showSprayingForm = ref(false);
const showFertilizerForm = ref(false);
const showLaborForm = ref(false);
const showHarvestForm = ref(false);

// Saving state flags
const savingLabor = ref(false);
const savingSpraying = ref(false);
const savingFertilizer = ref(false);
const savingHarvest = ref(false);

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
        console.error("Error saving labor record:", error);
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