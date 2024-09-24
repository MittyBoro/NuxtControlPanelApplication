<template>
  <UChart :data="chartData" :minDate="minDate" :length="length" />
</template>

<script setup>
  const props = defineProps({
    id: [Number, String],
  })
  const { data, pending } = await useApi(`/videos/charts/${props.id || ''}`, {
    lazy: true,
  })

  const chartData = computed(() => ({
    datasets: [
      {
        label: 'Просмотры',
        backgroundColor: '#FFCF00',
        borderColor: '#FFCF0055',
        cubicInterpolationMode: 'monotone',
        data: data.value?.all?.map((item) => ({
          x: item.date,
          y: item.aggregate,
        })),
      },
      {
        label: 'Лайки',
        backgroundColor: '#38CB6E',
        borderColor: '#38CB6E55',
        cubicInterpolationMode: 'monotone',
        data: data.value?.all?.map((item) => ({ x: item.date, y: item.likes })),
      },
      {
        label: 'Дизлайки',
        backgroundColor: '#EF4444',
        borderColor: '#EF444455',
        cubicInterpolationMode: 'monotone',
        data: data.value?.all?.map((item) => ({
          x: item.date,
          y: item.dislikes,
        })),
      },
    ],
    labels: data.value?.all?.map((item) => item.date),
  }))

  const minDate = computed(() => data.value?.all?.[0]?.date)
  const length = computed(() => data.value?.all?.length)
</script>

<style lang="scss" scoped></style>
