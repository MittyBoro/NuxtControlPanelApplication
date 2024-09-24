<template>
  <TableWrapper :filter="filter" :meta="meta">
    <template #header>
      <ChartUser v-if="!route.query.user_id" />
      <div v-else class="-mb-2">Пользователи, приглашенные:</div>
    </template>
    <UTable
      v-model:sort="sort"
      :columns="selectedColumns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #id-data="{ row }">
        <div class="flex items-center gap-4">
          <span>{{ row.id }}</span>
        </div>
      </template>

      <template #ava-data="{ row }">
        <UAvatar
          v-if="!pending"
          :src="row.avatar?.[0]?.src"
          :alt="row.name"
          size="md"
          :class="{
            'ring ring-red-500/50': row.ban_expiry_at || !row.email_verified_at,
            'ring ring-primary-500/50': row.has_premium,
          }"
          :chip-color="isOnline(row) ? 'green' : undefined"
        />
      </template>

      <!--  -->
      <template #name-data="{ row }">
        <div class="whitespace-normal">
          <div
            class="max-w-[150px] truncate link-opacity"
            @click="copyWithNotify(row.username)"
          >
            {{ row.name }}
          </div>
          <div class="text-xs text-gray-500">
            <div
              class="max-w-[150px] truncate link-opacity"
              title="Username"
              @click="copyWithNotify(row.username)"
            >
              {{ row.username }}
            </div>

            <div
              class="max-w-[150px] truncate link-opacity"
              @click="copyWithNotify(row.email)"
            >
              {{ row.email }}
            </div>

            <div v-if="row.telegram_id" class="text-blue-500">
              TG: {{ row.telegram_id }}
            </div>
          </div>
          <p v-if="row.ban_expiry_at" class="flex text-xs text-red-500">
            Бан до 
            <TableDate :date="row.ban_expiry_at" />
          </p>
          <UserVerifyEmail :user="row">
            <div class="text-xs text-red-500 link">Не верифицирован!</div>
          </UserVerifyEmail>
        </div>
      </template>

      <!--  -->
      <template #total_paid-data="{ row }">
        <UButton
          icon="i-solar-wallet-money-bold"
          color="gray"
          size="xs"
          to="/users"
        >
          <span v-if="row.total_paid">≈{{ coinsToRub(row.total_paid) }}₽</span>
          <span v-else>0</span>
        </UButton>
      </template>

      <!--  -->
      <template #comments_count-data="{ row }">
        <UButton
          icon="i-icon-park-solid-comments"
          color="gray"
          size="xs"
          :to="`/comments?user_id=${row.id}`"
          :label="formatNumber(row.comments_count)"
        />
      </template>

      <!--  -->
      <template #premium_expiry_at-data="{ row }">
        <TableDate
          :date="row.premium_expiry_at"
          class="text-primary-600 dark:text-primary-400"
        />
      </template>

      <!--  -->
      <template #last_activity_at-data="{ row }">
        <TableDate :date="row.last_activity_at" />
      </template>

      <!--  -->
      <template #created_at-data="{ row }">
        <TableDate :date="row.created_at" />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions :row="row">
          <!--  -->
          <template #before>
            <UButton
              icon="i-material-symbols-frame-person"
              color="gray"
              :to="`/users/show/${row.id}`"
            />
          </template>
        </TableActions>
      </template>
    </UTable>
  </TableWrapper>
</template>

<script setup>
  const route = useRoute()
  const columns = [
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'ava',
    },
    {
      key: 'name',
      label: 'Имя',
      sortable: true,
    },
    {
      key: 'total_paid',
      label: 'Платежи',
      sortable: true,
    },
    {
      key: 'comments_count',
      label: 'Комментарии',
      sortable: true,
    },
    {
      key: 'premium_expiry_at',
      label: 'Премиум',
      sortable: true,
    },
    {
      key: 'last_activity_at',
      label: 'Online',
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Рег‑ция',
      sortable: true,
    },
    {
      key: 'actions',
    },
  ]

  const selectedColumns = computed(() => {
    let cols = columns
    if (!route.query.premium) {
      cols = cols.filter((col) => col.key !== 'premium_expiry_at')
    }
    // if (!route.query.last_activity_at) {
    //   cols = cols.filter((col) => col.key !== 'last_activity_at')
    // }
    if (!route.query.has_payments) {
      cols = cols.filter((col) => col.key !== 'total_paid')
    }
    if (!route.query.has_comments) {
      cols = cols.filter((col) => col.key !== 'comments_count')
    }
    return cols
  })

  const { list, meta, pending, refresh } = await useApiList('users')

  const sort = useTableSort()
  const filter = await useTableFilter([
    {
      type: 'refresh',
      action: refresh,
    },
  ])

  watchEffect(() => {
    if (route.query.referrer_id) {
      route.query.user_id = route.query.referrer_id
    }
  })
</script>

<style lang="scss" scoped></style>
