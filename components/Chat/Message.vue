<template>
  <div v-if="!message.deleted" class="flex items-end gap-4 word-break">
    <UAvatar :alt="user.name" :src="user.avatar?.[0]?.src" size="md" />
    <div class="bg-gray-500/10 p-2 rounded-xl rounded-es-none">
      <div class="flex justify-between text-xs mb-1 gap-2">
        <NuxtLink
          :to="`/users/show/${user.id}`"
          target="_blank"
          class="font-bold link"
        >
          {{ user.name }}
        </NuxtLink>
        <div
          v-if="user.is_admin"
          color="green"
          size="xs"
          class="mr-auto font-bold text-green-600"
        >
          [Админ]
        </div>
        <div class="pl-5 ml-auto text-gray-500/50 text-xs">
          {{ formatDate(message.created_at) }}
        </div>
        <div
          v-if="message.user_id == authUser.id"
          class="text-red-500/50 link flex items-center"
          @click="messageDelete"
        >
          <UIcon name="i-material-symbols-close-rounded" />
        </div>
      </div>
      <div
        class="prose dark:prose-invert whitespace-pre-line break-words text-black dark:text-white text-sm"
      >
        {{ message.text?.trim() }}
      </div>
      <div v-if="message.files?.length" class="grid mt-1 text-xs">
        <NuxtLink
          v-for="file in message.files"
          :key="file.name"
          :to="file.url"
          target="_blank"
        >
          <UIcon name="i-mdi-paperclip" />
          {{ file.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  const authUser = useApiUser()

  const props = defineProps({
    chatId: [String, Number],
    message: Object,
    participants: Array,
  })

  const user = computed(() => {
    const user = props.participants.find(
      (item) => item.id == props.message.user_id,
    )
    if (!user) {
      return {
        id: props.message.user_id,
        name: '???',
      }
    }
    if (authUser.value.id == user.id) {
      user.name = 'Вы'
    }
    return user
  })

  const messageDelete = async () => {
    if (confirm('Удалить сообщение?')) {
      try {
        await $api(
          `/../chats/chats/${props.chatId}/message/${props.message.id}`,
          {
            method: 'DELETE',
          },
        )
        props.message.deleted = true
        notify.success('Сообщение удалено')
      } catch (e) {
        notify.alert('Не удалось удалить сообщение')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
