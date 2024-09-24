<template>
  <form @submit.prevent="props.form.submit">
    <slot></slot>
    <div
      v-show="!props.form.disabled"
      class="mt-6 flex gap-2 bottom-2 z-10 transition"
      :class="{
        sticky: props.form.isDirty,
      }"
    >
      <UButton
        icon="i-ci-save"
        :loading="props.form.pending"
        :disabled="props.form.pending || props.form.disabled"
        type="submit"
        block
        class="shrink"
      >
        Сохранить
      </UButton>
      <UButton
        v-if="props.form.showRemove"
        icon="i-gg-trash"
        color="red"
        :loading="props.form.pending"
        :disabled="props.form.pending || props.form.disabled"
        @click="props.form.remove"
      />
    </div>
  </form>
</template>

<script setup>
  const props = defineProps({
    form: {
      type: Object,
      default: () => {},
    },
  })
</script>
