<template>
  <USelectMenu
    v-model="selected"
    :options="options"
    :icon="item.icon"
    value-attribute="value"
    option-attribute="label"
    :placeholder="item.placeholder"
    class="min-w-36"
    searchable
  >
    <template #label>
      <template v-if="selectedOption">
        <span
          v-if="selectedOption.dot"
          class="w-2 h-2 rounded-full"
          :class="selectedOption.dot"
        ></span>
        <span class="truncate">
          {{ selectedOption.label }}
        </span>
      </template>
      <span v-else>
        {{ item.placeholder }}
      </span>
    </template>
    <template #option="{ option }">
      <span
        v-if="option.dot"
        class="w-2 h-2 rounded-full"
        :class="option.dot"
        aria-hidden="true"
      />
      <span class="truncate">{{ option.label }}</span>
    </template>
  </USelectMenu>
</template>

<script setup>
  const { item } = defineProps({
    item: Object,
  })

  const selected = defineModel()

  const options = computed(() => {
    let array = item.options
    if ('value' in array) {
      array = array.value
    }
    return array
  })

  const selectedOption = computed(() => {
    return options.value.find((i) => i.value == selected.value)
  })

  onMounted(() => {
    // to set initial value
    selected.value = selectedOption.value?.value
  })
</script>
