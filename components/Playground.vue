<template>
  <div class="playground">
    <!-- Test div to verify border radius -->
    <div class="w-32 h-32 bg-blue-500 rounded-lg mb-4"></div>
    
    <div class="flex gap-4 h-[600px]">
      <div class="flex-1">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Code Editor</h3>
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
          </template>
          <div ref="editorContainer" class="h-[500px]"></div>
        </UCard>
      </div>
      <div class="flex-1">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Output</h3>
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
          </template>
          <div ref="outputContainer" class="h-[500px] overflow-auto p-4"></div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as monaco from 'monaco-editor'
import loader from '@monaco-editor/loader'

const editorContainer = ref<HTMLElement | null>(null)
const outputContainer = ref<HTMLElement | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

const defaultCode = `import { Component } from '@apollo/core';

class HelloWorld extends Component {
  render() {
    return (
      <div>
        <h1>Hello, Apollo!</h1>
        <p>Welcome to the playground.</p>
      </div>
    );
  }
}

// Create and mount the component
const app = new App({
  components: [HelloWorld]
});

app.mount('#app');`

onMounted(async () => {
  // Load Monaco
  await loader.init()
  
  if (editorContainer.value) {
    editor = monaco.editor.create(editorContainer.value, {
      value: defaultCode,
      language: 'typescript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false }
    })
  }
})

const runCode = () => {
  if (!editor || !outputContainer.value) return
  
  const code = editor.getValue()
  outputContainer.value.innerHTML = ''
  
  try {
    // Create a sandboxed environment
    const sandbox = document.createElement('iframe')
    sandbox.style.display = 'none'
    document.body.appendChild(sandbox)
    
    // Execute the code in the sandbox
    const script = sandbox.contentDocument?.createElement('script')
    if (script) {
      script.textContent = `
        try {
          ${code}
        } catch (error) {
          console.error(error);
        }
      `
      sandbox.contentDocument?.body.appendChild(script)
    }
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(sandbox)
    }, 1000)
  } catch (error) {
    outputContainer.value.innerHTML = `<pre class="text-red-500">${error}</pre>`
  }
}

const clearOutput = () => {
  if (outputContainer.value) {
    outputContainer.value.innerHTML = ''
  }
}
</script>

<style scoped>
.playground {
  @apply w-full;
}

:deep(.monaco-editor) {
  border-radius: 0.5rem;
}
</style> 