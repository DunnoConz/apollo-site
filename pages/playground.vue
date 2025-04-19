<template>
  <div class="py-8">
    <UContainer>
      <UPageHeader
        title="Playground"
        description="Try out Apollo code in your browser"
      />

      <div class="mt-8">
        <Playground />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 