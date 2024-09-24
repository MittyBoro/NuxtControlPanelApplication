<template>
  <LayoutModal v-model="isOpen" :id="state.id" :preventClose="preventClose">
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <UFormGroup label="Название" required :error="form.errors.title">
            <UInput v-model="state.title" required />
          </UFormGroup>
          <USlugInput
            v-model="state.slug"
            :raw="state.title"
            to="categories"
            :error="form.errors.slug"
            :disabled="state.is_published"
          />

          <!--  -->
          <UFormGroup label="Опубликовано" :error="form.errors.is_published">
            <UToggle color="green" v-model="state.is_published" />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Превью"
            description="Для закреплённых категорий в разделе «категории»"
            :error="objKeysToStr(form.errors, 'preview')"
          >
            <UFileInput
              icon="i-material-symbols-add-photo-alternate-outline-rounded"
              v-model="state.preview"
              accept="image/*"
              :crop="[600, 450]"
            />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="Описание" :error="form.errors.description">
            <UTextEditor v-model="state.description" mini />
          </UFormGroup>

          <UDivider label="SEO" />

          <!--  -->
          <USeoFields v-model="state" :errors="form.errors" />
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const modalList = useCustomModalList()
  const preventClose = computed(() => !!modalList.value['image_crop'])

  const item = useCustomModal('studios').data

  const { form, state } = await useApiForm(
    'studios',
    reactive({
      title: '',
      slug: '',
      preview: [],
      description: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      is_published: false,
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
