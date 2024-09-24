<template>
  <UFormGroup
    :description="state.config.description"
    :class="{ 'animate-pulse pointer-events-none': form.inProgress }"
    :error="form.validationError"
  >
    <template #label>
      <span>{{ state.config.title }}</span>
      <template v-if="showInfo">
        <span
          class="ml-0.5 font-mono text-xs opacity-50 cursor-pointer active:opacity-100"
          @click="copyWithNotify(state.key)"
        >
          [{{ state.key }}]
        </span>
        <UIcon name="i-gg-pen" class="link" @click="editItemEvent" />
      </template>
    </template>
    <template #hint>
      <div class="flex items-center gap-1 text-xs">
        <span v-if="countDown > 0">Автосохранение через {{ countDown }}</span>
        <UButton
          :icon="
            form.inProgress || countDown === 0
              ? 'i-line-md-loading-alt-loop'
              : 'i-ci-save'
          "
          color="gray"
          variant="ghost"
          size="xs"
          @click="countDown = 0"
          :padded="false"
        />
      </div>
    </template>

    <div class="mt-2">
      <!--  -->
      <template v-if="state.type === 'object'">
        <UObject v-model="state.value" :config="state.config" />
      </template>
      <!--  -->
      <template v-else-if="['array', 'object_array'].includes(state.type)">
        <UArray
          :config="state.config"
          :type="state.type"
          v-model="state.value"
        />
      </template>
      <!--  -->
      <template v-else-if="state.type === 'media'">
        <UFileInput
          v-model="state.value"
          :multiple="Boolean(item.config.multiple)"
        />
      </template>
      <!--  -->
      <template v-else>
        <UFields
          v-model="state.value"
          :type="item.type"
          :options="item.config.options"
        />
      </template>
    </div>
  </UFormGroup>
</template>

<script setup>
  const props = defineProps({
    item: {
      type: Object,
    },
  })

  const showInfo = ref(useRoute().name == 'props')

  const { form, state } = await useApiForm('props', props.item, {
    onSuccess: () => setWatcher(),
    onError: () => setWatcher(),
  })

  const countDownId = ref(null)
  const countDown = ref(-1)
  let unwatch = () => {}

  const setWatcher = () => {
    setTimeout(() => {
      unwatch = watch(
        () => state,
        () => {
          countDown.value = 7
        },
        { deep: true },
      )
    }, 100)
  }

  onMounted(() => {
    countDownId.value = setInterval(() => {
      if (countDown.value == 0) {
        unwatch()
        form.submit()
      }
      countDown.value--
    }, 1000)

    setWatcher()
  })

  onBeforeUnmount(() => {
    clearTimeout(countDownId.value)
  })

  const emit = defineEmits(['editItem'])
  const editItemEvent = () => {
    emit('editItem', state)
  }
</script>

<style lang="scss" scoped></style>
