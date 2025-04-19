<template>
  <div class="py-8">
    <UContainer>
      <UPageHeader
        title="Apollo Documentation"
        description="Learn how to build modern applications with Apollo"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-academic-cap" class="w-6 h-6" />
              <h3 class="text-lg font-semibold">Tutorials</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Step-by-step learning paths for beginners. Start here if you're new to Apollo.
          </p>
          <template #footer>
            <UButton
              to="/apollo-site/tutorials"
              color="gray"
              variant="ghost"
              block
            >
              View Tutorials
            </UButton>
          </template>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-book-open" class="w-6 h-6" />
              <h3 class="text-lg font-semibold">How-to Guides</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Task-oriented guides for specific problems. Find solutions to common challenges.
          </p>
          <template #footer>
            <UButton
              to="/apollo-site/how-to-guides"
              color="gray"
              variant="ghost"
              block
            >
              View Guides
            </UButton>
          </template>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-document-text" class="w-6 h-6" />
              <h3 class="text-lg font-semibold">Reference</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Technical documentation of the API. Look up details about specific features.
          </p>
          <template #footer>
            <UButton
              to="/apollo-site/reference"
              color="gray"
              variant="ghost"
              block
            >
              View Reference
            </UButton>
          </template>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="w-6 h-6" />
              <h3 class="text-lg font-semibold">Explanation</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Background and context for understanding. Learn about Apollo's architecture and design.
          </p>
          <template #footer>
            <UButton
              to="/apollo-site/explanation"
              color="gray"
              variant="ghost"
              block
            >
              View Explanations
            </UButton>
          </template>
        </UCard>
      </div>

      <div class="mt-12">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-code-bracket" class="w-6 h-6" />
              <h3 class="text-lg font-semibold">Try Apollo in the Playground</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Experiment with Apollo code directly in your browser. No setup required.
          </p>
          <template #footer>
            <UButton
              to="/apollo-site/playground"
              color="primary"
              variant="solid"
              block
            >
              Open Playground
            </UButton>
          </template>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 