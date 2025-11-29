<template>
  <div class="json-editor">
    <div class="editor-header">
      <label class="editor-label">JSON INPUT</label>
    </div>
    <textarea
      :value="modelValue"
      @input="handleInput"
      @blur="validate"
      class="editor-textarea"
      :class="{ 'error': hasError }"
      placeholder='Enter your JSON here, e.g., {"name": "John", "age": 30}'
      rows="15"
    ></textarea>
    <div v-if="hasError" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'validation': [isValid: boolean, error?: string]
}>()

const hasError = ref(false)
const errorMessage = ref('')

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  hasError.value = false
  errorMessage.value = ''
}

const validate = () => {
  if (!props.modelValue.trim()) {
    emit('validation', true)
    return
  }
  
  try {
    JSON.parse(props.modelValue)
    hasError.value = false
    errorMessage.value = ''
    emit('validation', true)
  } catch (e) {
    hasError.value = true
    errorMessage.value = e instanceof Error ? e.message : 'Invalid JSON format'
    emit('validation', false, errorMessage.value)
  }
}

watch(() => props.modelValue, () => {
  if (hasError.value) {
    validate()
  }
})
</script>

<style scoped>
.json-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
}

.editor-header {
  margin-bottom: 0.5rem;
}

.editor-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b7280;
}

.editor-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  resize: vertical;
  transition: all 0.2s;
  background: #fafafa;
  line-height: 1.6;
  box-sizing: border-box;
}

.editor-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.editor-textarea.error {
  border-color: #ef4444;
  background: #fef2f2;
}

.error-message {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #fee;
  color: #c33;
  border-radius: 6px;
  font-size: 0.875rem;
  border-left: 4px solid #ef4444;
}
</style>

