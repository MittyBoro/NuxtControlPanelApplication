<template>
  <UButton color="gray" size="xs" block>
    <UAvatar :src="user.avatar?.[0]?.src" :alt="user.name" size="sm" />
    <div class="text-left mr-auto truncate">
      <p class="opacity-50 truncate">
        #{{ user.id || user.user_id }} [{{ user.username }}]
      </p>
      <p class="truncate">{{ user.name }}</p>
      <p class="truncate">{{ user.email }}</p>
    </div>
  </UButton>
</template>

<script setup>
  const { user } = defineProps({
    user: Object,
  })
</script>

<style lang="scss" scoped></style>
