<template>
  <LayoutModal v-model="isOpen" :id="state.id">
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <UFormGroup label="Список тегов" required :error="form.errors.list">
            <UTextarea v-model="state.list" autoresize required />
          </UFormGroup>
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()

  const { form, state } = await useApiForm(
    'tags',
    reactive({
      list: '',
    }),
    {
      redirectAfterCreate: false,
      onSuccess: async () => {
        isOpen.value = false
      },
    },
  )
</script>
