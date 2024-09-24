<template>
  <div v-if="user.notifications">
    <UPopover :popper="{ placement: 'bottom-end', arrow: false }">
      <UButton variant="ghost" color="gray" class="relative" square>
        <UChip
          color="red"
          size="2xl"
          :text="`${user.notifications.unread_count}`"
          :show="!!user.notifications.unread_count"
        >
          <UIcon name="i-line-md-bell" class="text-2xl" />
        </UChip>
      </UButton>
      <template #panel>
        <div
          class="grid gap-3 p-4 max-w-screen min-w-36 max-h-96 overflow-auto"
          :class="{ 'animate-pulse': loading }"
        >
          <div class="flex justify-between gap-4 mx-2 font-bold text-sm">
            <span v-if="user.notifications.unread_count">
              Новые уведомления ({{ user.notifications.unread_count }})
            </span>
            <span v-else-if="user.notifications.count">
              Все уведомления ({{ user.notifications.count }})
            </span>
            <span v-else>Нет уведомлений</span>
            <span
              v-if="user.notifications.count"
              @click="deleteNotifications"
              class="link-opacity opacity-70 hover:text-red-500"
            >
              Очистить
              <UIcon name="i-material-symbols-close-rounded" />
            </span>
          </div>
          <UAlert
            @mouseover="readNotifications"
            color="white"
            v-for="n in user.notifications.list"
            :key="n.id"
            :title="n.data.title"
            :ui="{
              description: 'text-xs py-1',
              actions: n.data.description ? 'mt-2' : 'mt-1',
              padding: 'px-3 py-2',
            }"
            :actions="getActions(n.data)"
            class="max-w-sm"
            :class="{ 'bg-gray-500/10 dark:bg-gray-500/10': !n.read_at }"
          >
            <template #description>
              <p>{{ n.data.description }}</p>
              <p class="text-[0.6rem]">{{ formatDate(n.created_at) }}</p>
            </template>
          </UAlert>
          <UButton
            @click="loadMore"
            v-if="
              user.notifications.current_page < user.notifications.last_page
            "
            color="gray"
            label="Ещё"
            size="xs"
            block
          />
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script setup>
  import sound from '/sounds/notification.mp3'
  const soundMsg = new Audio(sound)

  const user = useApiUser()

  const getActions = (data) => {
    const actions = []

    if (data.url) {
      actions.push({
        icon: 'i-material-symbols-open-in-new-rounded',
        variant: 'solid',
        color: 'gray',
        label: data.url_text || 'Открыть',
        click: () => {
          navigateTo(data.url, { external: true, open: { target: '_blank' } })
        },
      })
    }
    if (data.panel_url) {
      const panelUrl = data.panel_url.replace(window.location.origin, '')

      actions.unshift({
        variant: 'solid',
        color: 'primary',
        label: 'Подробнее',
        click: () => {
          navigateTo(panelUrl, { external: panelUrl == data.panel_url })
        },
      })
    }

    return actions
  }

  const loading = ref(false)
  const loadMore = async () => {
    loading.value = true
    user.value.notifications.current_page++
    const { data } = await $api(
      `/../v1/users/me/?page=${user.value.notifications.current_page}`,
    )
    user.value.notifications.list.push(...data.notifications.list)
    loading.value = false
  }
  const readNotifications = async () => {
    if (!user.value.notifications.unread_count) return
    loading.value = true
    await $api('../v1/users/me/notifications', {
      method: 'POST',
    })
    loading.value = false

    notificationsSetRead()
    window.Echo.private(`users.${user.value.id}`).whisper('notifications_read')
  }
  const deleteNotifications = async () => {
    loading.value = true
    await $api('../v1/users/me/notifications', {
      method: 'DELETE',
    })
    loading.value = false

    notificationsSetDeleted()
    window.Echo.private(`users.${user.value.id}`).whisper(
      'notifications_deleted',
    )
  }

  const notificationsSetRead = () => {
    user.value.notifications.unread_count = 0
    user.value.notifications.list?.forEach((n) => {
      if (!n.read_at) {
        n.read_at = new Date().toISOString()
      }
    })
  }
  const notificationsSetDeleted = () => {
    user.value.notifications.list = []
    user.value.notifications.unread_count = 0
    user.value.notifications.count = 0
    user.value.notifications.last_page = 0
  }

  onMounted(() => {
    window.Echo.private(`users.${user.value.id}`)
      .notification((notification) => {
        notify.info(notification.title, {
          timeout: 3000,
        })
        user.value.notifications.unread_count++
        user.value.notifications.count++

        user.value.notifications.list.unshift({
          id: Math.random(),
          data: notification,
          created_at: new Date().toISOString(),
        })

        soundMsg.play()
      })
      .listen('.unread_messages_changed', ({ unread_messages_count }) => {
        user.value.unread_messages_count = unread_messages_count
      })
      .listenForWhisper('notifications_read', (e) => {
        notificationsSetRead()
      })
      .listenForWhisper('notifications_deleted', (e) => {
        notificationsSetDeleted()
      })
  })
  onUnmounted(() => {
    if (!user.value) {
      return
    }
    window.Echo.leave(`users.${user.value.id}`)
  })
</script>

<style lang="scss" scoped>
  :deep(.w-0) {
    width: auto;
    min-width: 180px;
  }
</style>
