<template>
  <div class="flex gap-2" v-if="isReady">
    <template v-for="(field, index) in props.config.fields" :key="index">
      <UFormGroup
        v-if="field && (!('clause' in field) || field.clause(modelValue))"
        :label="props.showLabel ? field.title : ''"
        size="xs"
        class="w-full"
      >
        <UFields
          v-model="modelValue[field.key]"
          :type="field.type"
          :options="field.options"
        />
      </UFormGroup>
    </template>
  </div>
</template>

<script setup>
  const props = defineProps({
    config: Object,
    showLabel: {
      type: Boolean,
      default: true,
    },
  })

  const modelValue = defineModel()

  const isReady = computed(() => {
    return modelValue.value && Object.keys(modelValue.value).length
  })

  if (!isReady.value) {
    let val = reactive({})
    props.config.fields.forEach((field) => {
      val[field.key] = null
    })
    if (!modelValue.value) {
      modelValue.value = val
    } else {
      modelValue.value = reactive({ ...modelValue.value, ...val })
    }
  }
</script>
