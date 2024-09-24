<template>
  <LayoutModal v-model="isOpen" :id="state.id">
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <UFormGroup label="Имя тарифа" required :error="form.errors.title">
            <UInput v-model="state.title" required />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Период (дней)"
            required
            :error="form.errors.period"
          >
            <UInput type="number" v-model="state.period" required />
          </UFormGroup>

          <div class="grid grid-cols-[auto_auto] gap-4">
            <!--  -->
            <UFormGroup label="Позиция в списке" :error="form.errors.position">
              <USelect
                :options="[...Array(10).keys()].map((n) => n)"
                v-model="state.position"
              />
            </UFormGroup>
            <!--  -->
            <UFormGroup label="Активен" :error="form.errors.is_active">
              <UToggle v-model="state.is_active" />
            </UFormGroup>
          </div>

          <!--  -->
          <UFormGroup label="Стоимость" required :error="form.errors.amount">
            <UButtonGroup class="w-full">
              <UInput
                v-model="state.amount"
                type="number"
                min="0"
                class="w-full"
                required
              />
              <USelectMenu
                v-model="state.currency"
                :options="Object.keys(currencies)"
                class="w-24"
                required
              />
            </UButtonGroup>
          </UFormGroup>
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const item = useCustomModal('tariffs').data

  const { form, state } = await useApiForm(
    'tariffs',
    reactive({
      is_active: true,
      position: 0,
      currency: 'RUB',
      ...item,
    }),
    {
      redirectAfterCreate: false,
      onSuccess: async () => {
        isOpen.value = false
      },
    },
  )

  const { currencies } = useApiAttributes().value
</script>
