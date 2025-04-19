<template>
  <div>
    <UContainer>
      <UPageHeader
        :title="title"
        :description="description"
        class="mb-8"
      />
      <ContentDoc>
        <template #default="{ doc }">
          <UProse>
            <ContentRenderer :value="doc" />
          </UProse>
        </template>
        <template #not-found>
          <UAlert
            title="Page not found"
            description="The page you're looking for doesn't exist."
            color="red"
            variant="soft"
            icon="i-heroicons-exclamation-triangle"
          />
        </template>
      </ContentDoc>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(`content-${route.path}`, () => queryContent(route.path).findOne())

const title = computed(() => page.value?.title || 'Documentation')
const description = computed(() => page.value?.description || '')
</script> 