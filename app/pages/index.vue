<template>
  <div class="container">
    <header class="header">
      <h1 class="title">JSON to Toon Converter</h1>
      <p class="subtitle">Convert your JSON data to toon format instantly</p>
    </header>

    <main class="main-content">
      <div class="converter-wrapper">
        <!-- File Upload Section -->
        <div class="file-upload-section">
          <label for="file-input" class="file-upload-label">
            <div 
              class="drop-zone"
              :class="{ 'drag-over': isDragOver }"
              @drop.prevent="handleFileDrop"
              @dragover.prevent="isDragOver = true"
              @dragleave.prevent="isDragOver = false"
            >
              <input
                id="file-input"
                type="file"
                accept=".json,application/json"
                @change="handleFileSelect"
                class="file-input"
              />
              <div class="drop-zone-content">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p class="drop-zone-text">
                  <strong>Click to upload</strong> or drag and drop
                </p>
                <p class="drop-zone-hint">JSON files only (Max 50MB)</p>
              </div>
            </div>
          </label>
          <div v-if="selectedFile" class="file-info">
            <div class="file-info-content">
              <span class="file-name">{{ selectedFile.name }}</span>
              <span class="file-size">{{ formatFileSize(selectedFile.size) }}</span>
            </div>
            <button @click="clearFile" class="btn btn-small btn-clear">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Clear File
            </button>
          </div>
          <div v-if="fileWarning" class="warning-message">
            {{ fileWarning }}
          </div>
        </div>

        <div class="input-section">
          <label for="json-input" class="label">JSON Input</label>
          <textarea
            id="json-input"
            v-model="jsonInput"
            class="textarea"
            placeholder='Enter your JSON here, e.g., {"name": "John", "age": 30}'
            rows="10"
          ></textarea>
          <div class="button-group">
            <button @click="clearInput" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Clear
            </button>
            <button @click="loadExample" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              Load Example
            </button>
          </div>
          <div v-if="inputSizeWarning" class="warning-message">
            {{ inputSizeWarning }}
          </div>
        </div>

        <div class="action-section">
          <button 
            @click="convertToToon" 
            class="btn btn-primary"
            :disabled="!jsonInput.trim() || isConverting"
          >
            <span v-if="isConverting" class="btn-content">
              <span class="spinner"></span>
              Converting...
            </span>
            <span v-else class="btn-content">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            Convert to Toon
            </span>
          </button>
            <button 
            v-if="isConverting" 
            @click="cancelConversion" 
            class="btn btn-secondary btn-cancel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            Cancel
          </button>
        </div>

        <div v-if="conversionStats" class="stats-section">
          <div class="stat-item">
            <span class="stat-label">Processing time:</span>
            <span class="stat-value">{{ conversionStats.time }}ms</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Items processed:</span>
            <span class="stat-value">{{ conversionStats.items }}</span>
          </div>
        </div>

        <div class="output-section">
          <div class="output-header">
            <label for="toon-output" class="label">Toon Output</label>
            <button @click="copyToClipboard" class="btn btn-small" :disabled="!toonOutput">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </button>
          </div>
          <textarea
            id="toon-output"
            v-model="toonOutput"
            class="textarea"
            placeholder="Toon output will appear here..."
            rows="10"
            readonly
          ></textarea>
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </div>
      </div>
    </main>
    
    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" class="toast">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'JSON to Toon Converter'
})

// Constants
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const WARN_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const WARN_INPUT_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_DEPTH = 20
const ARRAY_TRUNCATE_THRESHOLD = 100
const ARRAY_SHOW_FIRST = 50
const ARRAY_SHOW_LAST = 10
const OBJECT_TRUNCATE_THRESHOLD = 50
const OBJECT_SHOW_FIRST = 25
const OBJECT_SHOW_LAST = 10
const CHUNK_SIZE = 1000 // Process arrays in chunks

