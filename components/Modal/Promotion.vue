<template>
  <LayoutModal v-model="isOpen" :id="state.id">
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <UFormGroup label="С какой даты" :error="form.errors.from">
            <UInputDate
              v-model="state.from"
              type="datetime-local"
              :max="formatInputDateTime(state.to)"
            />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="До какой даты" :error="form.errors.to">
            <UInputDate
              v-model="state.to"
              type="datetime-local"
              :min="formatInputDateTime(state.from)"
            />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="Процент" :error="form.errors.percent">
            <UInput v-model="state.percent" type="number" min="0" max="100" />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="Активна" :error="form.errors.is_active">
            <UToggle color="green" v-model="state.is_active" />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="Текст" :error="form.errors.text">
            <UTextEditor v-model="state.text" />
          </UFormGroup>
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const item = useCustomModal('promotions').data

  const addDays = (days) => {
    let today = new Date()

    let tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + days)
    tomorrow.setHours(0, 0, 0, 0)

    return new Date(tomorrow).toISOString()
  }

  const { form, state } = await useApiForm(
    'promotions',
    reactive({
      is_active: true,
      from: addDays(1),
      to: addDays(3),
      percent: 10,
      ...item,
    }),
    {
      redirectAfterCreate: false,
      onSuccess: async () => {
        isOpen.value = false
      },
    },
  )
</script>
