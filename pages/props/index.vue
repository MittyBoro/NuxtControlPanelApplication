<template>
  <section :class="{ 'loading-box': pending }">
    <LayoutLoading v-if="pending" />
    <div v-else class="tab-wrapper mt-[0_!important] max-w-2xl">
      <UTabs v-model="currentTab" :items="tabs" class="w-full" />

      <template v-for="(item, i) in propsList" :key="item.id">
        <UDivider icon="i-mdi-dots-horizontal" v-if="i > 0" />
        <UProp :item="item" @editItem="openEditModal(item)" />
      </template>
    </div>

    <div
      class="mt-10 max-w-2xl transition-opacity opacity-30 hover:opacity-100"
    >
      <UButton
        color="white"
        icon="i-mdi-plus"
        label="Добавить"
        @click="openEditModal({})"
        block
      />
    </div>
  </section>
</template>

<script setup>
  const { list, meta, pending, refresh } = await useApiList('props')

  const currentTab = useTabs('props-tab')

  const tabs = computed(() => [
    ...(meta.value?.tabs.map((el) => ({ label: el })) || []),
    {
      label: 'Все',
    },
  ])

  const propsList = computed(() => {
    let currentTabKey = tabs.value[currentTab.value]?.label
    if (currentTabKey === 'Все') {
      return list.value
    }
    return list.value.filter((i) => i.config.tab === currentTabKey)
  })

  const openEditModal = (item) => {
    if (!meta.value) {
      notify.alert('Нет возможности отредактировать элемент')
      return
    }
    openModal('props', { item, meta: meta.value }, refresh)
  }
</script>

<style lang="scss" scoped>
  .tab-wrapper {
    @apply grid-cols-1 gap-2;
  }
</style>
