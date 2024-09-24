<template>
  <LayoutModal v-model="isOpen" :id="state.id">
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <UFormGroup
            label="Название"
            hint="<h1>"
            required
            :error="form.errors.title"
          >
            <UInput v-model="state.title" required />
          </UFormGroup>
          <USlugInput
            v-model="state.slug"
            :raw="state.title"
            to="tags"
            :error="form.errors.slug"
            :disabled="state.id"
          />

          <!--  -->
          <USeoFields v-model="state" :errors="form.errors" />

          <!--  -->
          <UFormGroup label="Описание" :error="form.errors.description">
            <UTextEditor v-model="state.description" mini />
          </UFormGroup>
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const item = useCustomModal('tags').data

  const { form, state } = await useApiForm(
    'tags',
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
