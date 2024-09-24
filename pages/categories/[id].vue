<template>
  <UForm :form="form">
    <UTabs v-model="currentTab" :items="tabs" class="w-full">
      <template #default="{ item }">
        <UTabsItem :item="item" />
      </template>

      <template #main>
        <div class="tab-wrapper">
          <UCard class="col-span-2">
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
                <UTextEditor v-model="state.description" />
              </UFormGroup>
            </div>
          </UCard>
        </div>
      </template>

      <template #seo>
        <div class="tab-wrapper">
          <UCard class="col-span-2">
            <div class="form-item">
              <!--  -->
              <USeoFields v-model="state" :errors="form.errors" />

              <!--  -->
              <UFormGroup
                label="Тег <h1>"
                required
                :hint="'Символов: ' + String(state.h1?.length || 0)"
                :error="form.errors?.h1"
              >
                <UInput v-model="state.h1" />
              </UFormGroup>
            </div>
          </UCard>
        </div>
      </template>
    </UTabs>
  </UForm>
</template>

<script setup>
  const { form, state } = await useApiForm(
    'categories',
    {
      title: '',
      slug: '',
      is_pinned: false,
      preview: [],
      description: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      h1: '',
    },
    {
      loadByRoute: true,
    },
  )

  const currentTab = useTabs('category-tab')
  const tabs = [
    {
      slot: 'main',
      label: 'Основное',
      icon: 'i-material-symbols-info-outline-rounded',
    },
    {
      slot: 'seo',
      label: 'SEO',
      icon: 'i-material-symbols-find-in-page-outline-rounded',
    },
  ]
</script>
