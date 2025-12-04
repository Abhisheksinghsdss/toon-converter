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
          @beautify="beautifyJson"
          @minify="minifyJson"
          @validate="validateJson"
          @load-example="loadExample"
          @clear="clearAll"
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

        <!-- Token Stats -->
        <div v-if="toonOutput && jsonTokenCount > 0" class="token-stats">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-label">JSON Tokens</div>
              <div class="stat-value">{{ jsonTokenCount.toLocaleString() }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">TOON Tokens</div>
              <div class="stat-value">{{ toonTokenCount.toLocaleString() }}</div>
            </div>
            <div class="stat-item" :class="savedPercentage >= 0 ? 'stat-item-saved' : 'stat-item-increased'">
              <div class="stat-label">{{ savedPercentage >= 0 ? 'Saved' : 'Increased' }}</div>
              <div class="stat-value" :class="savedPercentage >= 0 ? 'stat-value-saved' : 'stat-value-increased'">
                {{ Math.abs(savedPercentage).toFixed(1) }}%
              </div>
            </div>
          </div>
        </div>

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

// SEO Meta Tags
useSeoMeta({
  title: 'TOONLY.ONLINE - Free JSON to TOON Converter',
  description: 'Convert JSON data to TOON format instantly with our free online converter. Simple, fast, and easy to use tool for developers. No registration required.',
  keywords: 'json to toon, json converter, toon converter, json to toon converter, online json tool, json formatter, toon format, json parser, data converter, developer tools',
  ogTitle: 'TOONLY.ONLINE - Free JSON to TOON Converter',
  ogDescription: 'Convert JSON data to TOON format instantly with our free online converter. Simple, fast, and easy to use tool for developers.',
  ogUrl: 'https://toonly.online',
  ogImage: 'https://toonly.online/og-image.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'TOONLY.ONLINE - Free JSON to TOON Converter',
  twitterDescription: 'Convert JSON data to TOON format instantly with our free online converter.',
  twitterImage: 'https://toonly.online/og-image.png',
  robots: 'index, follow',
  canonical: 'https://toonly.online'
})

// Structured Data for Homepage
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'TOONLY.ONLINE',
        description: 'Free online tool to convert JSON data to TOON format instantly. Simple, fast, and easy to use tool for developers.',
        url: 'https://toonly.online',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        featureList: [
          'JSON to TOON format conversion',
          'Real-time conversion',
          'Privacy-first (client-side processing)',
          'No registration required',
          'Free to use',
          'Copy to clipboard',
          'JSON validation',
          'Token count statistics'
        ]
      })
    }
  ]
})

// State
const jsonInput = ref('')
const toonOutput = ref('')
const isJsonValid = ref(true)
const isConverting = ref(false)
const showToastMessage = ref(false)
const toastText = ref('')
const jsonTokenCount = ref(0)
const toonTokenCount = ref(0)
const savedPercentage = ref(0)

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
  jsonTokenCount.value = 0
  toonTokenCount.value = 0
  savedPercentage.value = 0
}

const updateSettings = (newSettings: typeof settings.value) => {
  settings.value = { ...newSettings }
}

// Token counting function (approximation: ~4 characters per token)
const countTokens = (text: string): number => {
  if (!text || !text.trim()) return 0
  // Simple approximation: tokens ≈ characters / 4
  // This is a common approximation for GPT models
  return Math.ceil(text.length / 4)
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
    
    // Calculate token counts - compare against minified JSON for fair comparison
    const minifiedJson = JSON.stringify(parsed)
    jsonTokenCount.value = countTokens(minifiedJson)
    toonTokenCount.value = countTokens(result)
    
    // Calculate saved percentage
    if (jsonTokenCount.value > 0) {
      const saved = jsonTokenCount.value - toonTokenCount.value
      savedPercentage.value = (saved / jsonTokenCount.value) * 100
    } else {
      savedPercentage.value = 0
    }
    
    showToast('Conversion complete!')
  } catch (e) {
    showToast('Conversion failed', true)
    console.error('Conversion error:', e)
  } finally {
    isConverting.value = false
  }
}

