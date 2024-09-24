<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => navigateTo('/actors/create')"
    class="max-w-5xl"
  >
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #thumbnail-data="{ row }">
        <TableThumbnails :src="row.photo" />
      </template>

      <!--  -->
      <template #name-data="{ row }">
        <NuxtLink :to="`/actors/${row.id}`" class="link whitespace-normal">
          {{ row.name }}
        </NuxtLink>
      </template>

      <!--  -->
      <template #views-data="{ row }">
        <p>Профиля: {{ formatNumberViews(row.views) }}</p>
        <p>Видео: {{ formatNumberViews(row.video_views) }}</p>
      </template>

      <!--  -->
      <template #is_published-data="{ row }">
        <UToggle
          v-model="row.is_published"
          color="green"
          @update:modelValue="() => useApiFormSubmit('actors', row)"
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
      key: 'name',
      label: 'Имя',
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
      key: 'rating',
      label: 'Рейтинг',
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

  const { list, meta, pending } = await useApiList('actors')

  const sort = useTableSort()
  const filter = await useTableFilter()
</script>

<style lang="scss" scoped></style>
