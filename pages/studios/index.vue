<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => openModal('studios', {}, refresh)"
    class="max-w-4xl"
  >
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #thumbnail-data="{ row }">
        <TableThumbnails :src="row.preview" />
      </template>

      <!--  -->
      <template #title-data="{ row }">
        <NuxtLink
          @click="openModal('studios', row, refresh)"
          class="link whitespace-normal"
        >
          {{ row.title }}
        </NuxtLink>
      </template>

      <!--  -->
      <template #video_count-data="{ row }">
        <UButton
          icon="i-material-symbols-playlist-play-rounded"
          color="gray"
          size="xs"
          :to="`/videos?q=${row.title}`"
          v-model="row.is_pinned"
        >
          {{ row.video_count }}
        </UButton>
      </template>

      <!--  -->
      <template #is_published-data="{ row }">
        <UToggle
          v-model="row.is_published"
          color="green"
          @update:modelValue="() => useApiFormSubmit('studios', row)"
        />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions
          :row="row"
          :edit="() => openModal('studios', row, refresh)"
        />
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
      key: 'video_count',
      label: 'Видео',
      sortable: true,
    },
    {
      key: 'is_published',
      label: 'Публ',
      sortable: true,
    },
    {
      key: 'views',
      label: 'Просмотры',
      sortable: true,
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('studios')

  const sort = useTableSort()
  const filter = await useTableFilter()
</script>

<style lang="scss" scoped></style>
