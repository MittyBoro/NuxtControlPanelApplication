<template>
  <TableWrapper :filter="filter" :meta="meta" class="max-w-4xl">
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #user_id-data="{ row }">
        <UserCardMini
          :to="`/favorites?user_id=${row.user.id}`"
          :user="row.user"
        />
      </template>

      <!--  -->
      <template #favoritable_type-data="{ row }">
        <NuxtLink
          :to="`/${row.favoritable_type}s`"
          target="_blank"
          class="font-bold link-opacity"
        >
          <UIcon :name="favoritableIcon(row.favoritable_type)" />
          {{ favoritableName(row.favoritable_type) }}
        </NuxtLink>
      </template>

      <!--  -->
      <template #favoritable_id-data="{ row }">
        <NuxtLink
          :to="`/${row.favoritable_type}s/${row.favoritable.id}`"
          target="_blank"
          class="font-bold whitespace-normal link-opacity"
        >
          {{ row.favoritable.title || row.favoritable.name }}
        </NuxtLink>
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
      key: 'favoritable_type',
      label: 'Тип',
      sortable: true,
    },
    {
      key: 'favoritable_id',
      label: 'Элемент',
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Дата',
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

  const favoritableIcon = (type) => {
    switch (type) {
      case 'video':
        return 'i-material-symbols-smart-display-rounded'
      case 'album':
        return 'i-mingcute-photo-album-fill'
      case 'actor':
        return 'i-mdi-face-woman-shimmer'
      default:
        return ''
    }
  }

  const favoritableName = (type) => {
    switch (type) {
      case 'video':
        return 'Видео'
      case 'album':
        return 'Альбом'
      case 'actor':
        return 'Актёр'
      default:
        return ''
    }
  }

  const { list, meta, pending, refresh } = await useApiList('favorites')

  const sort = useTableSort()
  const filter = await useTableFilter()
</script>
