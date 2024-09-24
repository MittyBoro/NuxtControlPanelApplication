<template>
  <TableWrapper :filter="filter" :meta="meta" class="max-w-4xl">
    <UTable
      v-model:sort="sort"
      :columns="columns"
      :rows="list"
      :loading="pending"
    >
      <!--  -->
      <template #creator-data="{ row }">
        <UserCardMini
          :to="`/chats?user_id=${row.creator.id}`"
          :user="row.creator"
          class="max-w-44"
        />
      </template>

      <!--  -->
      <template #subject-data="{ row }">
        <NuxtLink
          :to="`/chats/${row.id}`"
          class="link-opacity whitespace-normal"
        >
          {{ row.subject }}
        </NuxtLink>
      </template>

      <!--  -->
      <template #messages_count-data="{ row }">
        <UChip
          size="xl"
          color="red"
          :text="
            row.unread_messages_count ? `+${row.unread_messages_count}` : 'new'
          "
          :show="row.unread_messages_count > 0 || row.participants_count < 2"
          class="w-full"
        >
          <UButton color="gray" size="xs" :to="`/chats/${row.id}`" block>
            {{ row.messages_count }}
          </UButton>
        </UChip>
      </template>

      <!--  -->
      <template #last_message_at-data="{ row }">
        <TableDate :date="row.last_message_at" />
      </template>

      <!--  -->
      <template #actions-data="{ row }">
        <TableActions :row="row" :edit="null" :remove="removeRow">
          <template #before>
            <UButton color="gray" label="Открыть" :to="`/chats/${row.id}`" />
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
      key: 'creator',
      label: 'Пользователь',
    },
    {
      key: 'subject',
      label: 'Тема',
      class: 'w-full',
    },
    {
      key: 'messages_count',
      label: 'Сообщения',
      class: 'w-full',
    },
    {
      key: 'last_message_at',
      label: 'Последнее',
      sortable: true,
    },
    {
      key: 'actions',
    },
  ]

  const { list, meta, pending, refresh } = await useApiList('../chats/chats')

  const sort = useTableSort()
  const filter = await useTableFilter([
    {
      type: 'refresh',
      action: refresh,
    },
  ])

  const removeRow = async (row) => {
    if (!confirm('Вы уверены?')) {
      return
    }
    row.class =
      'bg-red-500/20 dark:bg-red-400/20 animate-pulse pointer-events-none'

    await $api(`/../chats/chats/${row.id}`, {
      method: 'DELETE',
      onResponse: ({ response }) => {
        if (response.ok) {
          row.class = 'hidden'
          notify.success('Удалено')
        }
      },
      onResponseError: () => {
        notify.alert('Не удалось удалить')
      },
    })
  }
</script>
