<template>
  <UTooltip v-if="date" :text="date">
    <div class="whitespace-normal text-xs">
      <p>{{ formatDate(date) }}</p>
      <p>{{ humanizeDate(date) }}</p>
    </div>
  </UTooltip>
</template>

<script setup>
  const { date } = defineProps({
    date: {
      type: String,
    },
  })
</script>
