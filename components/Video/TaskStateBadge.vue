<template>
  <div v-if="loaded">
    <UPopover
      mode="hover"
      :popper="{ arrow: false }"
      :disabled="!props.tasks?.length"
    >
      <NuxtLink :to="props.to">
        <UBadge v-if="state == 'queued'" color="black" size="xs">
          <UIcon name="i-heroicons-queue-list-16-solid" class="mr-0.5" />
          <span>В очереди</span>
        </UBadge>
        <UBadge v-if="state == 'rendering'" color="primary" size="xs">
          <UIcon name="i-line-md-loading-alt-loop" class="mr-0.5" />
          <span>Рендеринг {{ rendering }}</span>
        </UBadge>
        <UBadge v-if="state == 'success'" color="green" size="xs">
          <UIcon
            name="i-material-symbols-check-circle-outline"
            class="mr-0.5"
          />
          <span>Ok</span>
        </UBadge>
        <UBadge v-if="state == 'error'" color="red" size="xs">
          <UIcon name="i-ic-baseline-error-outline" class="mr-0.5" />
          <span>Остановлено</span>
        </UBadge>
        <UBadge v-if="state == 'none'" color="gray" variant="soft" size="xs">
          <span>Пусто</span>
        </UBadge>
      </NuxtLink>

      <template #panel>
        <NuxtLink :to="props.to" class="block py-2 px-3">
          <template v-for="task in props.tasks" :key="task.id">
            <VideoTasksRow :task="task" mini class="pointer-events-none" />
          </template>
        </NuxtLink>
      </template>
    </UPopover>
  </div>
</template>

<script setup>
  const props = defineProps({
    tasks: Array,
    to: String,
  })
  const rendering = computed(() => {
    let success = props.tasks.filter((i) => i.status === 'success').length
    return `${success}/${props.tasks.length}`
  })

  const loaded = ref(false)

  const state = computed(() => {
    // queued, proccessing, success, error, none
    let queued = props.tasks.filter((i) => i.status === 'queued').length
    let rendering = props.tasks.filter((i) => i.status === 'rendering').length
    let success = props.tasks.filter((i) => i.status === 'success').length
    let error = props.tasks.filter((i) =>
      ['error', 'stopped'].includes(i.status),
    ).length

    if (rendering > 0) {
      return 'rendering'
    }
    if (error > 0) {
      return 'error'
    }
    if (queued > 0) {
      return 'queued'
    }
    if (success > 0) {
      return 'success'
    }

    return 'none'
  })

  onMounted(() => {
    setTimeout(() => {
      loaded.value = true
    }, 100)
  })
</script>

<style lang="scss" scoped></style>
