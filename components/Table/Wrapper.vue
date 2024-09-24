<template>
  <UCard>
    <div v-if="slots.header" class="mb-4">
      <slot name="header"></slot>
    </div>
    <div v-if="route.query.id" class="mb-4">
      <div class="flex gap-2 items-center text-gray-500 font-bold text-sm">
        #ID: {{ route.query.id }}
        <UButton
          icon="i-material-symbols-light-close-small-rounded"
          size="xs"
          color="gray"
          :padded="false"
          class="p-0.5"
          @click="navigateTo({ query: {} })"
        />
      </div>
    </div>
    <UButtonGroup v-if="user" class="mb-6 max-w-xs">
      <UserCardMini :to="`/users/show/${user.id}`" :user="user" />
      <UButton
        color="gray"
        icon="i-ic-baseline-close"
        :padded="false"
        size="xs"
        class="px-1"
        @click="navigateTo({ query: {} })"
      />
    </UButtonGroup>
    <div
      class="flex max-md:flex-wrap gap-4 ml-auto pb-4 items-end border-b border-gray-200 dark:border-gray-700 text-xs"
    >
      <TableFilter
        v-if="props.filter"
        :filter="props.filter"
        class="max-md:order-1"
      />
      <div
        class="grid gap-2 ml-auto self-start max-md:justify-center max-md:w-full"
      >
        <UButton
          v-if="props.create"
          icon="i-ic-baseline-plus"
          size="sm"
          label="Добавить"
          @click="props.create"
          block
        />
        <slot name="buttons"></slot>
      </div>
    </div>

    <slot></slot>
    <TablePagination v-if="props.meta?.total" :meta="props.meta" />
  </UCard>
</template>

<script setup>
  const route = useRoute()
  const slots = defineSlots()
  const props = defineProps({
    create: Function,
    meta: Object,
    filter: Object,
  })

  const user = ref(null)

  watch(
    () => route.query.user_id,
    async (value) => {
      if (value) {
        const { data } = await $api(`/users/${value}`)
        user.value = data
      } else {
        user.value = null
      }
    },
    {
      immediate: true,
    },
  )
</script>
