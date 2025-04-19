<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Code Playground</h1>
    <ClientOnly fallback-tag="div" fallback="Loading Editor...">
      <div ref="editorContainer" style="height: 500px; border: 1px solid #ccc;"></div>
      <button @click="runCode" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Run Code
      </button>
      <div v-if="output" class="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
        <h2 class="text-lg font-semibold mb-2">Output:</h2>
        <pre>{{ output }}</pre>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// Import Monaco types, but load the editor dynamically
import type * as monaco from 'monaco-editor'

const editorContainer = ref<HTMLElement | null>(null)
const output = ref<string | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

// Lazy load monaco editor only on client side
const monacoLoader = async () => {
  if (process.client) {
    const loader = await import('@monaco-editor/loader')
    return loader.default
  } 
  return null
}

const initialCode = `// Welcome to the Playground!
// You can write and run JavaScript code here.

function greet(name: string) {
  console.log('Hello, ' + name + '!');
}

greet('Apollo User');
`

onMounted(async () => {
  const loader = await monacoLoader()
  if (editorContainer.value && loader) {
     loader.init().then((monacoInstance) => {
       editor = monacoInstance.editor.create(editorContainer.value!, {
         value: initialCode,
         language: 'javascript',
         theme: 'vs-dark', // You can change the theme e.g., 'vs', 'hc-black'
         automaticLayout: true,
         minimap: { enabled: false }
       })
     }).catch(error => console.error('Monaco Editor load error:', error))
  }
})

onUnmounted(() => {
  if (editor) {
    editor.dispose()
  }
})

const runCode = () => {
  if (editor) {
    const code = editor.getValue()
    output.value = null // Clear previous output
    try {
      // Capture console.log output
      const logs: string[] = []
      const originalConsoleLog = console.log
      console.log = (...args) => {
        logs.push(args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' '))
        originalConsoleLog(...args) // Keep original console behavior
      }

      // Use Function constructor to execute code in a sandboxed scope
      const result = new Function(code)()
      output.value = logs.join('\n')
      if (result !== undefined) {
        output.value = `${output.value || ''}\nReturn Value: ${JSON.stringify(result)}`.trim()
      }
      if (!output.value) {
        output.value = "Code executed successfully, no output."
      }

      console.log = originalConsoleLog // Restore original console.log
    } catch (error) {
      console.error("Code execution error:", error)
      output.value = `Error: ${error instanceof Error ? error.message : String(error)}`
    }
  }
}
</script>

<style>
/* Add any custom styles for the editor if needed */
</style> 