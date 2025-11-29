<template>
  <div class="settings-dropdown" v-click-outside="closeDropdown">
    <button @click="toggleDropdown" class="settings-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
      </svg>
      Settings
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron" :class="{ 'open': isOpen }">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <div class="dropdown-item">
          <label class="dropdown-label">Indent Size</label>
          <div class="dropdown-options">
            <button 
              @click="updateSetting('indentSize', 2)"
              :class="{ 'active': localSettings.indentSize === 2 }"
              class="option-btn"
            >
              2
            </button>
            <button 
              @click="updateSetting('indentSize', 4)"
              :class="{ 'active': localSettings.indentSize === 4 }"
              class="option-btn"
            >
              4
            </button>
          </div>
        </div>
        <div class="dropdown-item">
          <label class="dropdown-label">Array Display</label>
          <div class="dropdown-options">
            <button 
              @click="updateSetting('arrayDisplay', 'inline')"
              :class="{ 'active': localSettings.arrayDisplay === 'inline' }"
              class="option-btn"
            >
              Inline
            </button>
            <button 
              @click="updateSetting('arrayDisplay', 'block')"
              :class="{ 'active': localSettings.arrayDisplay === 'block' }"
              class="option-btn"
            >
              Block
            </button>
          </div>
        </div>
        <div class="dropdown-item">
          <label class="dropdown-label">
            <input 
              type="checkbox" 
              v-model="localSettings.showTypeInfo"
              @change="updateSetting('showTypeInfo', localSettings.showTypeInfo)"
              class="checkbox"
            />
            Show Type Info
          </label>
        </div>
        <div class="dropdown-item">
          <label class="dropdown-label">
            <input 
              type="checkbox" 
              v-model="localSettings.asciiTreeStyle"
              @change="updateSetting('asciiTreeStyle', localSettings.asciiTreeStyle)"
              class="checkbox"
            />
            ASCII Tree Style
          </label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  settings: {
    indentSize: number
    arrayDisplay: 'inline' | 'block'
    showTypeInfo: boolean
    asciiTreeStyle: boolean
  }
}>()

const emit = defineEmits<{
  'update:settings': [settings: {
    indentSize: number
    arrayDisplay: 'inline' | 'block'
    showTypeInfo: boolean
    asciiTreeStyle: boolean
  }]
}>()

const isOpen = ref(false)
const localSettings = ref({ ...props.settings })

watch(() => props.settings, (newSettings) => {
  localSettings.value = { ...newSettings }
}, { deep: true })

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const updateSetting = (key: string, value: any) => {
  localSettings.value = { ...localSettings.value, [key]: value }
  emit('update:settings', { ...localSettings.value })
}

// Click outside directive
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.settings-dropdown {
  position: relative;
}

.settings-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.settings-btn:hover {
  background: #f3f4f6;
  border-color: #667eea;
  color: #667eea;
}

.chevron {
  transition: transform 0.2s;
}

.chevron.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  min-width: 200px;
  z-index: 1000;
}

.dropdown-item {
  margin-bottom: 1rem;
}

.dropdown-item:last-child {
  margin-bottom: 0;
}

.dropdown-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.dropdown-options {
  display: flex;
  gap: 0.5rem;
}

.option-btn {
  flex: 1;
  padding: 0.5rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.option-btn:hover {
  background: #e5e7eb;
}

.option-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.checkbox {
  margin-right: 0.5rem;
  cursor: pointer;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

