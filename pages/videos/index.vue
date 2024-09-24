<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => navigateTo('/videos/create')"
  >
    <template #header>
      <ChartVideo class="mb-4" />
      <VideoStat :stats="stats" :class="{ 'animate-pulse': statPending }" />
    </template>
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #thumbnail-data="{ row }">
        <TableThumbnails :pending="pending" :src="row.preview" />
      </template>

      <!--  -->
      <template #title-data="{ row }">
        <NuxtLink :to="`/videos/${row.id}`" class="link whitespace-normal">
          {{ row.title }}
          <UBadge
            v-if="row.is_ru_voice"
            color="blue"
            variant="subtle"
            size="xs"
          >
            RU
          </UBadge>
        </NuxtLink>
      </template>

      <!--  -->
      <template #is_premium-data="{ row }">
        <UToggle
          v-model="row.is_premium"
          @update:modelValue="() => useApiFormSubmit('videos', row)"
        />
      </template>

      <!--  -->
      <template #is_published-data="{ row }">
        <UToggle
          v-model="row.is_published"
          color="green"
          @update:modelValue="() => useApiFormSubmit('videos', row)"
        />
      </template>

      <!--  -->
      <template #views-data="{ row }">
        <UButton
          color="gray"
          size="xs"
          variant="soft"
          :to="`/videos/${row.id}?tab=3`"
          class="link whitespace-normal"
        >
          {{ formatNumber(row.views) }}
          <span v-if="row.stat_views">
            ({{ formatNumber(row.stat_views) }})
          </span>
        </UButton>
      </template>

      <!--  -->
      <template #published_at-data="{ row }">
        <TableDate :date="row.published_at" />
      </template>

      <!--  -->
      <template #tasks-data="{ row }">
        <VideoTaskStateBadge
          v-if="row.tasks"
          :tasks="row.tasks"
          :to="`/videos/${row.id}?tab=1`"
        />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions :row="row" />
      </template>
    </UTable>
  </TableWrapper>
</template>

<script setup>
  const columns = [
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'thumbnail',
    },
    {
      key: 'title',
      label: 'Название',
      sortable: true,
      class: 'w-full',
    },
    {
      key: 'is_premium',
      label: 'Прем',
      sortable: true,
    },
    {
      key: 'is_published',
      label: 'Публ',
      sortable: true,
    },
    {
      key: 'tasks',
      label: 'Рендер',
    },
    {
      key: 'views',
      label: 'Просм.',
      sortable: true,
    },
    {
      key: 'published_at',
      label: 'Опубликовано',
      sortable: true,
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('videos')

  const {
    data: stats,
    pending: statPending,
    refresh: statRefresh,
  } = await useApi('videos/tasks_stat', { lazy: true })

  const refreshAll = () => {
    refresh()
    statRefresh()
  }

  const sort = useTableSort()
  const filter = await useTableFilter([
    {
      type: 'refresh',
      action: refreshAll,
    },
  ])

  window.Echo.private(`videos`).listen('.task_process_updated', () => {
    refreshAll()
  })
</script>

<style lang="scss" scoped></style>
