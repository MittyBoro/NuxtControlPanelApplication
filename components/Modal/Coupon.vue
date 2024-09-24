<template>
  <LayoutModal v-model="isOpen" :id="state.id">
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <div class="grid grid-cols-[auto_auto] gap-4">
            <UFormGroup label="Код" required :error="form.errors.code">
              <UButtonGroup size="md" class="w-full">
                <UInput v-model="state.code" class="w-full" required />
                <UButton
                  icon="i-material-symbols-autorenew"
                  color="gray"
                  @click="state.code = generateCode()"
                />
              </UButtonGroup>
            </UFormGroup>

            <UFormGroup label="Активен" required :error="form.errors.is_active">
              <UToggle v-model="state.is_active" />
            </UFormGroup>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!--  -->
            <UFormGroup
              label="Период, дни"
              required
              :error="form.errors.period"
            >
              <UInput v-model.number="state.period" type="number" required />
            </UFormGroup>
            <!--  -->
            <UFormGroup label="Количество" required :error="form.errors.count">
              <UInput v-model.number="state.count" type="number" required />
            </UFormGroup>
          </div>
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const item = useCustomModal('coupons').data

  const generateCode = () => {
    return 'BZ_' + Math.random().toString(36).substring(2, 10).toUpperCase()
  }

  const { form, state } = await useApiForm(
    'coupons',
    reactive({
      period: 7,
      count: 1,
      is_active: true,
      code: generateCode(),
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
