<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    class="max-w-4xl"
    :create="() => navigateTo('/categories/create')"
  >
    <!-- :create="() => openModal('categories', {}, refresh)" -->
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
        <NuxtLink :to="`/categories/${row.id}`" class="link whitespace-normal">
          <!-- @click="openModal('categories', row, refresh)" -->
          {{ row.title }}
        </NuxtLink>
      </template>

      <!--  -->
      <template #is_pinned-data="{ row }">
        <UToggle
          v-model="row.is_pinned"
          @update:modelValue="() => useApiFormSubmit('categories', row)"
        />
      </template>

      <!--  -->
      <template #video_count-data="{ row }">
        <UButton
          icon="i-material-symbols-playlist-play-rounded"
          color="gray"
          size="xs"
          :to="`/videos?categories=${row.id}`"
        >
          {{ row.video_count }}
        </UButton>
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions :row="row" />
        <!-- :edit="() => openModal('categories', row, refresh)" -->
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
      key: 'views',
      label: 'Просмотры',
      sortable: true,
    },
    // {
    //   key: 'is_pinned',
    //   label: 'Закреп',
    //   sortable: true,
    // },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('categories')

  const sort = useTableSort()
  const filter = await useTableFilter()
</script>

<style lang="scss" scoped></style>