// Reactive state
const jsonInput = ref('')
const toonOutput = ref('')
const error = ref('')
const selectedFile = ref<File | null>(null)
const isDragOver = ref(false)
const fileWarning = ref('')
const inputSizeWarning = ref('')
const isConverting = ref(false)
const conversionCancelled = ref(false)
const conversionStats = ref<{ time: number; items: number } | null>(null)
const showToast = ref(false)
const toastMessage = ref('')

// File handling
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

const handleFileDrop = (event: DragEvent) => {
  isDragOver.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    processFile(file)
  }
}

const processFile = async (file: File) => {
  fileWarning.value = ''
  error.value = ''
  
  // Validate file type
  if (!file.name.endsWith('.json') && file.type !== 'application/json') {
    fileWarning.value = 'Please select a valid JSON file'
    return
  }
  
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    fileWarning.value = `File is too large (${formatFileSize(file.size)}). Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`
    return
  }
  
  if (file.size > WARN_FILE_SIZE) {
    fileWarning.value = `Large file detected (${formatFileSize(file.size)}). Processing may take a while.`
  }
  
  selectedFile.value = file
  
  // Read file content
  try {
    const text = await readFileAsText(file)
    jsonInput.value = text
    checkInputSize(text.length)
  } catch (err) {
    error.value = 'Failed to read file. Please try again.'
    console.error('File read error:', err)
  }
}

const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = reject
    reader.readAsText(file)
  })
}

