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
              <UFormGroup label="Название" :error="form.errors.title" required>
                <UInput v-model="state.title" required />
              </UFormGroup>

              <!--  -->
              <USlugInput
                v-model="state.slug"
                :raw="state.title"
                :error="form.errors.slug"
                to="albums"
                :disabled="state.is_published"
              />

              <!--  -->
              <UFormGroup
                label="Описание"
                required
                :error="form.errors.description"
              >
                <UTextEditor v-model="state.description" />
              </UFormGroup>
            </div>
          </UCard>
          <UCard>
            <div class="form-item">
              <div class="grid grid-cols-2 gap-6">
                <!--  -->
                <UFormGroup label="Опубл." :error="form.errors.is_published">
                  <UToggle color="green" v-model="state.is_published" />
                </UFormGroup>

                <!--  -->
                <UFormGroup label="Премиум" :error="form.errors.is_premium">
                  <UToggle color="primary" v-model="state.is_premium" />
                </UFormGroup>
              </div>

              <!--  -->
              <UFormGroup
                label="Дата публикации"
                :error="form.errors.published_at"
              >
                <UInputDate
                  v-model="state.published_at"
                  type="datetime-local"
                />
              </UFormGroup>

              <!--  -->
              <USelectBadge
                label="Категории"
                v-model="state.categories"
                :options="catList"
                :error="form.errors.categories"
              />

              <!--  -->
              <USelectBadge
                label="Актёры"
                v-model="state.actors"
                :options="actorList"
                :error="form.errors.actors"
              />

              <!--  -->
              <USelectBadge
                label="Студии"
                v-model="state.studios"
                :options="studioList"
                :error="form.errors.studios"
              />
            </div>
          </UCard>
        </div>
      </template>

      <template #album>
        <div class="tab-wrapper">
          <UCard class="col-span-2">
            <div class="form-item">
              <!--  -->
              <UFormGroup
                label="Превью"
                :error="objKeysToStr(form.errors, 'preview')"
              >
                <UFileInput
                  icon="i-material-symbols-add-photo-alternate-outline-rounded"
                  v-model="state.preview"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/heic"
                />
              </UFormGroup>

              <!--  -->
              <UFormGroup
                label="Галерея"
                :error="objKeysToStr(form.errors, 'gallery')"
              >
                <UFileInput
                  v-model="state.gallery"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/heic"
                  multiple
                />
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
            </div>
          </UCard>
        </div>
      </template>
    </UTabs>
  </UForm>
</template>

<script setup>
  const { form, state } = await useApiForm(
    'albums',
    {
      is_published: false,
      actors: [],
      categories: [],
      studios: [],
      preview: [],
      gallery: [],
    },
    {
      loadByRoute: true,
    },
  )

  const currentTab = useTabs('album-tab')
  const tabs = [
    {
      slot: 'main',
      label: 'Основное',
      icon: 'i-material-symbols-info-outline-rounded',
    },
    {
      slot: 'album',
      label: 'Фото',
      icon: 'i-material-symbols-add-photo-alternate-outline-rounded',
    },
    {
      slot: 'seo',
      label: 'SEO',
      icon: 'i-material-symbols-find-in-page-outline-rounded',
    },
  ]

  const catList = listForSelect(
    await useApiList('categories', { all: 1 }, { lazy: false }),
  )
  const actorList = listForSelect(
    await useApiList('actors', { all: 1 }, { lazy: false }),
  )
  const studioList = listForSelect(
    await useApiList('studios', { all: 1 }, { lazy: false }),
  )
</script>
