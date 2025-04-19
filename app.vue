<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer>
      <UHeader>
        <template #left>
          <NuxtLink to="/" class="flex items-center gap-2">
            <img src="/logo.jpg" alt="Apollo Logo" class="w-8 h-8 rounded" />
            <span class="font-bold">Apollo</span>
          </NuxtLink>
        </template>
        <template #right>
          <UColorModeButton />
          <UButton
            to="https://github.com/your-org/apollo"
            target="_blank"
            icon="i-simple-icons-github"
            color="gray"
            variant="ghost"
          />
        </template>
      </UHeader>

      <div class="flex gap-6 py-6">
        <aside class="w-64 shrink-0">
          <UVerticalNavigation
            :links="navigationLinks"
            class="sticky top-6"
          />
        </aside>

        <main class="flex-1">
          <NuxtPage />
        </main>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const navigationLinks = [
  {
    label: 'Getting Started',
    icon: 'i-heroicons-home',
    to: '/getting-started'
  },
  {
    label: 'Tutorials',
    icon: 'i-heroicons-academic-cap',
    to: '/tutorials'
  },
  {
    label: 'How-to Guides',
    icon: 'i-heroicons-book-open',
    to: '/how-to-guides'
  },
  {
    label: 'Reference',
    icon: 'i-heroicons-document-text',
    to: '/reference'
  },
  {
    label: 'Explanation',
    icon: 'i-heroicons-light-bulb',
    to: '/explanation'
  },
  {
    label: 'Playground',
    icon: 'i-heroicons-code-bracket',
    to: '/playground'
  }
]
</script>
