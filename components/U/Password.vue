<template>
  <UFormGroup :required="required" :size="size" class="w-full">
    <UButtonGroup :size="size" class="w-full">
      <UInput
        v-model="value"
        :type="type"
        :autocomplete="autocomplete"
        :required="required"
        icon="i-material-symbols-key-rounded"
        class="w-full"
        v-bind="attrs"
      />
      <UButton
        color="gray"
        :icon="
          !showPass
            ? 'i-material-symbols-visibility'
            : 'i-material-symbols-visibility-off'
        "
        class="cursor-pointer"
        @click="showPass = !showPass"
      />
    </UButtonGroup>
  </UFormGroup>
</template>

<script setup>
  const { required, size, attrs } = defineProps({
    required: {
      type: Boolean,
    },
    size: {
      type: String,
      default: 'md',
    },
    autocomplete: {
      type: String,
      default: '',
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
  })

  const value = defineModel()

  const showPass = useLocalStorage('showPass', false)

  const type = computed(() => (showPass.value ? 'text' : 'password'))
</script>
