<template>
  <LayoutModal v-model="isOpen" :id="state.id">
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
            :disabled="!!state.id"
          />

          <!--  -->
          <!-- <UFormGroup
            label="Закреплено"
            description="Закреплённые категории отображаются в шапке сайта"
            :error="form.errors.is_pinned"
          >
            <UToggle v-model="state.is_pinned" />
          </UFormGroup> -->

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
              :crop="[160, 90]"
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
  const item = useCustomModal('categories').data

  const { form, state } = await useApiForm(
    'categories',
    reactive({
      title: '',
      slug: '',
      is_pinned: false,
      preview: [],
      description: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
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
