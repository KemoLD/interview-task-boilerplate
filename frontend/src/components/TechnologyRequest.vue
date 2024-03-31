<script>
import { ref, computed } from 'vue'

export default {
  data() {
    return {
      publicTechChoice: true
      // other data properties...
    }
  },
  setup() {
    const colors = ref([
      { color: 'Blue', label: 'Blue' },
      { color: 'Darkblue', label: 'Darkblue' },
      { color: 'Pink', label: 'Pink' },
      { color: 'Purple', label: 'Purple' },
      { color: 'Green', label: 'Green' },
      { color: 'Yellow', label: 'Yellow' },
      { color: 'Orange', label: 'Orange' },
      { color: 'Red', label: 'Red' },
      { color: 'Beaver', label: 'Beaver' },
      { color: 'Black', label: 'Black' },
      { color: 'White', label: 'White' }
    ])

    const selectedColor = ref(null)
    const open = ref(false)
    const technologyName = ref('')
    const description = ref('')
    const websiteURL = ref('')
    const docsURL = ref('')
    const changeLog = ref('')

    const selectColor = (color) => {
      selectedColor.value = color
      open.value = false
    }

    const isFormValid = computed(() => {
      return technologyName.value && description.value && websiteURL.value
    })

    const handleSubmit = () => {
      const formData = {
        technologyName: technologyName.value,
        description: description.value,
        websiteURL: websiteURL.value,
        docsURL: docsURL.value,
        changeLog: changeLog.value,
        selectedColor: selectedColor.value,
        publicTechChoice: publicTechChoice.value
      }

      console.log(formData)
    }

    return {
      colors,
      selectedColor,
      open,
      selectColor,
      technologyName,
      description,
      websiteURL,
      docsURL,
      changeLog,
      handleSubmit,
      isFormValid
    }
  }
}
</script>

<style scoped>
input:focus,
textarea:focus {
  @apply focus:outline-enabled;
}
</style>

<template>
  <div class="bg-custom-dark p-4 rounded-lg w-full sm:w-3/4 lg:w-1/3 mx-auto">
    <h1 class="text-white text-xl mb-4">Technology choice request</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="technology-name">Technology name</label>
        <input
          v-model="technologyName"
          class="bg-input-bg border-custom-gray placeholder-custom-gray text-white rounded w-full pl-2 p-1 text-sm focus:border-custom-gray focus:ring-0 focus:outline-none"
          id="technology-name"
          type="text"
          placeholder="Your technology name"
        />
      </div>
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="description">Description</label>
        <textarea
          v-model="description"
          class="bg-input-bg border-custom-gray placeholder-custom-gray text-white rounded w-full p-1 pl-2 h-15 text-sm focus:border-custom-gray focus:ring-0 focus:outline-none"
          id="description"
          type="text"
          placeholder="e.g A C4 model diagramming and modeling tool for agile teams to align on technical decisions"
        />
        <small class="text-custom-gray block">For people new to this technology</small>
      </div>
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="icon">Icon</label>
        <div
          class="bg-input-bg border-custom-gray border-dotted border-2 text-custom-gray rounded w-full p-4 text-center text-sm"
        >
          <p>Drag and drop image here</p>
          <p>Format: SVG / PNG / JPEG</p>
          <button class="bg-custom-gray text-white rounded mt-2 px-12 py-2 text-sm">
            Click to choose image
          </button>
        </div>
        <small class="text-custom-gray block mt-1">Max file size: 5mb</small>
      </div>
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="websiteURL">Website URL</label>
        <div class="relative flex items-center">
          <img src="/globe-solid.svg" class="absolute h-5 w-5 ml-2" alt="Globe Icon" />
          <input
            v-model="websiteURL"
            class="flex-grow bg-input-bg pl-9 border-custom-gray placeholder-custom-gray text-white rounded text-sm focus:border-custom-gray focus:ring-0 focus:outline-none"
            id="websiteURL"
            type="text"
            placeholder="e.g icepanel.io"
          />
        </div>
      </div>
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="docsURL"
          >Docs URL <span class="text-custom-gray">(optional)</span></label
        >
        <div class="relative flex items-center">
          <img src="/globe-solid.svg" class="absolute h-5 w-5 ml-2" alt="Globe Icon" />
          <input
            v-model="docsURL"
            class="flex-grow bg-input-bg pl-9 border-custom-gray placeholder-custom-gray text-white rounded text-sm focus:border-custom-gray focus:ring-0 focus:outline-none"
            id="docsURL"
            type="text"
            placeholder="e.g docs.icepanel.io"
          />
        </div>
      </div>
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="changeLog"
          >Change log <span class="text-custom-gray">(optional)</span></label
        >
        <div class="relative flex items-center">
          <img src="/globe-solid.svg" class="absolute h-5 w-5 ml-2" alt="Globe Icon" />
          <input
            v-model="changeLog"
            class="flex-grow bg-input-bg pl-9 border-custom-gray placeholder-custom-gray text-white rounded text-sm focus:border-custom-gray focus:ring-0 focus:outline-none"
            id="changeLog"
            type="text"
            placeholder="e.g icepanel.io/changelog"
          />
        </div>
      </div>
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="brandColour"
          >Brand colour <span class="text-custom-gray">(optional)</span></label
        >
        <div class="relative flex items-center">
          <div class="relative inline-block text-left w-full">
            <div class="relative">
              <button
                @click="open = !open"
                class="inline-flex w-full py-2 text-sm font-small bg-input-bg rounded-md border border-custom-gray focus:border-enabled focus:ring-0 focus:outline-none"
                :style="{ color: selectedColor ? 'white' : '#84898C' }"
              >
                <img src="/globe-solid.svg" class="h-5 w-5 ml-2 mr-2" alt="Globe Icon" />
                <span>{{ selectedColor ? selectedColor.label : 'Select colour' }}</span>
              </button>
            </div>
            <div
              v-show="open"
              @click="open = false"
              class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-input-bg ring-1 ring-black ring-opacity-5"
            >
              <div
                class="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div
                  v-for="color in colors"
                  :key="color.color"
                  @click="selectColor(color)"
                  class="cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
                  role="menuitem"
                >
                  <span
                    class="inline-block mr-3 rounded-md"
                    :style="{ width: '20px', height: '20px', backgroundColor: color.color }"
                  ></span>
                  {{ color.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="publicTechChoice">
          Available to all IcePanel customer
        </label>
        <div class="flex items-center">
          <input
            type="checkbox"
            id="publicTechChoice"
            v-model="publicTechChoice"
            class="form-checkbox h-3 w-3 text-enabled border border-custom-gray focus:border-custom-gray focus:ring-0 focus:outline-none"
          />
          <label for="publicTechChoice" class="ml-2 text-white text-sm"> Public tech choice </label>
        </div>
      </div>
      <div class="text-center mt-6">
        <button
          :class="{ 'bg-disabled': !isFormValid, 'bg-enabled': isFormValid }"
          class="text-custom-dark rounded p-1 w-full flex justify-center items-center text-sm"
          :disabled="!isFormValid"
          type="submit"
        >
          <img src="/paper-plane-solid.svg" class="mr-2 h-5 w-5" alt="Paper Plane Icon" />
          Request tech choice
        </button>
      </div>
    </form>
  </div>
</template>
