<template>
  <UCard
    id="chat"
    class="max-w-2xl flex flex-col"
    :ui="{ body: { base: 'flex-1', padding: 'p-[0_!important]' } }"
  >
    <template #header>
      <div class="flex items-center">
        {{ meta.subject }}
        <UButton
          :to="`/payouts?id=${meta.payout.id}`"
          v-if="meta.payout"
          size="xs"
          color="gray"
          class="ml-2"
        >
          Открыть платёж #{{ meta.payout.id }} [{{
            translateKey(meta.payout.status)
          }}]
        </UButton>
      </div>
    </template>

    <div
      class="px-6 max-h-[calc(100vh-20rem)] min-h-48 overflow-y-auto"
      ref="chatRef"
    >
      <div class="flex py-4 flex-col gap-4">
        <div
          v-if="meta.current_page < meta.last_page"
          class="text-xs text-center link"
          @click="page = meta.current_page + 1"
        >
          Предыдущие сообщения
        </div>
        <template v-for="message in props.list" :key="message.id">
          <ChatMessage
            v-if="message.id"
            :chatId="chatId"
            :message="message"
            :participants="meta.participants"
          />
          <ChatMessageInfo v-else :message="message" />
        </template>
        <div v-if="typing.text" class="text-xs">
          <p>{{ typing.name }} печатает...</p>
          <p class="text-gray-500 italic">{{ typing.text }}</p>
        </div>
      </div>
    </div>

    <template #footer>
      <UTextarea
        class="w-full"
        placeholder="Сообщение..."
        v-model="state.text"
        @keyup.enter="submit"
      />
      <div class="grid mt-4 grid-cols-[1fr_auto] gap-2">
        <UButton
          icon="i-ic-baseline-send"
          @click="submit"
          block
          size="sm"
          label="Отправить"
        />
        <UButton
          icon="i-mdi-paperclip"
          as="label"
          color="gray"
          size="sm"
          square
          class="cursor-pointer"
        >
          <input
            type="file"
            style="display: none"
            multiple
            @change="setFiles"
          />
        </UButton>
      </div>
      <div class="mt-2 grid text-xs" v-if="state.files?.length">
        <div
          class="flex justify-between gap-2 max-w-36"
          v-for="(file, i) in state.files"
          :key="state.files"
        >
          <span>{{ file.name }}</span>
          <span class="link" @click="removeFile(i)">
            <UIcon name="ic:baseline-close" />
          </span>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup>
  import sound from '/sounds/message.mp3'
  const soundMsg = new Audio(sound)

  const chatRef = ref(null)
  const chatId = useRoute().params.id
  const user = useApiUser()
  const page = defineModel('page')

  const props = defineProps({
    meta: Object,
    list: Array,
    refresh: Function,
  })

  const { form, state } = await useApiForm(
    `../chats/chats/${chatId}/message`,
    {
      text: '',
      files: [],
    },
    {
      onError: () => {
        const msg = props.list.pop()
        state.text = msg.text
        state.files = msg.files || []
      },
    },
  )

  const submit = async (e) => {
    if (e.shiftKey || e.ctrlKey || !state.text.trim()) return

    props.list.push({
      id: Math.random(),
      user_id: user.value.id,
      text: state.text,
      files: state.files,
      created_at: new Date().toISOString(),
    })
    setTimeout(() => {
      state.text = ''
      state.files = []
      scrollToBottom()
    }, 10)
    await form.submit()
  }

  const setFiles = (event) => {
    Array.from(event.target.files).forEach((file, i) => {
      if (i > 5) {
        notify.alert('Можно выбрать не более 5-ти файлов')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        notify.alert('Файл должен быть не более 10 МБ')
        return
      }
      state.files.push({
        file: file,
        name: file.name,
        url: URL.createObjectURL(file),
      })
    })
  }
  const removeFile = (i) => {
    state.files.splice(i, 1)
  }

  const markRead = async () => {
    $api('../chats/chats/' + chatId, {
      method: 'PUT',
    })
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatRef.value) {
        chatRef.value.scrollTop = chatRef.value.scrollHeight
      }
    }, 5)
  }

  const addToParticipants = (user) => {
    if (!props.meta.participants.find((item) => item.id == user.id)) {
      props.meta.participants.push(user)
    }
  }

  const typing = reactive({
    name: '',
    text: '',
    isTyping: false,
  })

  let readingTimer = null
  onMounted(() => {
    readingTimer = setTimeout(markRead, 1500)
    setTimeout(() => {
      scrollToElement('#chat')
      scrollToBottom()
    }, 500)

    window.Echo.join(`chat.${chatId}`)
      .here((users) => {
        users.forEach(addToParticipants)
      })
      .joining((user) => {
        addToParticipants(user)
        props.list.push({
          user_id: user.id,
          name: user.name,
          content: 'открыл страницу чата',
        })
      })
      .leaving((user) => {
        props.list.push({
          user_id: user.id,
          name: user.name,
          content: 'покинул страницу чата',
        })
      })
      .listen('.new_message', ({ chatMessage: message }) => {
        props.list.push(message)
        typing.text = ''

        scrollToBottom()
        markRead()
        soundMsg.play()
      })

    let timerId = null
    window.Echo.private(`chat.${chatId}`).listenForWhisper('typing', (e) => {
      typing.name = e.name
      typing.text = e.text

      clearTimeout(timerId)
      timerId = setTimeout(() => {
        typing.text = ''
      }, 3000)

      scrollToBottom()
    })
  })

  onUnmounted(() => {
    window.Echo.leave(`chat.${chatId}`)
    clearTimeout(readingTimer)
  })
</script>

<style lang="scss" scoped></style>
