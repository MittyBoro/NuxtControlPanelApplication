<template>
  <div class="flex flex-wrap items-end gap-4 mr-auto">
    <template v-for="item in filter" :key="item.key">
      <UTooltip :text="item.tooltip" :prevent="!item.tooltip">
        <UFormGroupX
          v-if="
            ['text', 'datetime', 'date', 'select', 'date-range'].includes(
              item.type,
            )
          "
          v-model="data[item.key]"
          :label="item.label"
          size="xs"
          class="max-sm:w-full"
        >
          <!-- text -->
          <UInput
            v-if="item.type === 'text'"
            v-model.lazy="data[item.key]"
            :icon="item.icon"
            :placeholder="item.placeholder"
            class="w-full"
          />

          <!-- datetime -->
          <UInput
            v-if="item.type === 'datetime'"
            v-model.lazy="data[item.key]"
            type="datetime-local"
            :placeholder="item.placeholder"
            :class="{ 'input-empty': !data[item.key] }"
            class="w-full min-w-28"
          />

          <TableFilterSelect
            v-if="item.type === 'select'"
            v-model="data[item.key]"
            :item="item"
            class="w-full"
          />
          <!-- select -->
        </UFormGroupX>

        <UFormGroup
          v-if="item.type === 'boolean'"
          :label="item.label"
          size="md"
        >
          <!-- boolean -->
          <UToggle
            v-model="data[item.key]"
            :icon="item.icon"
            :on-icon="item.icon"
            :off-icon="item.icon"
            size="xl"
            class="bottom-[-1.5px]"
          />
        </UFormGroup>

        <UFormGroup v-if="item.type === 'refresh'" size="md">
          <!-- reload -->
          <UTooltip text="Обновить данные">
            <UButton
              icon="i-material-symbols-light-directory-sync-rounded"
              size="xs"
              color="gray"
              @click="item.action()"
            />
          </UTooltip>
        </UFormGroup>
      </UTooltip>
    </template>

    <UFormGroup size="md" v-if="filter.length > 3">
      <UTooltip text="Сбросить фильтр">
        <UButton
          icon="i-material-symbols-filter-alt-off-outline-rounded"
          color="gray"
          size="xs"
          @click="clearFilter"
        />
      </UTooltip>
    </UFormGroup>
  </div>
</template>

<script setup>
  const { filter } = defineProps({
    filter: {
      type: Array,
      default: () => [],
    },
  })

  const route = useRoute()

  const data = reactive({})

  watchPostEffect(() => {
    filter.forEach((item) => {
      let value = route.query[item.key] ?? ''
      if (item.type === 'boolean') {
        value = !!value
      }
      data[item.key] = value
    })
  })

  watch(
    () => data,
    (value) => {
      let query = {}
      Object.keys(value).forEach((key) => {
        let item = value[key] || undefined
        query[key] = item
      })
      navigateTo({
        path: route.path,
        query: {
          ...route.query,
          ...query,
        },
      })
    },
    { deep: true },
  )

  const clearFilter = () => {
    filter.forEach((item) => {
      data[item.key] = undefined
    })
  }
</script>

<style lang="scss" scoped>
  :deep(input[type='datetime-local']) {
    display: flex;
    &:before {
      content: attr(placeholder) !important;
      margin-right: 0.15em;
      opacity: 0.8;
    }
  }
</style>
