<template>
  <main v-if="user" class="relative xl:grid xl:grid-cols-[auto_1fr] xl:py-6">
    <Modal />
    <LayoutSidebar />

    <div
      class="xl:rounded-[2rem] py-5 xl:py-9 sm:px-4 xl:px-8 xl:mr-2 bg-gray-100 dark:bg-gray-950"
    >
      <LayoutHeader class="mb-4 xl:mb-8 max-sm:px-2" />
      <div class="py-2 sm:py-4">
        <slot></slot>
      </div>
    </div>

    <div
      class="py-5 xl:pb-0 font-bold text-xs text-gray-500 text-center col-span-full"
    >
      PanelKa v{{ pkg.version }} with
      <UIcon name="❤️" />
    </div>
  </main>
</template>

<script setup>
  import pkg from '~/package.json'

  const user = useApiUser()

  useHead({
    htmlAttrs: {
      lang: 'ru',
    },
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700;900&display=swap',
      },
    ],
    meta: [
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'MobileOptimized', content: '320' },
    ],
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
    transform: translateX(10px);
  }
</style>
