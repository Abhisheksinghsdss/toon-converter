<template>
  <div class="container">
    <header class="header">
      <h1 class="title">JSON to Toon Converter</h1>
      <p class="subtitle">Convert your JSON data to toon format instantly</p>
    </header>

    <main class="main-content">
      <div class="converter-wrapper">
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
            <button @click="clearInput" class="btn btn-secondary">Clear</button>
            <button @click="loadExample" class="btn btn-secondary">Load Example</button>
          </div>
        </div>

        <div class="action-section">
          <button 
            @click="convertToToon" 
            class="btn btn-primary"
            :disabled="!jsonInput.trim()"
          >
            Convert to Toon
          </button>
        </div>

        <div class="output-section">
          <div class="output-header">
            <label for="toon-output" class="label">Toon Output</label>
            <button @click="copyToClipboard" class="btn btn-small" :disabled="!toonOutput">
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'JSON to Toon Converter'
})

const jsonInput = ref('')
const toonOutput = ref('')
const error = ref('')

const convertToToon = () => {
  error.value = ''
  toonOutput.value = ''
  
  if (!jsonInput.value.trim()) {
    error.value = 'Please enter JSON data'
    return
  }

  try {
    // Parse JSON to validate
    const parsed = JSON.parse(jsonInput.value)
    
    // Convert to toon format
    // This is a placeholder - implement actual conversion logic
    toonOutput.value = convertJsonToToon(parsed)
  } catch (e) {
    error.value = 'Invalid JSON format. Please check your input.'
    console.error('JSON parse error:', e)
  }
}

const convertJsonToToon = (obj: any): string => {
  // Placeholder conversion logic
  // This should be replaced with actual toon format conversion
  return JSON.stringify(obj, null, 2)
}

const clearInput = () => {
  jsonInput.value = ''
  toonOutput.value = ''
  error.value = ''
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
    // You could add a toast notification here
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.converter-wrapper {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.input-section,
.output-section {
  margin-bottom: 2rem;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1rem;
}

.textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  resize: vertical;
  transition: border-color 0.3s;
}

.textarea:focus {
  outline: none;
  border-color: #667eea;
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
  margin: 2rem 0;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
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

.error-message {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #fee;
  color: #c33;
  border-radius: 6px;
  border-left: 4px solid #c33;
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
}
</style>
