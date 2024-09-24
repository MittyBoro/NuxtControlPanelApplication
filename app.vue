<template>
  <NuxtLoadingIndicator color="rgba(var(--color-primary-500))" />
  <NuxtLayout>
    <SeoTitle />
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>

<script setup>
  useHead({
    meta: [{ name: 'robots', content: 'noindex,follow' }],
  })
</script>

<style lang="scss">
  .page-enter-active,
  .page-leave-active {
    transition: all 0.25s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    height: 0;
  }
</style>
