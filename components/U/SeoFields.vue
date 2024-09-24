<template>
  <!--  -->
  <UFormGroup
    label="Meta title"
    required
    :hint="'Символов: ' + String(state.meta_title?.length || 0)"
    :error="props.errors?.meta_title"
  >
    <UInput v-model="state.meta_title" />
  </UFormGroup>

  <!--  -->
  <UFormGroup
    label="Meta description"
    description="Google обычно сокращает описание до ~155–160 символов."
    :hint="'Символов: ' + String(state.meta_description?.length || 0)"
    :error="props.errors?.meta_description"
  >
    <UTextarea v-model="state.meta_description" autoresize />
  </UFormGroup>

  <!--  -->
  <UFormGroup
    label="Meta keywords"
    :hint="'Символов: ' + String(state.meta_keywords?.length || 0)"
    :error="props.errors?.meta_title"
  >
    <UInput v-model="state.meta_keywords" />
  </UFormGroup>
</template>

<script setup>
  const state = defineModel()
  const props = defineProps({
    errors: {
      type: Object,
      default: () => ({}),
    },
  })
</script>
