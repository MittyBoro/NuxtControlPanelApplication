<template>
  <TableWrapper
    :filter="filter"
    :create="
      () => openModal('links', { item: {}, meta: { collections } }, refresh)
    "
    class="max-w-5xl"
  >
    <template #header>
      <ChartLink class="mb-4" />

      <UAlert
        title="Ссылки для соц.сетей, рекламы и т.д."
        icon="i-material-symbols-info-outline-rounded"
        class="max-w-4xl mb-4"
      />
    </template>
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #name-data="{ row }">
        <NuxtLink
          @click="openModal('links', { item: row, meta }, refresh)"
          class="whitespace-normal link block"
        >
          {{ row.name }}
        </NuxtLink>
        <UTooltip :text="row.url">
          <NuxtLink
            :to="row.url"
            target="_blank"
            v-if="row.url"
            class="max-w-[200px] truncate text-xs opacity-50 link"
            @click.prevent="copyWithNotify(row.url)"
          >
            {{ row.url }}
          </NuxtLink>
        </UTooltip>
      </template>

      <!--  -->
      <template #collection-data="{ row }">
        <NuxtLink :to="`?q=${row.collection}`" class="link">
          {{ translateKey(row.collection) }}
        </NuxtLink>
        <p class="text-xs">[{{ row.collection }}]</p>
      </template>

      <!--  -->
      <template #is_active-data="{ row }">
        <UToggle
          v-model="row.is_active"
          @update:modelValue="() => useApiFormSubmit('links', row)"
        />
      </template>

      <!--  -->
      <template #views-data="{ row }">
        {{ formatNumber(row.views) }}
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions
          :row="row"
          :edit="
            () =>
              openModal('links', { item: row, meta: { collections } }, refresh)
          "
        >
          <!--  -->
          <template #before>
            <UButton
              icon="i-material-symbols-auto-graph"
              color="gray"
              @click="() => openModal('link-stats', { item: row })"
            />
          </template>
        </TableActions>
      </template>
    </UTable>
  </TableWrapper>
</template>

<script setup>
  definePageMeta({
    name: 'links',
  })

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
      key: 'collection',
      label: 'Коллекция',
      sortable: true,
      class: 'w-full',
    },
    {
      key: 'views',
      label: 'Переходы',
      sortable: true,
      class: 'w-full',
    },
    {
      key: 'is_active',
      label: 'Активна',
      sortable: true,
    },
    {
      key: 'actions',
    },
  ]

  const collections = ref([
    'main_menu',
    'bottom_menu',
    'vast',
    'video_start',
    'banner_under_video',
  ])

  const { list, meta, pending, refresh } = await useApiList('links')

  const sort = useTableSort()
  const filter = await useTableFilter([
    {
      key: 'collection',
      type: 'select',
      placeholder: 'Коллекция',
      options: computed(() => [
        {
          label: 'Все',
          value: null,
        },
        ...Array.from(
          meta.value?.collections?.map((item) => ({
            label: `${translateKey(item)} [${item}]`,
            value: item,
          })) || [],
        ),
      ]),
    },
  ])
</script>

<style lang="scss" scoped></style>
