<template>
  <UBadge :color="roleColor()" size="xs">
    <span class="max-w-[65px] truncate">
      {{ translateKey(user.role) }}
    </span>
  </UBadge>
</template>

<script setup>
  const { user } = defineProps({
    user: Object,
  })

  const roleColor = () => {
    switch (user.role) {
      case 'moderator':
        return 'blue'
      case 'editor':
        return 'green'
      case 'admin':
        return 'primary'
      default:
        return 'gray'
    }
  }
</script>
