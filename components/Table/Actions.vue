<template>
  <UButtonGroup class="gap-1" size="sm">
    <!--  -->
    <slot name="before"></slot>
    <!--  -->
    <UTooltip v-if="externalPath && row.slug" text="Просмотреть на сайте">
      <UButton
        color="gray"
        :to="externalUrl(`${externalPath}/${row.slug}`)"
        target="_blank"
        icon="i-gg-external"
      />
    </UTooltip>

    <!--  -->
    <UTooltip text="Редактировать" v-if="edit">
      <UButton
        :to="editPath(row)"
        color="gray"
        icon="i-gg-pen"
        @click.prevent="edit(row)"
      />
    </UTooltip>

    <!--  -->
    <UTooltip text="Удалить" v-if="remove">
      <UButton
        color="gray"
        icon="i-material-symbols-delete-outline"
        @click="remove(row)"
      />
    </UTooltip>

    <!--  -->
    <slot name="after"></slot>
  </UButtonGroup>
</template>

<script setup>
  const { row, externalPath, edit, remove } = defineProps({
    row: {
      type: Object,
      required: true,
    },
    externalPath: {
      type: String,
      default: () => useRoute().name,
    },
    edit: {
      type: Function,
      default: (row) => {
        const { name: routeName } = useRoute()
        navigateTo(`/${routeName}/${row.id}`)
      },
    },
    remove: {
      type: Function,
      default: async (row) => {
        if (!confirm('Вы уверены?')) {
          return
        }
        if (row.is_published) {
          return notify.warn('Нельзя удалить опубликованные данные')
        }
        row.class =
          'bg-red-500/20 dark:bg-red-400/20 animate-pulse pointer-events-none'

        await $api(`/${useRoute().name}/${row.id}`, {
          method: 'DELETE',
          onResponse: ({ response }) => {
            if (response.ok) {
              row.class = 'hidden'
              notify.success('Удалено')
            }
          },
          onResponseError: () => {
            notify.alert('Не удалось удалить')
          },
        })
      },
    },
  })

  const editPath = (row) => {
    const { name: routeName } = useRoute()
    return `/${routeName}/${row.id}`
  }
</script>
