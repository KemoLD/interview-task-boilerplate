<script>
export default {
  data() {
    return {
      colors: [
        'Blue',
        'Darkblue',
        'Pink',
        'Purple',
        'Green',
        'Yellow',
        'Orange',
        'Red',
        'Beaver',
        'Black',
        'White'
      ],
      selectedColor: ''
    }
  },
  methods: {
    changeColor(event) {
      this.selectedColor = event.target.value
      event.target.className = this.selectedColor ? 'text-white' : 'text-custom-gray'
    }
  }
}
</script>

<template>
  <div class="bg-custom-dark p-6 rounded-lg w-full sm:w-3/4 lg:w-1/3 mx-auto">
    <h1 class="text-white text-2xl mb-6">Technology choice request</h1>
    <form>
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
          <select
            id="brandColour"
            class="flex-grow bg-input-bg pl-9 border-custom-gray text-white rounded"
            v-model="selectedColor"
            @change="changeColor($event)"
          >
            <option value="" disabled class="text-custom-gray">Select colour</option>
            <option
              v-for="color in colors"
              :key="color"
              :value="color"
              :style="{ color: color, backgroundColor: color }"
            >
              <span
                class="mr-2"
                :style="{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: color
                }"
              ></span>
              {{ color }}
            </option>
          </select>
        </div>
      </div>
      <div class="text-center mt-6">
        <button
          class="bg-disabled text-custom-dark rounded p-2 w-full flex justify-center items-center"
          disabled
        >
          <img src="/paper-plane-solid.svg" class="mr-2 h-5 w-5" alt="Paper Plane Icon" />
          Request tech choice
        </button>
      </div>
    </form>
  </div>
</template>
