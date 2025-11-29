<template>
  <div class="tools-panel">
    <div class="tools-left">
      <button @click="emit('beautify')" class="tool-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
        Beautify
      </button>
      <button @click="emit('minify')" class="tool-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
        </svg>
        Minify
      </button>
      <button @click="emit('validate')" class="tool-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Validate
      </button>
      <button @click="emit('loadExample')" class="tool-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
        Load Example
      </button>
      <button @click="emit('clear')" class="tool-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
        Clear
      </button>
    </div>
    <div class="tools-right">
      <SettingsDropdown :settings="settings" @update:settings="emit('settingsChange', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  settings: {
    indentSize: number
    arrayDisplay: 'inline' | 'block'
    showTypeInfo: boolean
    asciiTreeStyle: boolean
  }
}>()

const emit = defineEmits<{
  beautify: []
  minify: []
  validate: []
  loadExample: []
  clear: []
  settingsChange: [settings: {
    indentSize: number
    arrayDisplay: 'inline' | 'block'
    showTypeInfo: boolean
    asciiTreeStyle: boolean
  }]
}>()
</script>

<style scoped>
.tools-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  flex-wrap: wrap;
}

.tools-left {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tools-right {
  display: flex;
  align-items: center;
}

.tool-btn {
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

.tool-btn:hover {
  background: #f3f4f6;
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-1px);
}

.tool-btn svg {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .tools-panel {
    flex-direction: column;
    align-items: stretch;
  }
  
  .tools-left {
    width: 100%;
    justify-content: space-between;
  }
  
  .tools-right {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>

