<template>
  <UChart :data="chartData" :minDate="minDate" :length="length" />
</template>

<script setup>
  const { data, pending } = await useApi('/users/charts', { lazy: true })

  const chartData = computed(() => ({
    datasets: [
      {
        label: 'Новые пользователи',
        backgroundColor: '#FFCF00',
        borderColor: '#FFCF0055',
        cubicInterpolationMode: 'monotone',
        data: data.value?.all?.map((item) => ({
          x: item.date,
          y: item.aggregate,
        })),
      },
      {
        label: 'Подключили Telegram',
        backgroundColor: '#178EC9',
        borderColor: '#178EC955',
        cubicInterpolationMode: 'monotone',
        data: data.value?.telegram?.map((item) => ({
          x: item.date,
          y: item.aggregate,
        })),
      },
      {
        label: 'Верифицировли почту',
        backgroundColor: '#999',
        borderColor: '#9995',
        cubicInterpolationMode: 'monotone',
        data: data.value?.verified?.map((item) => ({
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
