<template>
  <div class="playground-container">
    <div class="editor-container">
      <div class="editor-header">
        <span class="editor-title">Racket Input</span>
        <div class="editor-actions">
          <UButton
            size="xs"
            color="neutral"
            variant="ghost"
            icon="i-heroicons-play"
            @click="runCode"
          >
            Run
          </UButton>
        </div>
      </div>
      <div class="editor-content">
        <MonacoEditor
          v-model="racketInput"
          language="racket"
          theme="vs-dark"
          :options="editorOptions"
          @change="compileCode"
        />
      </div>
    </div>
    
    <div class="editor-container">
      <div class="editor-header">
        <span class="editor-title">Luau Output</span>
        <div class="editor-actions">
          <UButton
            size="xs"
            color="neutral"
            variant="ghost"
            icon="i-heroicons-arrow-path"
            @click="clearOutput"
          >
            Clear
          </UButton>
        </div>
      </div>
      <div class="editor-content">
        <MonacoEditor
          v-model="luauOutput"
          language="lua"
          theme="vs-dark"
          :options="{ ...editorOptions, readOnly: true }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from 'monaco-editor-vue3'

const racketInput = ref('')
const luauOutput = ref('')

const editorOptions = {
  automaticLayout: true,
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  theme: 'vs-dark'
}

const compileCode = () => {
  // Basic Racket to Luau conversion
  const input = racketInput.value
  let output = input
    .replace(/\(define\s+\((\w+)\s+([^)]+)\)\s+([^)]+)\)/g, 'local function $1($2)\n    return $3\nend')
    .replace(/\(add\s+(\w+)\s+(\w+)\)/g, '$1 + $2')
    .replace(/\(sub\s+(\w+)\s+(\w+)\)/g, '$1 - $2')
    .replace(/\(mul\s+(\w+)\s+(\w+)\)/g, '$1 * $2')
    .replace(/\(div\s+(\w+)\s+(\w+)\)/g, '$1 / $2')
  
  luauOutput.value = output
}

const runCode = () => {
  compileCode()
  // Add any additional execution logic here
}

const clearOutput = () => {
  luauOutput.value = ''
}
</script>

<style scoped>
.playground-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  height: 100%;
  background: #1e1e1e;
}

.editor-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  background: #252526;
}

.editor-header {
  padding: 0.5rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #3c3c3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-title {
  color: #d4d4d4;
  font-family: 'Consolas', monospace;
  font-size: 0.9rem;
}

.editor-actions {
  display: flex;
  gap: 0.5rem;
}

.editor-content {
  flex: 1;
  overflow: hidden;
}

:deep(.monaco-editor) {
  border-radius: 0;
}

:deep(.monaco-editor .margin) {
  background-color: #1e1e1e;
}
</style> 