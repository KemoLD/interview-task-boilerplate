<script>
import { ref, computed, reactive } from 'vue'

export default {
  data() {
    return {
      publicTechChoice: true
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
      { color: '#A18276', label: 'Beaver' },
      { color: 'Black', label: 'Black' },
      { color: 'White', label: 'White' }
    ])

    const selectedColor = ref(null)
    const open = ref(false)
    const technologyName = ref('')
    const image = ref(null)
    const description = ref('')
    const websiteURL = ref('')
    const docsURL = ref('')
    const changeLog = ref('')

    const validationResults = reactive({
      technologyName: true,
      websiteURL: true,
      docsURL: true,
      changeLog: true
    })

    const onFileChange = (e) => {
      console.log('here: ', e.target.files)
      const file = e.target.files[0]
      image.value = URL.createObjectURL(file)
    }

    const selectColor = (color) => {
      selectedColor.value = color
      open.value = false
    }

    const isFormValid = computed(() => {
      return (
        technologyName.value &&
        validationResults.technologyName &&
        description.value &&
        image.value &&
        websiteURL.value &&
        validationResults.websiteURL &&
        (docsURL.value ? validationResults.docsURL : true) &&
        (changeLog.value ? validationResults.changeLog : true)
      )
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
      image,
      onFileChange,
      validationResults,
      description,
      websiteURL,
      docsURL,
      changeLog,
      handleSubmit,
      isFormValid
    }
  },
  methods: {
    onButtonClick(e) {
      e.preventDefault()
      this.$refs.fileInput.click()
    },
    validateTechnologyName(name) {
      if (!name) {
        this.validationResults.technologyName = true
        return
      }
      const technologies = ['icePanel']
      const isTechnologyNameTaken = technologies.some(
        (technology) => technology.toLowerCase() === name.toLowerCase()
      )
      this.validationResults.technologyName = !isTechnologyNameTaken
    },
    resetImage() {
      this.image = null
    },
    validateURL(field, url) {
      if (!url) {
        this.validationResults[field] = true
        return
      }

      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      )
      this.validationResults[field] = urlPattern.test(url)
    }
  }
}
</script>

<style scoped>
input:focus,
textarea:focus {
  @apply focus:outline-enabled;
}
.bg-custom-dark {
  overflow-y: auto;
  max-height: 100vh;
}
</style>

<template>
  <div class="bg-custom-dark p-8 rounded-lg w-full sm:w-3/4 lg:w-1/3 mx-auto">
    <h1 class="text-white text-xl mb-4">Technology choice request</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="technology-name">Technology name</label>
        <div class="relative">
          <input
            v-model="technologyName"
            @input="validateTechnologyName($event.target.value)"
            class="bg-input-bg border-custom-gray placeholder-custom-gray text-white rounded w-full pl-2 p-1 text-sm focus:border-custom-gray focus:ring-0 focus:outline-none"
            id="technology-name"
            type="text"
            placeholder="Your technology name"
          />
          <span
            v-if="validationResults.technologyName && technologyName"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500"
            style="font-size: 1rem"
          >
            &#10003;
            <!-- This is a checkmark -->
          </span>
          <span
            v-if="!validationResults.technologyName && technologyName"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500"
            style="font-size: 0.5rem"
          >
            &#10060;
            <!-- This is an "x" -->
          </span>
        </div>
        <p
          v-if="!validationResults.technologyName && technologyName"
          class="text-red-500 mt-1 text-xs mt-1"
        >
          This already exists
        </p>
        <p
          v-if="validationResults.technologyName && technologyName"
          class="text-green-500 mt-1 text-xs mt-1"
        >
          Cool - this technology hasn't been added yet!
        </p>
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
        <div class="flex justify-between items-center">
          <label class="text-white mb-1 text-sm" for="icon">Icon</label>
          <button
            v-if="image"
            @click="resetImage"
            class="flex items-center text-custom-gray text-sm"
          >
            Reset
            <img src="/rotate-left-solid.svg" class="h-4 w-4 ml-2" alt="Reset Icon" />
          </button>
        </div>
        <div
          class="bg-input-bg border-custom-gray border-dotted border-2 text-custom-gray rounded w-full p-4 text-center text-sm"
        >
          <img v-if="image" :src="image" class="mb-2" />
          <p v-else>
            Drag and drop image here
            <br />
            Format: SVG / PNG / JPEG
          </p>
          <input type="file" @change="onFileChange" class="hidden" ref="fileInput" />
          <button
            @click="(e) => onButtonClick(e)"
            class="bg-custom-gray text-white rounded mt-2 px-12 py-2 text-sm"
          >
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
            @input="validateURL('websiteURL', $event.target.value)"
            class="flex-grow bg-input-bg pl-9 border-custom-gray placeholder-custom-gray text-white rounded text-sm focus:border-custom-gray focus:ring-0 focus:outline-none"
            id="websiteURL"
            type="text"
            placeholder="e.g icepanel.io"
          />
        </div>
        <p
          v-if="!validationResults.websiteURL && websiteURL"
          class="text-red-500 mt-1 text-xs mt-1"
        >
          Not a valid URL
        </p>
      </div>
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="docsURL"
          >Docs URL <span class="text-custom-gray">(optional)</span></label
        >
        <div class="relative flex items-center">
          <img src="/globe-solid.svg" class="absolute h-5 w-5 ml-2" alt="Globe Icon" />
          <input
            v-model="docsURL"
            @input="validateURL('docsURL', $event.target.value)"
            class="flex-grow bg-input-bg pl-9 border-custom-gray placeholder-custom-gray text-white rounded text-sm focus:border-custom-gray focus:ring-0 focus:outline-none"
            id="docsURL"
            type="text"
            placeholder="e.g docs.icepanel.io"
          />
        </div>
        <p v-if="!validationResults.docsURL && docsURL" class="text-red-500 mt-1 text-xs mt-1">
          Not a valid URL
        </p>
      </div>
      <div class="mb-2">
        <label class="text-white block mb-1 text-sm" for="changeLog"
          >Change log <span class="text-custom-gray">(optional)</span></label
        >
        <div class="relative flex items-center">
          <img src="/globe-solid.svg" class="absolute h-5 w-5 ml-2" alt="Globe Icon" />
          <input
            v-model="changeLog"
            @input="validateURL('changeLog', $event.target.value)"
            class="flex-grow bg-input-bg pl-9 border-custom-gray placeholder-custom-gray text-white rounded text-sm focus:border-custom-gray focus:ring-0 focus:outline-none"
            id="changeLog"
            type="text"
            placeholder="e.g icepanel.io/changelog"
          />
        </div>
        <p v-if="!validationResults.changeLog && changeLog" class="text-red-500 mt-1 text-xs mt-1">
          Not a valid URL
        </p>
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
                :style="{ color: selectedColor ? selectedColor.color : '#84898C' }"
              >
                <svg
                  class="h-5 w-5 ml-2 mr-2"
                  fill="currentColor"
                  :style="{ color: selectedColor ? selectedColor.color : '#84898C' }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                  />
                </svg>
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
