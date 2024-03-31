<script>
import { ref } from 'vue'

export default {
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

    const selectColor = (color) => {
      selectedColor.value = color
      open.value = false
    }

    return { colors, selectedColor, open, selectColor }
  }
}
</script>

<template>
  <div class="bg-custom-dark p-6 rounded-lg w-full sm:w-3/4 lg:w-1/3 mx-auto">
    <h1 class="text-white text-2xl mb-6">Technology choice request</h1>
    <form @submit.prevent>
      <div class="mb-4">
        <label class="text-white block mb-2" for="technology-name">Technology name</label>
        <input
          class="bg-input-bg border-custom-gray placeholder-custom-gray text-white rounded w-full p-2"
          id="technology-name"
          type="text"
          placeholder="Your technology name"
        />
      </div>
      <div class="mb-4">
        <label class="text-white block mb-2" for="description">Description</label>
        <textarea
          class="bg-input-bg border-custom-gray placeholder-custom-gray text-white rounded w-full p-2 h-15"
          id="description"
          type="text"
          placeholder="e.g A C4 model diagramming and modeling tool for agile teams to align on technical decisions"
        />
        <small class="text-custom-gray block">For people new to this technology</small>
      </div>
      <div class="mb-4">
        <label class="text-white block mb-2" for="icon">Icon</label>
        <div
          class="bg-input-bg border-custom-gray border-dotted border-2 text-custom-gray rounded w-full p-4 text-center"
        >
          <p>Drag and drop image here</p>
          <p>Format: SVG / PNG / JPEG</p>
          <button class="bg-custom-gray text-white rounded mt-2 px-12 py-2">
            Click to choose image
          </button>
        </div>
        <small class="text-custom-gray block mt-2">Max file size: 5mb</small>
      </div>
      <div class="mb-4">
        <label class="text-white block mb-2" for="websiteURL">Website url</label>
        <div class="relative flex items-center">
          <img src="/globe-solid.svg" class="absolute h-5 w-5 ml-2" alt="Globe Icon" />
          <input
            class="flex-grow bg-input-bg pl-9 border-custom-gray placeholder-custom-gray text-white rounded"
            id="websiteURL"
            type="text"
            placeholder="e.g icepanel.io"
          />
        </div>
      </div>
      <div class="mb-4">
        <label class="text-white block mb-2" for="docsURL">Docs url (optional)</label>
        <div class="relative flex items-center">
          <img src="/globe-solid.svg" class="absolute h-5 w-5 ml-2" alt="Globe Icon" />
          <input
            class="flex-grow bg-input-bg pl-9 border-custom-gray placeholder-custom-gray text-white rounded"
            id="docsURL"
            type="text"
            placeholder="e.g docs.icepanel.io"
          />
        </div>
      </div>
      <div class="mb-4">
        <label class="text-white block mb-2" for="changeLog">Change log (optional)</label>
        <div class="relative flex items-center">
          <img src="/globe-solid.svg" class="absolute h-5 w-5 ml-2" alt="Globe Icon" />
          <input
            class="flex-grow bg-input-bg pl-9 border-custom-gray placeholder-custom-gray text-white rounded"
            id="changeLog"
            type="text"
            placeholder="e.g icepanel.io/changelog"
          />
        </div>
      </div>
      <div class="mb-4">
        <label class="text-white block mb-2" for="brandColour">Brand colour (optional)</label>
        <div class="relative flex items-center">
          <img src="/globe-solid.svg" class="absolute h-5 w-5 ml-2" alt="Globe Icon" />
          <div class="relative inline-block text-left w-full">
            <div>
              <button
                @click="open = !open"
                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-input-bg rounded-md"
              >
                <span>{{ selectedColor ? selectedColor.label : 'Select colour' }}</span>
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              v-show="open"
              @click="open = false"
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-input-bg ring-1 ring-black ring-opacity-5"
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
                  class="cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-700"
                  role="menuitem"
                >
                  <span
                    class="inline-block mr-3 rounded-full"
                    :style="{ width: '20px', height: '20px', backgroundColor: color.color }"
                  ></span>
                  {{ color.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-6">
        <button
          class="bg-disabled text-custom-dark rounded p-2 w-full flex justify-center items-center"
          disabled
          type="submit"
        >
          <img src="/paper-plane-solid.svg" class="mr-2 h-5 w-5" alt="Paper Plane Icon" />
          Request tech choice
        </button>
      </div>
    </form>
  </div>
</template>
