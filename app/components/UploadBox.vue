<template>
  <div class="upload-box">
    <label for="file-input" class="upload-label">
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
          <div class="upload-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <p class="drop-zone-text">
            <strong>Click to upload</strong> or drag and drop
          </p>
          <p class="drop-zone-hint">JSON or REST file max 50MB</p>
        </div>
      </div>
    </label>
    <div v-if="selectedFile" class="file-info">
      <div class="file-info-content">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="file-icon">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <div class="file-details">
          <span class="file-name">{{ selectedFile.name }}</span>
          <span class="file-size">{{ formatFileSize(selectedFile.size) }}</span>
        </div>
      </div>
      <button @click="clearFile" class="btn-clear" title="Remove file">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  fileLoaded: [content: string]
  error: [message: string]
}>()

const isDragOver = ref(false)
const selectedFile = ref<File | null>(null)

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
  if (file.size > 50 * 1024 * 1024) {
    emit('error', 'File is too large. Maximum size is 50MB.')
    return
  }
  
  if (!file.name.endsWith('.json') && file.type !== 'application/json') {
    emit('error', 'Please select a valid JSON file.')
    return
  }
  
  selectedFile.value = file
  
  try {
    const text = await readFileAsText(file)
    emit('fileLoaded', text)
  } catch (err) {
    emit('error', 'Failed to read file. Please try again.')
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
</script>

<style scoped>
.upload-box {
  margin-bottom: 2rem;
}

.upload-label {
  display: block;
  cursor: pointer;
}

.file-input {
  display: none;
}

.drop-zone {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background: #ffffff;
  position: relative;
}

.drop-zone:hover {
  border-color: #667eea;
  background: #f8f9ff;
}

.drop-zone.drag-over {
  border-color: #667eea;
  background: #f0f4ff;
  border-style: solid;
  transform: scale(1.01);
}

.drop-zone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.drop-zone-text {
  margin: 0;
  font-size: 1rem;
  color: #1f2937;
  line-height: 1.5;
}

.drop-zone-text strong {
  color: #374151;
  font-weight: 600;
}

.drop-zone-hint {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
}

.file-info {
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e7eb;
}

.file-info-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.file-icon {
  color: #667eea;
  flex-shrink: 0;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
}

.file-name {
  font-weight: 500;
  color: #1f2937;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 0.75rem;
  color: #6b7280;
}

.btn-clear {
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.375rem;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-clear:hover {
  background: #fee2e2;
  color: #dc2626;
}

@media (max-width: 768px) {
  .drop-zone {
    padding: 2.5rem 1.5rem;
  }
  
  .upload-icon svg {
    width: 36px;
    height: 36px;
  }
  
  .drop-zone-text {
    font-size: 0.95rem;
  }
}
</style>
