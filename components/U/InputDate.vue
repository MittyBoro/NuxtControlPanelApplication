<template>
  <UInput v-model="value" :type="type" />
</template>

<script setup>
  const datetime = defineModel({
    type: String,
  })

  const { type } = defineProps({
    type: {
      type: String,
      default: 'date',
    },
  })

  const formatModelDate = (date) => {
    if (type === 'date') {
      return formatInputDate(date)
    }
    if (type === 'datetime-local') {
      return formatInputDateTime(date)
    }
    return date
  }

  const value = computed({
    get: () => (datetime.value ? formatModelDate(datetime.value) : null),
    set: (value) => {
      if (value) {
        datetime.value = new Date(value).toISOString()
      } else {
        datetime.value = null
      }
    },
  })
</script>
