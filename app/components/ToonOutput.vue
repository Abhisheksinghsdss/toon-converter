<template>
  <div class="toon-output">
    <div class="editor-header">
      <label class="editor-label">TOON OUTPUT</label>
      <div class="output-actions">
        <button @click="copyOutput" class="action-btn" :disabled="!output">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy
        </button>
        <button @click="downloadOutput" class="action-btn" :disabled="!output">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download
        </button>
      </div>
    </div>
    <textarea
      :value="output"
      class="editor-textarea"
      readonly
      placeholder="Toon output will appear here..."
      rows="15"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  output: string
}>()

const emit = defineEmits<{
  copy: []
  download: []
}>()

const copyOutput = async () => {
  if (!props.output) return
  
  try {
    await navigator.clipboard.writeText(props.output)
    emit('copy')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const downloadOutput = () => {
  if (!props.output) return
  
  const blob = new Blob([props.output], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'toon-output.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  emit('download')
}
</script>

<style scoped>
.toon-output {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.editor-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b7280;
}

.output-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #667eea;
  color: #667eea;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.editor-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  resize: vertical;
  background: #f5f5f5;
  line-height: 1.6;
  box-sizing: border-box;
  cursor: default;
}
</style>

