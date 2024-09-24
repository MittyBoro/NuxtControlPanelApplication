<template>
  <main
    class="min-h-screen max-w-full w-full overflow-hidden py-20 px-6 flex flex-col justify-center items-center"
  >
    <LayoutHeaderColorMode class="absolute top-5" />

    <div class="relative w-full max-w-md mb-10">
      <slot></slot>
    </div>
  </main>
</template>

<script setup>
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

  .back {
    font-size: min(100vh, 100vw);
  }
</style>
