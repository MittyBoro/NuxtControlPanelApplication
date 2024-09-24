<template>
  <aside
    class="flex flex-col py-6 pl-6 pr-4 text-gray-700 dark:text-gray-400 z-50 bg-white dark:bg-black transition-all duration-300 max-xl:fixed max-xl:top-0 max-xl:bottom-0 max-xl:overflow-auto"
    :class="{
      'aside-mini': mini,
      'max-xl:-translate-x-full max-xl:opacity-0 max-xl:invisible': !useSidebar,
    }"
    @click="useSidebar = false"
  >
    <div class="relative mb-4 xl:mb-8 flex items-center z-10">
      <UButton
        class="xl:w-16 xl:h-16 flex relative rounded-xl xl:rounded-3xl cursor-pointer overflow-hidden"
        square
      >
        <UIcon
          class="m-auto text-xl xl:text-4xl"
          :name="
            mini
              ? 'i-material-symbols-menu-rounded'
              : 'i-material-symbols-menu-open-rounded'
          "
        />
        <div class="absolute inset-0 hidden xl:block" @click="mini = !mini" />
        <div
          class="absolute inset-0 block xl:hidden"
          @click="
            () => {
              mini = false
              useSidebar = false
            }
          "
        />
      </UButton>
      <NuxtLink
        to="/"
        class="font-black tracking-widest text-2xl ml-3 xl:ml-6 max-xl:mr-2 mt-1 select-none text-slide"
      >
        <span>Panel</span>
        <span class="opacity-70">Ka</span>
      </NuxtLink>
      <LayoutHeaderColorMode class="xl:hidden ml-auto" />
    </div>
    <nav v-for="(menu, i) in panelMenu" :key="i" class="relative mb-2 xl:mb-3">
      <template v-for="item in menu" :key="item.name">
        <UPopover
          v-if="!item.hidden"
          :popper="{
            placement: 'right',
            offsetDistance: -26,
          }"
          :disabled="!mini || !!item.target"
          class="flex"
        >
          <template #panel>
            <div class="px-3 py-1 font-bold text-sm text-black dark:text-white">
              {{ item.name }}
            </div>
          </template>
          <NuxtLink
            :to="item.route"
            :target="item.target"
            :class="{
              'router-link-active': isRouteActive(item.route),
            }"
          >
            <UChip v-if="item.chip" color="red" size="xl" :text="item.chip">
              <UIcon :name="item.icon" class="mr-2 text-2xl" />
            </UChip>
            <UIcon v-else :name="item.icon" class="mr-2 text-2xl" />

            <span class="text-sm tracking-wide text-slide ml-2">
              {{ item.name }}
            </span>
          </NuxtLink>
        </UPopover>
      </template>
    </nav>
  </aside>
</template>

<script setup>
  const useSidebar = useLocalStorage('sidebar')
  const panelMenu = useSidebarMenu()
  const user = useApiUser()
  const apiAttributes = useApiAttributes()

  panelMenu.forEach((group) => {
    group.forEach((item) => {
      // add unread messages count
      if (item.route == '/chats' && user.value.unread_messages_count) {
        item.chip = computed(() => user.value.unread_messages_count)
      }
      if (item.route == '/payouts' && user.value.unread_messages_count) {
        item.chip = computed(() => apiAttributes.value.payout_count)
      }
    })
  })

  const mini = useLocalStorage('mini')

  onMounted(() => {
    useSidebar.value = false
  })
</script>

<style lang="scss" scoped>
  nav {
    a {
      @apply font-bold w-full px-3 xl:pl-5 xl:pr-4 py-1.5 xl:py-2 flex items-center;
      @apply text-black dark:text-white rounded-xl transition-colors;
      &:hover {
        @apply bg-gray-400/10;
      }
    }
    .router-link-active {
      @apply font-black bg-primary-500/90 text-black dark:text-black;
      &:hover {
        @apply bg-primary-500 text-black;
      }
    }
  }

  @media (min-width: theme('screens.xl')) {
    .text-slide {
      @apply overflow-hidden w-40;
      transition-duration: 0.2s;
      transition-property: width, opacity, padding, margin;
    }
    .aside-mini {
      .text-slide {
        @apply w-0 m-0 opacity-0;
      }
    }
  }

  aside {
    @apply ring-[1000vw] ring-white/50 dark:ring-black/50 xl:ring-0;
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      opacity: 0.8;
      @apply xl:hidden;
    }
  }
</style>
