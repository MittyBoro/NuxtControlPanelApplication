<template>
  <UFormGroup v-bind="attrs">
    <UButtonGroup v-bind="attrs">
      <slot></slot>
      <UButton icon="i-ci-close-small" color="gray" @click="value = ''" />
    </UButtonGroup>
  </UFormGroup>
</template>

<script setup>
  defineOptions({
    inheritAttrs: false,
  })

  const attrs = useAttrs()

  const value = defineModel()
</script>
