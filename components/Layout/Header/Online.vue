<template>
  <UPopover mode="hover" :popper="{ placement: 'bottom-start', arrow: false }">
    <UAvatarGroup size="md" :max="3">
      <UAvatar
        v-for="(u, i) in sortedUsers"
        :key="i"
        :alt="u.name"
        :src="u.avatar?.[0]"
        :class="{ '-ml-3': i }"
        :chip-text="`+${user.unread_messages_count}`"
        :chip-color="
          user.id == u.id && user.unread_messages_count > 0 ? 'red' : null
        "
        chip-position="bottom-left"
      />
    </UAvatarGroup>

    <template #panel>
      <div class="p-1 grid gap-0.5">
        <UButton
          v-for="(u, i) in sortedUsers"
          :key="i"
          :label="u.name"
          :to="`/users/show/${u.id}`"
          color="gray"
          variant="ghost"
          class="menu-item flex-1"
          size="sm"
        >
          <template #leading>
            <UAvatar
              :key="i"
              chip-color="green"
              :alt="u.name"
              :src="u.avatar?.['1x.webp']"
              :chip-text="u.id == user.id ? 'вы' : null"
              size="xs"
            />
          </template>
        </UButton>
        <UDivider class="my-1" />
        <UButton
          v-if="user.role == 'admin'"
          icon="i-majesticons-mail-open-line"
          label="Чаты"
          :to="`/chats`"
          color="gray"
          variant="ghost"
          class="menu-item"
          size="sm"
          truncate
        >
          <span>Чаты</span>
          <UBadge v-if="user.unread_messages_count" color="red" size="xs">
            +{{ user.unread_messages_count }}
          </UBadge>
        </UButton>
        <UButton
          icon="i-majesticons-settings-cog-line"
          label="Редактировать"
          :to="`/users/${user.id}`"
          color="gray"
          variant="ghost"
          class="menu-item"
          size="sm"
          truncate
        />
        <UButton
          icon="i-majesticons-door-exit-line"
          label="Выход"
          @click="async () => await logout()"
          color="gray"
          variant="ghost"
          class="menu-item"
          size="sm"
          truncate
        />
      </div>
    </template>
  </UPopover>
</template>

<script setup>
  import sound from '/sounds/notification.mp3'
  const soundMsg = new Audio(sound)

  const { logout } = useApiAuth()
  const user = useApiUser()
  const route = useRoute()

  const usersOnline = defineModel('users')

  const sortedUsers = computed(() => {
    return [
      user.value,
      ...usersOnline.value?.filter((u) => u.id != user.value.id),
    ]
  })

  window.Echo.join(`panel`)
    .here((users) => {
      usersOnline.value = users
    })
    .joining((user) => {
      usersOnline.value.push(user)
      notify.info(`Пользователь ${user.name} в сети`, {
        timeout: 2000,
        icon: null,
        avatar: {
          src: user.avatar?.[0]?.src,
          alt: user.name,
          size: 'sm',
        },
      })
      sendMyPath()
    })
    .leaving((user) => {
      usersOnline.value = usersOnline.value.filter((u) => u.id !== user.id)
    })

  window.Echo.private(`panel`)
    .listenForWhisper('please_leave', ({ user, text }) => {
      notify.warn(text, {
        timeout: 5000,
        icon: null,
        title: 'Внимание!',
        avatar: {
          src: user.avatar?.[0]?.src,
          alt: user.name,
          size: 'sm',
        },
      })
      soundMsg.play()
    })
    .listenForWhisper('change_path', ({ id, path }) => {
      usersOnline.value = usersOnline.value.map((u) => {
        if (u.id == id) {
          u.path = path
        }
        return u
      })
    })

  const sendMyPath = () => {
    window.Echo.private(`panel`).whisper('change_path', {
      id: user.value.id,
      path: route.path,
    })
  }

  onMounted(() => {
    watch(
      () => route.path,
      () => sendMyPath(),
      { immediate: true },
    )
  })
  onUnmounted(() => {
    window.Echo.leave(`panel`)
  })
</script>

<style lang="scss" scoped>
  :deep(.menu-item) {
    &:is(a, button) {
      @apply bg-transparent font-normal min-w-[180px];
      &:hover {
        @apply bg-primary-500 text-black;
      }
    }
  }
</style>
