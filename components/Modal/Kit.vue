<template>
  <LayoutModal v-model="isOpen" :id="state.id">
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <UFormGroup label="Название" required :error="form.errors.name">
            <UInput v-model="state.name" required />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Ключ"
            required
            :error="form.errors.key"
            @dblclick="lockKey = false"
          >
            <UInput v-model="state.key" required :disabled="lockKey" />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="Тип" :error="form.errors.type" required>
            <USelect
              v-model="state.type"
              :options="typeValues"
              required
              @dblclick="lockKey = false"
              :disabled="lockKey"
            >
              <template #label>
                <span class="truncate">
                  {{ translateKey(state.type) }}
                </span>
              </template>
            </USelect>
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Сортировка остальных"
            description="Сортировка видео, невошедших в список"
            help="Случайная сортировка ресурсоёмкая"
            :error="form.errors.sorting_rest"
            required
          >
            <USelect
              v-model="state.sorting_rest"
              :options="sortingValues"
              required
            >
              <template #label>
                <span class="truncate">
                  {{ translateKey(state.sorting_rest) }}
                </span>
              </template>
            </USelect>
          </UFormGroup>
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const data = useCustomModal('kits').data

  const { form, state } = await useApiForm(
    'kits',
    reactive({
      key: '',
      name: '',
      sorting_rest: '',
      ...data.item,
    }),
    {
      redirectAfterCreate: false,
      onSuccess: async () => {
        isOpen.value = false
      },
    },
  )

  const lockKey = ref(!!state.id)

  const sortingValues = computed(() => {
    return data.meta.sorting_rests.map((item) => ({
      value: item,
      label: translateKey(item),
    }))
  })

  const typeValues = computed(() => {
    return data.meta.types.map((item) => ({
      value: item,
      label: translateKey(item),
    }))
  })
</script>
