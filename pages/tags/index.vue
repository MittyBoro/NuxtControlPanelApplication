<template>
  <TableWrapper
    :filter="filter"
    :meta="meta"
    :create="() => openModal('tags', {}, refresh)"
    class="max-w-4xl"
  >
    <template #header>
      Экспериментальный раздел с выводом случайных видео по указанным тегам
    </template>
    <template #buttons>
      <UButton
        size="sm"
        label="Добавить список"
        @click="openModal('tags_list', {}, refresh)"
        color="gray"
        block
      />
    </template>
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
      <template #title-data="{ row }">
        <NuxtLink
          @click="openModal('tags', row, refresh)"
          class="link whitespace-normal"
        >
          {{ row.title }}
        </NuxtLink>
      </template>

      <!--  -->
      <template #is_pinned-data="{ row }">
        <UToggle
          v-model="row.is_pinned"
          @update:modelValue="() => useApiFormSubmit('tags', row)"
        />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions
          :row="row"
          :edit="() => openModal('tags', row, refresh)"
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
      sortable: true,
      class: 'w-1/2',
    },
    {
      key: 'slug',
      label: 'Слаг',
      sortable: true,
      class: 'w-1/3',
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('tags')

  const sort = useTableSort()
  const filter = await useTableFilter()
</script>

<style lang="scss" scoped></style>
