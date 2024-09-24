<template>
  <div class="grid w-full gap-2">
    <div
      v-for="(item, index) in modelValue"
      :key="item"
      class="flex items-stretch gap-2"
    >
      <!--  -->
      <template v-if="type == 'array'">
        <UInput v-model="modelValue[index]" class="basis-full" size="xs" />
      </template>

      <!--  -->
      <template v-else-if="type == 'object_array'">
        <UObject
          v-model="modelValue[index]"
          :config="config"
          :showLabel="!index"
          class="basis-full"
        />
      </template>
      <UButton
        color="gray"
        icon="i-ci-close-small"
        @click="removeRow(index)"
        size="xs"
      />
    </div>
    <UButton
      color="gray"
      icon="i-material-symbols-add-circle-outline-rounded"
      size="sm"
      label="Добавить"
      @click="pushRow"
      block
    />
  </div>
</template>

<script setup>
  const { config, type } = defineProps({
    config: Object,
    type: String,
  })

  const modelValue = defineModel()

  const pushRow = () => {
    if (!modelValue.value) {
      modelValue.value = []
    } else {
      const val = type == 'array' ? '' : {}
      modelValue.value.push(val)
    }
  }

  const removeRow = (index) => {
    modelValue.value.splice(index, 1)
  }

  watchEffect(() => {
    if (!modelValue.value) {
      pushRow()
    }
  })
</script>
