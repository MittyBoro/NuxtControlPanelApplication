<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => openModal('kits', { item: {}, meta }, refresh)"
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
      <template #name-data="{ row }">
        <NuxtLink :to="`/kits/${row.id}`" class="link whitespace-normal">
          {{ row.name }}
        </NuxtLink>
      </template>

      <!--  -->
      <template #type-data="{ row }">
        {{ translateKey(row.type) }}
      </template>
      <!--  -->
      <template #sorting_rest-data="{ row }">
        {{ translateKey(row.sorting_rest) }}
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions
          :row="row"
          :edit="() => openModal('kits', { item: row, meta }, refresh)"
        >
          <template #before>
            <UButton
              color="gray"
              :to="`/kits/${row.id}`"
              icon="material-symbols:playlist-play"
            />
          </template>
        </TableActions>
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
      key: 'key',
      label: 'Ключ',
      sortable: true,
    },
    {
      key: 'type',
      label: 'Тип',
    },
    {
      key: 'name',
      label: 'Название',
      sortable: true,
      class: 'w-full',
    },
    {
      key: 'kitables_count',
      label: 'Элементы',
    },
    {
      key: 'sorting_rest',
      label: 'Остальные',
      sortable: true,
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('kits')

  const sort = useTableSort()
  const filter = await useTableFilter()
</script>

<style lang="scss" scoped></style>