// Check if array is tabular (all objects with same keys, only primitive values)
const isTabularArray = (arr: any[]): boolean => {
  if (arr.length === 0) return false
  
  const firstItem = arr[0]
  if (typeof firstItem !== 'object' || firstItem === null || Array.isArray(firstItem)) {
    return false
  }
  
  const keys = Object.keys(firstItem)
  if (keys.length === 0) return false
  
  // Check all items have same structure and only primitive values
  for (const item of arr) {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      return false
    }
    
    const itemKeys = Object.keys(item)
    if (itemKeys.length !== keys.length || !itemKeys.every(k => keys.includes(k))) {
      return false
    }
    
    // Check all values are primitives (not objects or arrays)
    for (const value of Object.values(item)) {
      if (value !== null && typeof value === 'object') {
        return false
      }
    }
  }
  
  return true
}

const convertJsonToToon = (
  obj: any,
  settings: typeof settings.value,
  indent: number = 0
): string => {
  if (indent > 20) {
    return '...'
  }
  
  const nextIndent = indent + 1
  const indentSize = Math.min(settings.indentSize, 1) // Use minimal indentation for token efficiency
  const indentStr = ' '.repeat(indent * indentSize)
  const delimiter = ',' // Use comma delimiter for tabular data
  
  if (obj === null) return ''
  if (obj === undefined) return ''
  if (typeof obj === 'string') return obj
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj)
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    
    // Check if this is a tabular array (most token-efficient format)
    if (isTabularArray(obj)) {
      const firstItem = obj[0]
      const keys = Object.keys(firstItem)
      const lengthMarker = `[${obj.length}]`
      let result = `items${lengthMarker}{${keys.join(delimiter)}}:\n`
      
      obj.forEach(item => {
        const values = keys.map(key => {
          const val = item[key]
          if (val === null || val === undefined) return ''
          if (typeof val === 'string') return val
          return String(val)
        })
        result += indentStr + values.join(delimiter) + '\n'
      })
      
      return result
    }
    
    // For small primitive arrays, use inline format
    if (obj.length <= 10 && indent < 4 && obj.every(item => 
      item === null || item === undefined || (typeof item !== 'object')
    )) {
      const items = obj.map(item => {
        if (item === null || item === undefined) return ''
        if (typeof item === 'string') return item
        return String(item)
      })
      const inline = `[${items.join(delimiter)}]`
      if (inline.length < 60 || obj.length <= 5) {
        return inline
      }
    }
    
    // Use compact list format for non-tabular arrays
    const lengthMarker = `[${obj.length}]`
    let result = `items${lengthMarker}:\n`
    
    obj.forEach(item => {
      if (Array.isArray(item) || (typeof item === 'object' && item !== null)) {
        const converted = convertJsonToToon(item, settings, nextIndent)
        result += indentStr + '- ' + converted.trimStart()
      } else {
        const val = item === null || item === undefined ? '' : String(item)
        result += indentStr + '- ' + val + '\n'
      }
    })
    
    return result
  }
  
  if (typeof obj === 'object') {
    const keys = Object.keys(obj)
    if (keys.length === 0) return '{}'
    
    // Try inline format for small objects with primitive values
    if (keys.length <= 5 && indent < 3) {
      const allPrimitives = keys.every(k => {
        const v = obj[k]
        return v === null || v === undefined || typeof v !== 'object'
      })
      if (allPrimitives) {
        const pairs = keys.map(k => {
          const v = obj[k]
          if (v === null || v === undefined) return `${k}:`
          if (typeof v === 'string') return `${k}:${v}`
          return `${k}:${v}`
        })
        const inline = `{${pairs.join(delimiter)}}`
        if (inline.length < 80) {
          return inline
        }
      }
    }
    
    // Use compact object format
    let result = ''
    keys.forEach((key, i) => {
      const value = obj[key]
      if (Array.isArray(value)) {
        result += indentStr + key + ': ' + convertJsonToToon(value, settings, nextIndent)
      } else if (typeof value === 'object' && value !== null) {
        result += indentStr + key + ':\n' + convertJsonToToon(value, settings, nextIndent)
      } else {
        const val = value === null || value === undefined ? '' : String(value)
        result += indentStr + key + ': ' + val + '\n'
      }
    })
    
    return result
  }
  
  return String(obj)
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

.token-stats {
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 1px solid #dee2e6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-item-saved {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.stat-item-increased {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.stat-item-saved .stat-label,
.stat-item-increased .stat-label {
  color: rgba(255, 255, 255, 0.9);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
}

.stat-value-saved,
.stat-value-increased {
  color: white;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
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
