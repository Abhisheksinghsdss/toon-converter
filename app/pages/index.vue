<template>
  <div class="container">
    <header class="header">
      <h1 class="title">TOONLY.ONLINE</h1>
      <p class="subtitle">Convert JSON to TOON format instantly</p>
    </header>

    <main class="main-content">
      <div class="converter-wrapper">
        <!-- Upload Section -->
        <UploadBox 
          @file-loaded="handleFileLoaded"
          @error="handleError"
        />

        <!-- Tools Panel -->
        <ToolsPanel 
          :settings="settings"
          @beautify="beautifyJson"
          @minify="minifyJson"
          @validate="validateJson"
          @load-example="loadExample"
          @clear="clearAll"
          @settings-change="updateSettings"
        />

        <!-- Main Editors Section -->
        <div class="editors-section">
          <JsonEditor 
            v-model="jsonInput"
            @validation="handleValidation"
          />
          <ToonOutput 
            :output="toonOutput"
            @copy="showToast('Copied to clipboard!')"
            @download="showToast('Download started!')"
          />
        </div>

        <!-- Convert Button -->
        <ConvertButton 
          :disabled="!isJsonValid || !jsonInput.trim()"
          :loading="isConverting"
          @convert="convertToToon"
        />

        <!-- Footer -->
        <footer class="footer">
          <NuxtLink to="/about" class="footer-link">About TOONLY.ONLINE</NuxtLink>
        </footer>
      </div>
    </main>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToastMessage" class="toast">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{{ toastText }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'TOONLY.ONLINE - JSON to TOON Converter'
})

// State
const jsonInput = ref('')
const toonOutput = ref('')
const isJsonValid = ref(true)
const isConverting = ref(false)
const showToastMessage = ref(false)
const toastText = ref('')

// Settings
const settings = ref({
  indentSize: 2,
  arrayDisplay: 'block' as 'inline' | 'block',
  showTypeInfo: true,
  asciiTreeStyle: true
})

// Load settings from localStorage
onMounted(() => {
  const saved = localStorage.getItem('toon-converter-settings')
  if (saved) {
    try {
      settings.value = { ...settings.value, ...JSON.parse(saved) }
    } catch (e) {
      console.error('Failed to load settings:', e)
    }
  }
})

// Save settings to localStorage
watch(settings, (newSettings) => {
  localStorage.setItem('toon-converter-settings', JSON.stringify(newSettings))
}, { deep: true })

// File handling
const handleFileLoaded = (content: string) => {
  jsonInput.value = content
  validateJson()
}

const handleError = (message: string) => {
  showToast(message, true)
}

// Validation
const handleValidation = (isValid: boolean, error?: string) => {
  isJsonValid.value = isValid
}

const validateJson = () => {
  if (!jsonInput.value.trim()) {
    isJsonValid.value = true
    return
  }
  
  try {
    JSON.parse(jsonInput.value)
    isJsonValid.value = true
    showToast('JSON is valid!')
  } catch (e) {
    isJsonValid.value = false
    showToast('Invalid JSON format', true)
  }
}

// JSON Tools
const beautifyJson = () => {
  if (!jsonInput.value.trim()) return
  
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonInput.value = JSON.stringify(parsed, null, settings.value.indentSize)
    showToast('JSON beautified!')
  } catch (e) {
    showToast('Invalid JSON. Cannot beautify.', true)
  }
}

const minifyJson = () => {
  if (!jsonInput.value.trim()) return
  
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonInput.value = JSON.stringify(parsed)
    showToast('JSON minified!')
  } catch (e) {
    showToast('Invalid JSON. Cannot minify.', true)
  }
}

const loadExample = () => {
  jsonInput.value = JSON.stringify({
    name: 'John Doe',
    age: 30,
    city: 'New York',
    hobbies: ['reading', 'coding', 'gaming'],
    active: true,
    address: {
      street: '123 Main St',
      zip: '10001'
    }
  }, null, settings.value.indentSize)
  validateJson()
}

