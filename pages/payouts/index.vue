<template>
  <TableWrapper :filter="filter" :meta="meta" class="max-w-5xl">
    <template #buttons>
      <UButton
        color="gray"
        size="sm"
        icon="i-material-symbols-settings-rounded"
        to="/props?tab=2"
        label="Настройки выплат"
      />
    </template>
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #user_id-data="{ row }">
        <UserCardMini
          :to="`/payouts?user_id=${row.user.id}`"
          :user="row.user"
          class="max-w-48"
        />
      </template>

      <!--  -->
      <template #amount-data="{ row }">
        <p class="font-bold">{{ formatNumber(row.amount) }} койнов</p>
        <p class="font-bold">
          {{ formatNumber(row.currencies_amount) }} {{ row.currency }}
        </p>
      </template>

      <!--  -->
      <template #status-data="{ row }">
        <PaymentStatus
          v-model="row.status"
          @update:modelValue="() => useApiFormSubmit('payouts', row)"
        />
      </template>

      <!--  -->
      <template #chat_id-data="{ row }">
        <UButton
          icon="i-gravity-ui-envelope-open"
          color="gray"
          size="xs"
          :to="`/chats/${row.chat_id}`"
          label="Открыть чат"
        />
      </template>

      <!--  -->
      <template #created_at-data="{ row }">
        <TableDate :date="row.created_at" />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions :row="row" :edit="null" :externalPath="null" />
      </template>
    </UTable>
  </TableWrapper>
</template>

<script setup>
  const columnsRaw = [
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'user_id',
      label: 'Пользователь',
    },
    {
      key: 'amount',
      label: 'Сумма',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Статус',
      sortable: true,
    },
    {
      key: 'chat_id',
      label: 'Чат',
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
  const route = useRoute()
  const columns = computed(() => {
    return columnsRaw.filter(
      (item) => !route.query.user_id || item.key !== 'user_id',
    )
  })

  const { list, meta, pending, refresh } = await useApiList('payouts')

  const sort = useTableSort()
  const filter = await useTableFilter([
    {
      type: 'refresh',
      action: refresh,
    },
  ])
</script>
