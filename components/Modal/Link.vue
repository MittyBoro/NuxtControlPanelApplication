<template>
  <LayoutModal v-model="isOpen" :id="state.id">
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <UFormGroup label="Имя" required :error="form.errors.name">
            <UInput v-model="state.name" required />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="Ссылка" required :error="form.errors.url">
            <UInput v-model="state.url" type="url" name="url" required />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Коллекция"
            required
            :error="form.errors.collection"
          >
            <USelectMenu
              v-model="state.collection"
              :options="meta.collections"
              required
            >
              <template #label>
                <span class="truncate">
                  {{ translateKey(state.collection) }}
                </span>
              </template>
              <template #option="{ option }">
                <span class="truncate">{{ translateKey(option) }}</span>
              </template>
            </USelectMenu>
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Код"
            description="Если необходимо"
            :error="form.errors.code"
          >
            <UTextarea v-model="state.code" autoresize />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Приоритет"
            description="Для случайного показа"
            :error="form.errors.priority"
          >
            <UInput v-model="state.priority" type="number" min="0" />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="Позиция" :error="form.errors.position">
            <UInput v-model="state.position" type="number" min="0" />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Файлы"
            description="Если необходимо"
            :error="objKeysToStr(form.errors, 'files')"
          >
            <UFileInput v-model="state.files" multiple />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="Активна" :error="form.errors.is_active">
            <UToggle v-model="state.is_active" />
          </UFormGroup>
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const { item, meta } = useCustomModal('links').data

  const { form, state } = await useApiForm(
    'links',
    reactive({
      collection: '',
      name: '',
      url: '',
      code: '',
      priority: 1,
      position: 0,
      is_active: true,
      files: [],
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
