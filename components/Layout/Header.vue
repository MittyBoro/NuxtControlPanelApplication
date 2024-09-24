<template>
  <div>
    <header class="flex items-center gap-2 lg:gap-4">
      <UButton
        color="gray"
        icon="i-material-symbols-keyboard-backspace-rounded"
        @click="useRouter().back()"
        class="hidden xl:flex"
      />
      <UButton
        icon="i-material-symbols-menu-rounded"
        class="flex xl:hidden"
        @click="useSidebar = true"
        size="xl"
      />

      <UBreadcrumb
        :links="useTitle().value.array"
        :ui="{ ol: 'flex-wrap', li: 'lg:text-xl' }"
        class="mr-auto"
      />

      <UButton
        color="gray"
        variant="ghost"
        icon="i-gg-external"
        :to="externalUrl()"
        target="_blank"
        size="sm"
      >
        <span class="max-md:hidden">На сайт</span>
      </UButton>

      <LayoutHeaderColorMode class="max-md:hidden" />
      <LayoutHeaderNotifications />

      <LayoutHeaderOnline v-model:users="usersOnline" />
    </header>
    <UCard
      v-if="usersOnThisPage.length && route.name.endsWith('-id')"
      class="mt-4 -mb-4 bg-primary-500 dark:bg-primary-500 dark:text-black"
      :ui="{
        body: { padding: 'py-2 sm:py-2' },
        rounded: 'sm:rounded-lg',
      }"
    >
      <div class="flex items-center gap-2">
        <div class="font-bold text-sm">Эту страницу так же смотрят</div>
        <template v-for="(user, i) in usersOnThisPage" :key="i">
          <UTooltip :text="`${user.name} #${user.id}`">
            <UAvatar
              :alt="user.name"
              :src="user.avatar?.[0]?.src"
              size="sm"
              :class="{ '-ml-5': i }"
              class="ring-2 ring-black/10"
            />
          </UTooltip>
        </template>
        <UButton
          icon="i-emojione-megaphone"
          color="gray"
          variant="ghost"
          label="Попросить уйти"
          @click="askToLeave"
          size="xs"
          class="bg-white/50 text-black dark:text-black"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup>
  const useSidebar = useLocalStorage('sidebar')
  const route = useRoute()
  const user = useApiUser()

  const usersOnline = ref([])

  const usersOnThisPage = computed(() => {
    return usersOnline.value.filter(
      (u) => u.path == route.path && u.id != user.value.id,
    )
  })

  const askToLeave = () => {
    window.Echo.private(`panel`).whisper('please_leave', {
      user: user.value,
      text: `Пользователь ${user.value.name} просит вас покинуть страницу ${route.path}`,
    })
  }
</script>
