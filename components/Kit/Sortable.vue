<template>
  <draggable v-model="selected" item-key="id">
    <!--  -->
    <template #header>
      <KitSearch
        class="sticky top-2 mb-4 z-50"
        v-model="selected"
        :type="item.type"
      />
    </template>

    <!--  -->
    <template #item="{ element }">
      <div
        class="flex py-2 px-2 gap-2 items-center even:bg-gray-500/5 border-b last:border-none"
      >
        <!--  -->
        <UButton
          icon="i-ri-drag-move-fill"
          color="gray"
          variant="ghost"
          size="xs"
          @click.prevent
          class="cursor-move"
        />

        <!--  -->
        <TableThumbnails
          v-if="element.preview"
          size="md"
          :src="element.preview"
        />

        <!--  -->
        <NuxtLink
          target="_blank"
          :to="`/${item.type}/${element.id}`"
          class="link text-sm leading-tight"
        >
          <UIcon v-if="item.is_premium" name="ic:baseline-diamond" />
          <span>{{ element.title || element.name }}</span>
        </NuxtLink>

        <!--  -->
        <UIcon
          name="i-ic-baseline-cancel"
          class="text-red-500 link ml-auto"
          @click="selected = selected.filter((item) => item.id !== element.id)"
        />
      </div>
    </template>
    <template #footer>
      <UButton
        color="gray"
        size="sm"
        @click="submit"
        class="sticky mt-4 bottom-2 z-30"
        label="Сохранить"
        block
      />
    </template>
  </draggable>
</template>

<script setup>
  import draggable from 'vuedraggable'

  const props = defineProps({
    item: {
      type: Object,
    },
  })

  const selected = ref(props.item.items)
  console.log('selected', selected)

  const loading = ref(false)

  const submit = async () => {
    loading.value = true

    const list = selected.value.map((item) => item.id)

    await useApiFormSubmit(`kits/${props.item.id}/update_list`, { list })

    loading.value = false
  }
</script>
