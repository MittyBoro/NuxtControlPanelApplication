<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => openModal('tariffs', {}, refresh)"
    class="max-w-4xl"
  >
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #title-data="{ row }">
        <NuxtLink
          @click="openModal('tariffs', row, refresh)"
          class="link whitespace-normal"
        >
          {{ row.title }}
        </NuxtLink>
      </template>
      <!--  -->
      <template #amount-data="{ row }">
        {{ row.amount }} {{ row.currency }}
      </template>
      <!--  -->
      <template #regions-data="{ row }">
        {{ row.regions?.join(', ') }}
      </template>

      <!--  -->
      <template #is_active-data="{ row }">
        <UToggle
          v-model="row.is_active"
          @update:modelValue="() => useApiFormSubmit('tariffs', row)"
        />
      </template>

      <!--  -->
      <template #payments_count-data="{ row }">
        <UButton
          icon="i-solar-wallet-money-line-duotone"
          color="gray"
          size="xs"
          :to="`/payments?tariff_id=${row.id}`"
          :label="String(row.payments_count)"
        />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions
          :row="row"
          :edit="() => openModal('tariffs', row, refresh)"
          :externalPath="null"
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
      key: 'title',
      label: 'Название',
      class: 'w-full',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Цена',
      sortable: true,
    },
    {
      key: 'currency',
      label: 'Валюта',
      sortable: true,
    },
    {
      key: 'period',
      label: 'Дней',
      sortable: true,
    },
    {
      key: 'is_active',
      label: 'Активен',
    },
    {
      key: 'payments_count',
      label: 'Покупок',
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('tariffs')

  const sort = useTableSort()
  const filter = await useTableFilter()
</script>

<style lang="scss" scoped></style>
