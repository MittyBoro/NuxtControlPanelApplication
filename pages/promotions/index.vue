<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => openModal('promotions', {}, refresh)"
    class="max-w-4xl"
  >
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #from-data="{ row }">
        <TableDate :date="row.from" />
      </template>

      <!--  -->
      <template #to-data="{ row }">
        <TableDate :date="row.to" />
      </template>

      <!--  -->
      <template #text-data="{ row }">
        <div class="text-xs whitespace-normal" v-html="row.text"></div>
      </template>

      <!--  -->
      <template #is_active-data="{ row }">
        <UToggle
          v-model="row.is_active"
          @update:modelValue="() => useApiFormSubmit('promotions', row)"
        />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions
          :row="row"
          :edit="() => openModal('promotions', row, refresh)"
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
      key: 'from',
      label: 'С какого',
      sortable: true,
      class: 'w-1/4',
    },
    {
      key: 'to',
      label: 'По какое',
      sortable: true,
      class: 'w-1/4',
    },
    {
      key: 'text',
      label: 'Текст',
      class: 'w-full min-w-20',
    },
    {
      key: 'is_active',
      label: 'Активно',
      sortable: true,
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('promotions')

  const sort = useTableSort()
  const filter = await useTableFilter()
</script>

<style lang="scss" scoped></style>
