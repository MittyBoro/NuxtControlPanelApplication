<template>
  <TableWrapper :filter="filter" :meta="meta" class="max-w-4xl">
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #id-data="{ row }">
        <UAvatar
          :src="row.user.avatar?.[0]?.src"
          :alt="row.user.name"
          size="md"
        />
      </template>

      <!--  -->
      <template #comment-data="{ row }">
        <CommentItem :item="row" />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions :row="row" :edit="editRowMethod(row)" size="xs">
          <template #after>
            <UTooltip text="Удалить все комментарии пользователя">
              <UButton
                color="gray"
                icon="i-material-symbols-delete-sweep-outline-rounded"
                @click="removeAll(row)"
                class="text-red-500"
              />
            </UTooltip>
          </template>
        </TableActions>
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
      key: 'comment',
      label: 'Комментарии',
      class: 'w-full',
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('comments')

  const sort = useTableSort()
  const filter = await useTableFilter([
    {
      type: 'refresh',
      action: refresh,
    },
  ])

  const editRowMethod = (row) => {
    if (row.is_deleted) {
      return null
    } else {
      return () => (row.isEdit = !row.isEdit)
    }
  }

  const removeAll = async (item) => {
    if (!confirm('Удалить все комментарии пользователя?')) return
    await $api(`/comments/0?user_id=${item.user.id}`, {
      method: 'DELETE',
      lazy: true,
      onResponse: ({ response }) => {
        if (response.ok) {
          notify.success('Удалено')
          refreshNuxtData('comments')
        }
      },
      onResponseError: () => {
        notify.alert('Не удалось удалить')
      },
    })
  }
</script>
