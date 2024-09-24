<template>
  <div class="grid gap-2 whitespace-nowrap">
    <div class="font-medium">Обработка видео</div>
    <div>
      <VideoTasksRow v-for="task in tasks" :key="task.id" :task="task" />
    </div>
    <div v-if="!tasks.length" class="font-medium text-gray-500">
      Заданий нет
    </div>
    <VideoTasksActions
      :form="form"
      :state="state"
      :isRendering="isRendering"
      class="mt-3"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    state: Object,
    form: Object,
    isRendering: Boolean,
  })

  const tasks = computed(() => {
    return Array.from(props.state.tasks ?? [])
  })

  let interval = 5000

  const updateState = () => {
    setTimeout(() => {
      if (!interval) {
        return
      }
      if (!props.form.isDirty && !props.form.pending) {
        props.form.refresh()
      }
      updateState()
    }, interval)
  }

  onUnmounted(() => (interval = 0))
</script>
