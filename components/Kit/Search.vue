<template>
  <USelectMenu
    v-model="selected"
    icon="i-mdi-magnify"
    placeholder="Найти..."
    searchablePlaceholder="Найти..."
    size="xl"
    :loading="loading"
    :searchable="search"
    option-attribute="title"
    multiple
    trailing
    by="id"
  >
    <template #label>
      <span v-if="selected.length" class="truncate">
        Выбрано: {{ selected.length }}
      </span>
      <span v-else>Найти...</span>
    </template>
    <template #option="{ option }">
      <TableThumbnails class="ml-2" size="sm" :src="option.preview" />
      <span class="mx-1">#{{ option.id }}</span>
      <UIcon v-if="option.is_premium" name="ic:baseline-diamond" />
      <span class="truncate">{{ option.title }}</span>
    </template>
  </USelectMenu>
</template>

<script setup>
  const selected = defineModel()
  const loading = ref(false)

  const props = defineProps({
    type: String,
  })

  const search = async (q = undefined) => {
    loading.value = true

    const videos = await $api(props.type, {
      params: {
        q,
        per_page: props.type === 'categories' ? 500 : 50,
        mini: true,
      },
    })

    loading.value = false

    return videos.data
  }
</script>
