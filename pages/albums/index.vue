<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => navigateTo('/albums/create')"
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
        <NuxtLink :to="`/albums/${row.id}`" class="link whitespace-normal">
          {{ row.title }}
        </NuxtLink>
      </template>

      <!--  -->
      <template #is_premium-data="{ row }">
        <UToggle
          v-model="row.is_premium"
          @update:modelValue="() => useApiFormSubmit('albums', row)"
        />
      </template>

      <!--  -->
      <template #is_published-data="{ row }">
        <UToggle
          v-model="row.is_published"
          color="green"
          @update:modelValue="() => useApiFormSubmit('albums', row)"
        />
      </template>

      <!--  -->
      <template #published_at-data="{ row }">
        <TableDate :date="row.published_at" />
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
      key: 'views',
      label: 'Просмотры',
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

  const { list, meta, pending, refresh } = await useApiList('albums')

  const sort = useTableSort()
  const filter = await useTableFilter([
    {
      type: 'refresh',
      action: refresh,
    },
  ])
</script>

<style lang="scss" scoped></style>
