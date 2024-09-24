<template>
  <div
    class="menu-item"
    :class="[
      {
        'bg-gray-300 dark:bg-gray-700': isActive ? isActive() : null,
        disabled: disabled,
      },
    ]"
    @click="action"
    :title="title"
  >
    <UIcon :name="icon" class="opacity-70" />
  </div>
</template>

<script setup>
  const { icon, title, action, disabled, isActive } = defineProps({
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Function,
      default: null,
    },
  })
</script>
