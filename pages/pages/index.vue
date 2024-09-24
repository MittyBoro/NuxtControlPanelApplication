<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => navigateTo('/pages/create')"
    class="max-w-4xl"
  >
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #name-data="{ row }">
        <NuxtLink :to="`/pages/${row.id}`" class="link whitespace-normal">
          {{ row.name }}
        </NuxtLink>
      </template>
      <!--  -->
      <template #is_index-data="{ row }">
        <UToggle
          color="blue"
          v-model="row.is_index"
          @update:modelValue="() => useApiFormSubmit('pages', row)"
        />
      </template>

      <!--  -->
      <template #is_premium-data="{ row }">
        <UToggle
          v-model="row.is_premium"
          @update:modelValue="() => useApiFormSubmit('pages', row)"
        />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions :row="row" externalPath="/" />
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
      key: 'name',
      label: 'Название',
      sortable: true,
      class: 'w-full',
    },
    {
      key: 'slug',
      label: 'Слаг',
      sortable: true,
    },
    {
      key: 'is_index',
      label: 'Индексировать',
      sortable: true,
    },
    {
      key: 'is_premium',
      label: 'Премиум',
      sortable: true,
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending } = await useApiList('pages')

  const sort = useTableSort()
  const filter = await useTableFilter()

  const generateSitemap = async () => {
    const { form } = await useApiForm('sitemap/generate')
    form.submit()
  }
</script>

<style lang="scss" scoped></style>
