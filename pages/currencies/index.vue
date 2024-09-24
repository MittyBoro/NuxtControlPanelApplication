<template>
  <section>
    <UAlert
      title="Справка"
      icon="i-material-symbols-info-outline-rounded"
      class="max-w-4xl mb-4"
    >
      <template #description>
        <p>Кол-во койнов за рубли лучше не менять</p>
        <p>
          Кол-во койнов за другую валюту = кол-во койнов за рубли * курс валюты
          к рублю
        </p>
      </template>
    </UAlert>

    <TableWrapper class="max-w-4xl">
      <UTable :columns="columns" :rows="list" :loading="pending">
        <!--  -->
        <template #key-data="{ row }">
          <UInput
            v-model="row.key"
            @change="() => useApiFormSubmit('currencies', row)"
          />
        </template>

        <!--  -->
        <template #name-data="{ row }">
          <UInput
            v-model="row.name"
            @change="() => useApiFormSubmit('currencies', row)"
          />
        </template>

        <!--  -->
        <template #symbol-data="{ row }">
          <UInput
            v-model="row.symbol"
            @change="() => useApiFormSubmit('currencies', row)"
          />
        </template>

        <!--  -->
        <template #coins-data="{ row }">
          <UInput
            v-model="row.coins"
            @change="() => useApiFormSubmit('currencies', row)"
          />
        </template>

        <!--  -->
        <template #users_count-data="{ row }">
          <UButton
            icon="i-ph-users-three-bold"
            color="gray"
            size="xs"
            :to="`/users?currency=${row.key}`"
          >
            {{ row.users_count }}
          </UButton>
        </template>

        <!--  -->
        <template #actions-data="{ row }">
          <TableActions :row="row" :edit="null" />
        </template>
      </UTable>

      <div class="transition-opacity opacity-30 hover:opacity-100">
        <UButton
          color="white"
          icon="i-mdi-plus"
          label="Добавить"
          @click="create"
          block
        />
      </div>
    </TableWrapper>
  </section>
</template>

<script setup>
  const columns = [
    {
      key: 'id',
    },
    {
      key: 'key',
      label: 'Ключ',
    },
    {
      key: 'name',
      label: 'Название',
    },
    {
      key: 'symbol',
      label: 'Символ',
    },
    {
      key: 'coins',
      label: 'Койны за единицу валюты',
    },
    {
      key: 'users_count',
      label: 'Пользователей',
    },
    {
      key: 'actions',
    },
  ]

  const { list, refresh, pending } = await useApiList('currencies')

  const create = async () => {
    await $api('/currencies', {
      method: 'POST',
      body: {
        key: randomString(3),
        name: 'Новая валюта',
        symbol: 'NEW',
        coins: 100,
      },
    })
    await refresh()
  }
</script>

<style lang="scss" scoped></style>
