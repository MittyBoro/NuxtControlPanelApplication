<template>
  <UFormGroup :label="props.label" :error="props.error">
    <USelectMenu
      v-model="model"
      searchable-placeholder="Поиск..."
      :options="selectOptions"
      value-attribute="value"
      option-attribute="label"
      multiple
      searchable
    >
      <template #label>
        <span v-if="model.length" class="truncate">
          Выбрано: {{ model.length }}
        </span>
        <span v-else>Выберите данные</span>
      </template>
    </USelectMenu>
    <template v-if="badges.length" #help>
      <div class="flex flex-wrap gap-2">
        <template v-for="item in badges" :key="item.value">
          <UBadge color="gray">
            <span>{{ item.label }}</span>
            <span @click="remove(item.value)">
              <UIcon
                name="i-material-symbols-close-rounded"
                class="cursor-pointer"
              />
            </span>
          </UBadge>
        </template>
        <UBadge
          v-if="model.length > limit"
          color="primary"
          @click="showAll = !showAll"
          size="xs"
          :label="showAll ? 'Скрыть' : `Ещё +${model.length - limit}`"
          class="cursor-pointer hover:bg-primary-400 hover:dark:bg-primary-500 transition-colors"
        />
      </div>
    </template>
  </UFormGroup>
</template>

<script setup>
  const props = defineProps({
    label: String,
    options: [Array, Object],
    error: String,
  })

  const limit = 10

  const showAll = ref(false)

  const selectOptions = computed(() => {
    return Array.from(props.options ?? [])
  })

  const model = defineModel({
    type: Array,
  })

  const badges = computed(() => {
    let list = selectOptions.value.filter((i) => model.value.includes(i.value))
    if (!showAll.value && list.length) {
      list = list.slice(0, limit)
    }
    return list
  })

  const remove = (value) => {
    model.value = model.value.filter((i) => i !== value)
  }
</script>
