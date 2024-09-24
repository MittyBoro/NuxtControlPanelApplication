<template>
  <UChart :data="chartData" :minDate="minDate" :length="length" />
</template>

<script setup>
  const { data, pending } = await useApi('/payments/charts', { lazy: true })

  const chartData = computed(() => ({
    datasets: [
      {
        label: 'Платежи, ≈ ₽',
        backgroundColor: '#FFCF00',
        borderColor: '#FFCF0055',
        cubicInterpolationMode: 'monotone',
        data: data.value?.all?.map((item) => ({
          x: item.date,
          y: item.aggregate,
        })),
      },
    ],
    labels: data.value?.all?.map((item) => item.date),
  }))

  const minDate = computed(() => data.value?.all?.[0]?.date)
  const length = computed(() => data.value?.all?.length)
</script>

<style lang="scss" scoped></style>
