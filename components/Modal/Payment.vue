<template>
  <LayoutModal v-model="isOpen">
    <template #title>
      <div>Добавить премиум</div>
    </template>
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <UserCardMini :user="user" />

          <!--  -->
          <UFormGroup label="Период, дней" :error="form.errors.period">
            <UInput v-model="state.period" type="number" />
          </UFormGroup>
          <!--  -->
          <UFormGroup label="Описание" :error="form.errors.description">
            <UInput v-model="state.description" />
          </UFormGroup>
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const user = useCustomModal('payments').data

  const { form, state } = await useApiForm(
    'payments',
    reactive({
      user_id: user.id,
      period: 7,
    }),
    {
      redirectAfterCreate: false,
      onSuccess: async (data) => {
        isOpen.value = false
      },
    },
  )
</script>
