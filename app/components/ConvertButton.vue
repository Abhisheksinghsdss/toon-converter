<template>
  <div class="convert-button-wrapper">
    <button 
      @click="emit('convert')"
      class="convert-btn"
      :disabled="disabled || loading"
    >
      <span v-if="loading" class="btn-content">
        <span class="spinner"></span>
        Converting...
      </span>
      <span v-else class="btn-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="13 1 23 12 13 23"></polyline>
          <polyline points="1 1 11 12 1 23"></polyline>
        </svg>
        Convert to TOON
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  convert: []
}>()
</script>

<style scoped>
.convert-button-wrapper {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.convert-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  min-width: 200px;
}

.convert-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.convert-btn:active:not(:disabled) {
  transform: translateY(0);
}

.convert-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

