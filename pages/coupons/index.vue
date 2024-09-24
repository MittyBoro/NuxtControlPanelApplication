<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => openModal('coupons', {}, refresh)"
    class="max-w-4xl"
  >
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #code-data="{ row }">
        <UTooltip text="Скопировать">
          <UButton
            :label="row.code"
            icon="i-heroicons-clipboard-document"
            color="gray"
            size="xs"
            @click="() => copyWithNotify(row.code)"
          />
        </UTooltip>
      </template>

      <!--  -->
      <template #used_count-data="{ row }">
        <UButton size="xs" color="gray" :to="`/payments?coupon_id=${row.id}`">
          {{ row.used_count }} из {{ row.count }}
        </UButton>
      </template>

      <!--  -->
      <template #is_active-data="{ row }">
        <UToggle
          v-model="row.is_active"
          @update:modelValue="() => useApiFormSubmit('coupons', row)"
        />
      </template>

      <!--  -->
      <template #created_at-data="{ row }">
        <TableDate :date="row.created_at" />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions
          :row="row"
          :edit="() => openModal('coupons', row, refresh)"
          :externalPath="null"
        />
      </template>
    </UTable>
  </TableWrapper>
</template>

<script setup>
  const columns = [
    {
      key: 'code',
      label: 'Код',
      sortable: true,
    },
    {
      key: 'used_count',
      label: 'Активаций',
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
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Создан',
      sortable: true,
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('coupons')

  const sort = useTableSort()
  const filter = await useTableFilter()
</script>

<style lang="scss" scoped></style>
