<template>
  <UAlert
    icon="i-material-symbols-info-outline-rounded"
    title="Статистика рендера"
    :actions="actions"
  >
    <template v-if="!isHidden" #description>
      <div
        v-if="stats"
        class="mt-3 text-xs flex flex-wrap items-start gap-x-6 gap-y-2"
      >
        <div v-if="Object.values(stats.tasks).length" class="grid-item">
          <template v-for="item in Object.entries(stats.tasks)" :key="item[0]">
            <NuxtLink
              :to="taskTo(item[0])"
              :title="item[0]"
              class="font-bold link"
              :class="colorByStatus(item[0])"
            >
              {{ translateKey(item[0]) }} задач
            </NuxtLink>
            <div>{{ item[1] }}</div>
          </template>
          <template v-if="stats.times.processes" class="grid-item">
            <div class="font-bold">Осталось</div>
            <div :title="`Процессов: ${stats.times.processes}`">
              {{ countdown(stats.times.total / stats.times.processes) }}
            </div>
            <div class="col-span-full">
              до {{ countdownEnd(stats.times.total / stats.times.processes) }}
            </div>
          </template>
        </div>
        <div class="grid-item">
          <div class="font-bold">Всего видео</div>
          <div>{{ stats.videos.total }}</div>
          <div class="font-bold">Готовых видео</div>
          <div>{{ stats.videos.ready }}</div>
        </div>
      </div>
      <div v-else>...</div>
    </template>
  </UAlert>
</template>

<script setup>
  defineProps({
    stats: Object,
  })

  const isHidden = useLocalStorage('stat-hidden', false)

  const actions = computed(() => [
    {
      variant: 'solid',
      color: 'gray',
      label: isHidden.value ? 'Показать' : 'Скрыть',
      click: () => {
        isHidden.value = !isHidden.value
      },
    },
  ])

  const taskTo = (type) => {
    switch (type) {
      case 'rendering':
        return `/videos?tasks=rendering`
      default:
        return `/videos?tasks=${type}`
    }
  }

  const colorByStatus = (status) => {
    switch (status) {
      case 'queued':
        return 'text-gray-500'
      case 'rendering':
        return 'text-primary-500'
      case 'success':
        return 'text-green-500'
      case 'error':
        return 'text-red-500'
      case 'stopped':
        return 'text-gray-500'
    }
  }
</script>

<style lang="scss" scoped>
  .grid-item {
    @apply grid grid-cols-2 gap-x-4 gap-y-1;
  }
</style>
