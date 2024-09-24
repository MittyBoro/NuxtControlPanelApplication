<template>
  <div class="text-xs text-center opacity-50">
    <NuxtLink
      :to="`/users/${message.user_id}/show`"
      target="_blank"
      class="link-opacity"
      title="Открыть профиль"
    >
      {{ message.name }}
    </NuxtLink>
    - {{ message.content }}
  </div>
</template>

<script setup>
  defineProps({
    message: Object,
  })
</script>

<style lang="scss" scoped></style>
