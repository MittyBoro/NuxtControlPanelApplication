<template>
  <UAvatarGroup size="md" class="flex -my-1" :max="3">
    <UAvatar
      v-if="thumbnails.length && !pending"
      v-for="thumbnail in thumbnails"
      :src="thumbnail?.src"
      class="border border-gray-500 border-opacity-30 -mx-1"
      :ui="{ rounded: 'rounded-lg object-cover' }"
      v-bind="chip"
    />
    <UAvatar
      v-else
      icon="i-ic-baseline-photo"
      class="border border-gray-500 border-opacity-30 -mx-1"
      :ui="{ rounded: 'rounded-lg' }"
      v-bind="chip"
    />
  </UAvatarGroup>
</template>

<script setup>
  const props = defineProps({
    src: [Array, String],
    pending: Boolean,
    chip: String,
  })

  const thumbnails = computed(() =>
    props.src ? (Array.isArray(props.src) ? props.src : [props.src]) : [],
  )

  const chip = computed(() => {
    if (!props.chip) {
      return {}
    } else {
      return {
        chipColor: 'primary',
        chipText: props.chip,
        chipColor: 'blue',
      }
    }
  })
</script>
