<template>
  <div class="flex items-center gap-2 relative truncate">
    <UIcon :name="item.icon" class="w-4 h-4 shrink-0" />
    <span class="truncate">{{ item.label }}</span>
  </div>
</template>

<script setup>
  const { item } = defineProps({
    item: {
      type: Object,
    },
  })
</script>
