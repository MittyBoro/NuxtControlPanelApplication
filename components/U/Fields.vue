<template>
  <!--  -->
  <template v-if="type === 'number'">
    <UInput v-model="modelValue" type="number" />
  </template>

  <!--  -->
  <template v-else-if="type === 'date'">
    <UInput v-model="modelValue" type="date" />
  </template>

  <!--  -->
  <template v-else-if="type === 'datetime'">
    <UInput v-model="modelValue" type="datetime" />
  </template>

  <!--  -->
  <template v-else-if="type === 'datetime-range'">
    <UDatePickerRange v-model="modelValue" />
  </template>

  <!--  -->
  <template v-else-if="type === 'text'">
    <UTextarea v-model="modelValue" autoresize />
  </template>

  <!--  -->
  <template v-else-if="type === 'prose'">
    <UTextEditor v-model="modelValue" mini />
  </template>

  <!--  -->
  <template v-else-if="type === 'boolean' && typeof modelValue == 'boolean'">
    <UToggle v-model="modelValue" />
  </template>

  <!--  -->
  <template v-else-if="type === 'select'">
    <USelect v-model="modelValue" :options="options" />
  </template>

  <!--  -->
  <template v-else-if="type === 'array'">
    <UArray type="array" v-model="modelValue" />
  </template>

  <!--  -->
  <template v-else="">
    <UInput v-model="modelValue" />
  </template>
</template>

<script setup>
  const { type, options } = defineProps({
    type: String,
    options: {
      type: Array,
      default: () => [],
    },
  })

  const modelValue = defineModel()

  watch(
    () => modelValue.value,
    (value) => {
      if (type === 'number') {
        modelValue.value = Number(value)
      }
      if (type === 'boolean') {
        if (modelValue.value === 'true' || value === '1') {
          modelValue.value = true
        } else if (value === 'false' || value === '0') {
          modelValue.value = false
        } else {
          modelValue.value = Boolean(value)
        }
      }
      if (type === 'date') {
        modelValue.value = formatInputDate(value)
      }
      if (type === 'datetime') {
        modelValue.value = formatInputDateTime(value)
      }
    },
    { immediate: true },
  )
</script>

<style lang="scss" scoped>
  :deep(.relative) {
    width: 100%;
  }
</style>
