<template>
  <div :class="{ 'animate-pulse': pending }">
    <ChatSingle
      v-if="meta"
      :meta="meta"
      :list="list"
      v-model:page="messagePage"
    />
  </div>
</template>

<script setup>
  const chatId = useRoute().params.id

  const list = ref([])
  const meta = ref({})
  const messagePage = ref(1)

  const { pending } = await useApi(`../chats/chats/${chatId}`, {
    query: {
      page: messagePage,
    },
    server: false,
    watch: [() => messagePage.value],
    onResponse: ({ response: { _data } }) => {
      list.value = [...(_data.data || []), ...list.value]
      meta.value = _data.meta || {}
    },
    onResponseError: (error) => {
      if (error.response.status === 404) {
        navigateTo('/chats')
      }
    },
  })
</script>
