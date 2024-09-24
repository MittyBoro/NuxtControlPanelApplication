<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="font-black py-1 lg:text-2xl">
          <slot v-if="slots.title" name="title"></slot>
          <UBreadcrumb
            v-else
            :links="[
              ...useTitle().value.array,
              {
                label: parseInt(props.id) ? 'Редактировать' : 'Добавить',
              },
            ]"
            :ui="{ li: 'lg:text-xl' }"
          />
        </div>
        <UButton
          icon="i-material-symbols-close-rounded"
          size="sm"
          color="gray"
          variant="ghost"
          class="absolute top-2 right-2"
          v-if="!props.hideClose"
          @click="isOpen = false"
        />
      </template>

      <div class="form-item">
        <slot></slot>
      </div>

      <template v-if="slots.footer" #footer>
        <div class="flex gap-2 justify-center transition">
          <slot name="footer"></slot>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
  const slots = defineSlots()

  const props = defineProps({
    hideClose: {
      type: Boolean,
      default: false,
    },
    id: [Number, String],
  })

  const isOpen = defineModel()

  const popstate = () => {
    isOpen.value = false
    if (window.location.hash === '#modal') {
      isOpen.value = true
    }
  }

  onMounted(() => {
    window.addEventListener('popstate', popstate)

    watch(
      () => isOpen.value,
      (value) => {
        if (value) {
          history.pushState({ modal: true }, '', '#')
        } else {
          history.replaceState(
            { modal: false },
            '',
            location.href.replace(location.hash, ''),
          )
        }
      },
      { immediate: true },
    )
  })
  onUnmounted(() => {
    window.removeEventListener('popstate', popstate)
  })
</script>
