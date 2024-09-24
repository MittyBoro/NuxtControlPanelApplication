<template>
  <LayoutModal v-model="isOpen">
    <template #title>Статистика</template>
    <template #default>
      <LazyChartLink class="mb-4" :id="item.id" />
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const { item } = useCustomModal('link-stats').data
</script>
