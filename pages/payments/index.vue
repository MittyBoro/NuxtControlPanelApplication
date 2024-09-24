<template>
  <TableWrapper :filter="filter" :meta="meta">
    <template #header>
      <ChartPayment />
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
          :to="`/payments?user_id=${row.user.id}`"
          :user="row.user"
          class="max-w-48"
        />
      </template>

      <!--  -->
      <template #period-data="{ row }">
        <span class="font-bold">
          {{ row.period }}
          {{ declineWord(row.period, ['день', 'дня', 'дней']) }}
        </span>
      </template>

      <!--  -->
      <template #amount-data="{ row }">
        <span class="font-bold">{{ row.amount }} {{ row.currency }}</span>
      </template>

      <!--  -->
      <template #status-data="{ row }">
        <PaymentStatus
          v-model="row.status"
          @update:modelValue="() => useApiFormSubmit('payments', row)"
        />
      </template>

      <!--  -->
      <template #description-data="{ row }">
        <div class="whitespace-normal text-xs">
          <div class="font-semibold">{{ row.description }}</div>
          <div v-if="row.payment_data">
            <div class="grid grid-cols-[auto_1fr]">
              <template
                v-for="[key, value] of Object.entries(row.payment_data)"
                :key="key"
              >
                <template>
                  <span>{{ key }}:</span>
                  <span>{{ value }}</span>
                </template>
              </template>
              <template v-if="row.tariff">
                <span>Тариф:</span>
                <span>{{ row.tariff.name }}</span>
              </template>
              <template v-if="row.coupon">
                <span>Купон:</span>
                <span>{{ row.coupon.code }}</span>
              </template>
            </div>
          </div>
        </div>
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
      key: 'period',
      label: 'Дней премиума',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Сумма',
      sortable: true,
    },
    {
      key: 'payment_method',
      label: 'Метод',
    },

    {
      key: 'status',
      label: 'Статус',
      sortable: true,
    },
    {
      key: 'description',
      label: 'Описание',
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

  const { list, meta, pending, refresh } = await useApiList('payments')

  const sort = useTableSort()
  const filter = await useTableFilter([
    {
      type: 'refresh',
      action: refresh,
    },
  ])
</script>
