<template>
  <UTooltip v-if="!props.user.email_verified_at" text="Подтвердить вручную">
    <div v-if="!props.user.email_verified_at" @click="verifyEmail">
      <slot></slot>
    </div>
  </UTooltip>
</template>

<script setup>
  const props = defineProps({
    user: Object,
  })

  const verifyEmail = async () => {
    if (confirm('Верифицировать пользователя?')) {
      props.user.verify = true
      await useApiFormSubmit('users', props.user)
    }
  }
</script>
