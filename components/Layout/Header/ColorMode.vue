<template>
  <UButton
    color="gray"
    variant="ghost"
    size="xl"
    @click="toggleColorMode"
    square
    class="text-2xl"
  >
    <UIcon v-if="isDark" name="i-line-md-moon-filled-loop" />
    <UIcon v-else name="i-line-md-sunny-filled-loop" />
  </UButton>
</template>

<script setup>
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')

  const toggleColorMode = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'

    document.documentElement.classList.add('transitioning')

    setTimeout(() => {
      document.documentElement.classList.remove('transitioning')
    }, 100)
  }
</script>

<style lang="scss">
  .transitioning {
    *,
    *::before,
    *::after {
      transition: none !important;
    }
  }
</style>