const clearAll = () => {
  jsonInput.value = ''
  toonOutput.value = ''
  isJsonValid.value = true
}

const updateSettings = (newSettings: typeof settings.value) => {
  settings.value = { ...newSettings }
}

// Conversion
const convertToToon = async () => {
  if (!jsonInput.value.trim() || !isJsonValid.value) return
  
  isConverting.value = true
  toonOutput.value = ''
  
  try {
    const parsed = JSON.parse(jsonInput.value)
    // Use setTimeout to allow UI to update
    await new Promise(resolve => setTimeout(resolve, 0))
    const result = convertJsonToToon(parsed, settings.value)
    toonOutput.value = result
    showToast('Conversion complete!')
  } catch (e) {
    showToast('Conversion failed', true)
    console.error('Conversion error:', e)
  } finally {
    isConverting.value = false
  }
}

const convertJsonToToon = (
  obj: any,
  settings: typeof settings.value,
  indent: number = 0
): string => {
  if (indent > 20) {
    return '... (max depth reached)'
  }
  
  const indentStr = ' '.repeat(indent * settings.indentSize)
  const nextIndent = indent + 1
  
  if (obj === null) return 'null'
  if (obj === undefined) return 'undefined'
  if (typeof obj === 'string') return `"${obj}"`
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj)
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[] (empty array)'
    
    if (settings.arrayDisplay === 'inline' && obj.length <= 5 && indent < 3) {
      const items = obj.map(item => {
        const converted = convertJsonToToon(item, settings, nextIndent)
        return converted
      })
      return `[${items.join(', ')}]`
    }
    
    const items: string[] = []
    const prefix = settings.asciiTreeStyle ? '├─' : '-'
    
    for (let i = 0; i < obj.length; i++) {
      const converted = convertJsonToToon(obj[i], settings, nextIndent)
      const typeInfo = settings.showTypeInfo ? ` (${getValueType(obj[i])})` : ''
      const isLast = i === obj.length - 1
      const treePrefix = settings.asciiTreeStyle ? (isLast ? '└─' : prefix) : '-'
      items.push(`${' '.repeat(nextIndent * settings.indentSize)}${treePrefix} [${i}]${typeInfo}: ${converted}`)
    }
    
    return `Array[${obj.length}]\n${items.join('\n')}`
  }
  
  if (typeof obj === 'object') {
    const keys = Object.keys(obj)
    if (keys.length === 0) return '{} (empty object)'
    
    const items: string[] = []
    const prefix = settings.asciiTreeStyle ? '├─' : '-'
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = obj[key]
      const converted = convertJsonToToon(value, settings, nextIndent)
      const typeInfo = settings.showTypeInfo ? ` (${getValueType(value)})` : ''
      const isLast = i === keys.length - 1
      const treePrefix = settings.asciiTreeStyle ? (isLast ? '└─' : prefix) : '-'
      items.push(`${' '.repeat(nextIndent * settings.indentSize)}${treePrefix} ${key}${typeInfo}: ${converted}`)
    }
    
    return `Object[${keys.length} properties]\n${items.join('\n')}`
  }
  
  return String(obj)
}

const getValueType = (value: any): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (Array.isArray(value)) return `array[${value.length}]`
  if (typeof value === 'object') return `object[${Object.keys(value).length} keys]`
  return typeof value
}

// Toast
const showToast = (message: string, isError: boolean = false) => {
  toastText.value = message
  showToastMessage.value = true
  
  setTimeout(() => {
    showToastMessage.value = false
  }, 3000)
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
}

.converter-wrapper {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
}

.editors-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
  min-width: 0;
}

.editors-section > * {
  min-width: 0;
}

.footer {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #667eea;
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #4caf50;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 1000;
  font-weight: 500;
  min-width: 200px;
}

.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .converter-wrapper {
    padding: 1.5rem;
  }

  .editors-section {
    grid-template-columns: 1fr;
  }

  .footer {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .toast {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    min-width: auto;
  }
}
</style>
