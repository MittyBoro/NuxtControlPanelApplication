<template>
  <LayoutModal v-model="isOpen">
    <template #title>
      <div>
        <div>Заблокировать пользователя</div>
        <div class="text-red-500 text-sm font-normal">
          Пользователь не сможет оставлять комментарии
        </div>
      </div>
    </template>
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <UserCardMini :user="user" />

          <!--  -->
          <UFormGroup
            :error="form.errors.ban_expiry_at"
            :help="
              state.ban_expiry_at ? `До ${formatDate(state.ban_expiry_at)}` : ''
            "
          >
            <div class="grid grid-cols-4 gap-2">
              <UFormGroup label="Лет">
                <UInput
                  v-model="period.years"
                  type="number"
                  min="0"
                  max="10"
                  class="w-full"
                />
              </UFormGroup>
              <UFormGroup label="Месяцев">
                <UInput
                  v-model="period.months"
                  type="number"
                  min="0"
                  max="12"
                  class="w-full"
                />
              </UFormGroup>
              <UFormGroup label="Дней">
                <UInput
                  v-model="period.days"
                  type="number"
                  min="0"
                  max="31"
                  class="w-full"
                />
              </UFormGroup>
              <UFormGroup label="Часов">
                <UInput
                  v-model="period.hours"
                  type="number"
                  min="0"
                  max="24"
                  class="w-full"
                />
              </UFormGroup>
            </div>
          </UFormGroup>
        </div>

        <!--  -->
        <UButton
          v-if="user.ban_expiry_at"
          class="mt-5"
          color="gray"
          label="Снять блокировку"
          block
          @click="removeBan"
        />
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const user = useCustomModal('user_ban').data

  const { form, state } = await useApiForm('users', user, {
    redirectAfterCreate: false,
    onSuccess: async () => {
      isOpen.value = false
    },
  })

  const period = reactive({
    years: 0,
    months: 0,
    days: 7,
    hours: 0,
  })
  watch(
    () => period,
    (value) => {
      const currentDate = new Date()
      const expiryDate = new Date(
        currentDate.getFullYear() + value.years,
        currentDate.getMonth() + value.months,
        currentDate.getDate() + value.days,
        currentDate.getHours() + value.hours,
        currentDate.getMinutes(),
      )
      state.ban_expiry_at = expiryDate.toISOString()
    },
    { deep: true, immediate: true },
  )

  const removeBan = () => {
    state.ban_expiry_at = null
    form.submit()
  }
</script>
