<template>
  <div
    class="flex items-center pt-4 gap-6 justify-between flex-wrap border-t border-gray-200 dark:border-gray-700 text-xs"
  >
    <p>
      C
      <b>{{ props.meta.from }}</b>
      по
      <b>{{ props.meta.to }}</b>
      из
      <b>{{ props.meta.total }}</b>
    </p>
    <div class="flex gap-2 items-center mr-auto">
      <p>На странице</p>
      <UInputMenu
        v-model.lazy="perPage"
        min="1"
        :options="[10, 15, 25, 50, 100]"
        :ui="{
          base: 'max-w-[4.8rem] text-center',
        }"
      />
    </div>

    <UPagination
      v-model="currentPage"
      :page-count="props.meta.per_page"
      :total="props.meta.total"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    meta: {
      type: Object,
      default: () => ({}),
    },
  })

  const route = useRoute()

  const currentPage = computed({
    get: () => props.meta.current_page,
    set: (value) => setQuery({ page: value }),
  })

  const perPage = computed({
    get: () => props.meta.per_page || 1,
    set: (value) => setQuery({ page: undefined, per_page: value }),
  })

  const setQuery = (query) => {
    navigateTo({ query: { ...route.query, ...query } })
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
</script>