const clearFile = () => {
  selectedFile.value = null
  fileWarning.value = ''
  const fileInput = document.getElementById('file-input') as HTMLInputElement
  if (fileInput) {
    fileInput.value = ''
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Input size checking
const checkInputSize = (size: number) => {
  if (size > WARN_INPUT_SIZE) {
    inputSizeWarning.value = `Large input detected (${formatFileSize(size)}). Conversion may take some time.`
  } else {
    inputSizeWarning.value = ''
  }
}

watch(jsonInput, (newValue) => {
  checkInputSize(newValue.length)
})

// Conversion with async processing
const convertToToon = async () => {
  error.value = ''
  toonOutput.value = ''
  conversionStats.value = null
  conversionCancelled.value = false
  isConverting.value = true
  
  if (!jsonInput.value.trim()) {
    error.value = 'Please enter JSON data'
    isConverting.value = false
    return
  }

  const startTime = performance.now()
  let itemsProcessed = 0

  try {
    // Parse JSON to validate
    const parsed = JSON.parse(jsonInput.value)
    
    // Convert to toon format with async processing
    const result = await convertJsonToToonAsync(parsed, (items) => {
      itemsProcessed = items
    })
    
    if (!conversionCancelled.value) {
      toonOutput.value = result
      const endTime = performance.now()
      conversionStats.value = {
        time: Math.round(endTime - startTime),
        items: itemsProcessed
      }
    }
  } catch (e) {
    if (!conversionCancelled.value) {
    error.value = 'Invalid JSON format. Please check your input.'
    console.error('JSON parse error:', e)
  }
  } finally {
    isConverting.value = false
  }
}

const cancelConversion = () => {
  conversionCancelled.value = true
  isConverting.value = false
  error.value = 'Conversion cancelled by user.'
}

// Async conversion function
const convertJsonToToonAsync = async (
  obj: any, 
  progressCallback?: (items: number) => void,
  indent: number = 0
): Promise<string> => {
  // Yield to browser periodically
  if (indent % 5 === 0) {
    await new Promise(resolve => setTimeout(resolve, 0))
  }
  
  if (conversionCancelled.value) {
    return ''
  }
  
  return convertJsonToToon(obj, indent, progressCallback)
}

const convertJsonToToon = (
  obj: any, 
  indent: number = 0,
  progressCallback?: (items: number) => void
): string => {
  // Depth limit check
  if (indent > MAX_DEPTH) {
    return '... (max depth reached)'
  }
  
  const indentStr = '  '.repeat(indent)
  const nextIndent = indent + 1
  const nextIndentStr = '  '.repeat(nextIndent)
  
  // Handle null
  if (obj === null) {
    return 'null'
  }
  
  // Handle undefined
  if (obj === undefined) {
    return 'undefined'
  }
  
  // Handle strings
  if (typeof obj === 'string') {
    return `"${obj}"`
  }
  
  // Handle numbers and booleans
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return String(obj)
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return '[] (empty array)'
    }
    
    // Truncate large arrays
    if (obj.length > ARRAY_TRUNCATE_THRESHOLD) {
      const firstItems: string[] = []
      const lastItems: string[] = []
      
      // Process first items
      for (let i = 0; i < ARRAY_SHOW_FIRST; i++) {
        const converted = convertJsonToToon(obj[i], nextIndent, progressCallback)
        const itemType = getValueType(obj[i])
        firstItems.push(`${nextIndentStr}├─ [${i}] (${itemType}): ${converted}`)
        if (progressCallback) progressCallback(i + 1)
      }
      
      // Process last items
      const startLast = obj.length - ARRAY_SHOW_LAST
      for (let i = startLast; i < obj.length; i++) {
        const converted = convertJsonToToon(obj[i], nextIndent, progressCallback)
        const itemType = getValueType(obj[i])
        lastItems.push(`${nextIndentStr}├─ [${i}] (${itemType}): ${converted}`)
        if (progressCallback) progressCallback(i + 1)
      }
      
      const skipped = obj.length - ARRAY_SHOW_FIRST - ARRAY_SHOW_LAST
      return `Array[${obj.length}]\n${firstItems.join('\n')}\n${nextIndentStr}... (${skipped} items skipped) ...\n${lastItems.join('\n')}`
    }
    
    // Process normal arrays
    const items: string[] = []
    for (let i = 0; i < obj.length; i++) {
      if (conversionCancelled.value) break
      const converted = convertJsonToToon(obj[i], nextIndent, progressCallback)
      const itemType = getValueType(obj[i])
      const isLast = i === obj.length - 1
      const prefix = isLast ? '└─' : '├─'
      items.push(`${nextIndentStr}${prefix} [${i}] (${itemType}): ${converted}`)
      if (progressCallback && i % 100 === 0) {
        progressCallback(i + 1)
      }
    }
    
    if (progressCallback) progressCallback(obj.length)
    return `Array[${obj.length}]\n${items.join('\n')}`
  }
  
  // Handle objects
  if (typeof obj === 'object') {
    const keys = Object.keys(obj)
    
    if (keys.length === 0) {
      return '{} (empty object)'
    }
    
    // Truncate large objects
    if (keys.length > OBJECT_TRUNCATE_THRESHOLD) {
      const firstItems: string[] = []
      const lastItems: string[] = []
      
      // Process first properties
      for (let i = 0; i < OBJECT_SHOW_FIRST; i++) {
        const key = keys[i]
        const value = obj[key]
        const converted = convertJsonToToon(value, nextIndent, progressCallback)
        const valueType = getValueType(value)
        firstItems.push(`${nextIndentStr}├─ ${key} (${valueType}): ${converted}`)
      }
      
      // Process last properties
      const startLast = keys.length - OBJECT_SHOW_LAST
      for (let i = startLast; i < keys.length; i++) {
        const key = keys[i]
        const value = obj[key]
        const converted = convertJsonToToon(value, nextIndent, progressCallback)
        const valueType = getValueType(value)
        lastItems.push(`${nextIndentStr}├─ ${key} (${valueType}): ${converted}`)
      }
      
      const skipped = keys.length - OBJECT_SHOW_FIRST - OBJECT_SHOW_LAST
      return `Object[${keys.length} properties]\n${firstItems.join('\n')}\n${nextIndentStr}... (${skipped} properties skipped) ...\n${lastItems.join('\n')}`
    }
    
    // Process normal objects
    const items: string[] = []
    for (let i = 0; i < keys.length; i++) {
      if (conversionCancelled.value) break
      const key = keys[i]
      const value = obj[key]
      const converted = convertJsonToToon(value, nextIndent, progressCallback)
      const valueType = getValueType(value)
      const isLast = i === keys.length - 1
      const prefix = isLast ? '└─' : '├─'
      items.push(`${nextIndentStr}${prefix} ${key} (${valueType}): ${converted}`)
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

const clearInput = () => {
  jsonInput.value = ''
  toonOutput.value = ''
  error.value = ''
  inputSizeWarning.value = ''
  conversionStats.value = null
  clearFile()
}

const loadExample = () => {
  jsonInput.value = JSON.stringify({
    name: 'John Doe',
    age: 30,
    city: 'New York',
    hobbies: ['reading', 'coding', 'gaming'],
    active: true
  }, null, 2)
}

const copyToClipboard = async () => {
  if (!toonOutput.value) return
  
  try {
    await navigator.clipboard.writeText(toonOutput.value)
    showToastMessage('Copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
    showToastMessage('Failed to copy', true)
  }
}

const showToastMessage = (message: string, isError: boolean = false) => {
  toastMessage.value = message
  showToast.value = true
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow-x: hidden;
}

.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 400;
}

.main-content {
  max-width: 1200px;
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
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  overflow-x: hidden;
  width: 100%;
}

.file-upload-section {
  margin-bottom: 2rem;
}

.file-upload-label {
  display: block;
  cursor: pointer;
}

.file-input {
  display: none;
}

.drop-zone {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #fafafa 0%, #f5f7fa 100%);
  position: relative;
  overflow: hidden;
}

.drop-zone::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s;
}

.drop-zone:hover::before {
  left: 100%;
}

.drop-zone:hover,
.drop-zone.drag-over {
  border-color: #667eea;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.drop-zone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.drop-zone-content svg {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.drop-zone-text {
  margin: 0;
  font-size: 1rem;
}

.drop-zone-hint {
  margin: 0;
  font-size: 0.875rem;
  color: #999;
}

.file-info {
  margin-top: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(102, 126, 234, 0.2);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.file-info-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-weight: 600;
  color: #333;
}

.file-size {
  font-size: 0.875rem;
  color: #666;
}

.input-section,
.output-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.output-section {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1f2937;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

.textarea {
  width: 100%;
  padding: 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  resize: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fafafa;
  line-height: 1.6;
  box-sizing: border-box;
  max-width: 100%;
}

.textarea:focus {
  outline: none;
  border-color: #667eea;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.textarea[readonly] {
  background-color: #f5f5f5;
  cursor: default;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.action-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #495057;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-cancel {
  background: #ff6b6b;
  color: white;
}

.btn-cancel:hover {
  background: #ee5a5a;
}

.btn-clear {
  background: #ff6b6b;
  color: white;
}

.btn-clear:hover {
  background: #ee5a5a;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background: #667eea;
  color: white;
}

.btn-small:hover:not(:disabled) {
  background: #5568d3;
}

.btn-small:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.stats-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.stat-item {
  display: flex;
  gap: 0.5rem;
}

.stat-label {
  font-weight: 600;
  color: #666;
}

.stat-value {
  color: #667eea;
  font-weight: 700;
}

.warning-message {
  margin-top: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  color: #856404;
  border-radius: 10px;
  border-left: 4px solid #ffc107;
  font-size: 0.875rem;
  box-shadow: 0 2px 8px rgba(255, 193, 7, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.warning-message::before {
  content: '⚠️';
  font-size: 1.2rem;
}

.error-message {
  margin-top: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fee 0%, #fdd 100%);
  color: #c33;
  border-radius: 10px;
  border-left: 4px solid #c33;
  box-shadow: 0 2px 8px rgba(204, 51, 51, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-message::before {
  content: '❌';
  font-size: 1.2rem;
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

  .action-section {
    flex-direction: column;
  }

  .stats-section {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Toast Notification */
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

.toast svg {
  flex-shrink: 0;
}

/* Toast Transitions */
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
  .toast {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    min-width: auto;
  }
}
</style>
