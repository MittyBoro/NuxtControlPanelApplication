<template>
  <UForm :form="form">
    <UTabs v-model="currentTab" :items="items" class="w-full">
      <template #default="{ item }">
        <UTabsItem :item="item" />
      </template>
      <template #main>
        <div class="tab-wrapper">
          <PageMask class="col-span-full" />
          <UCard class="col-span-2">
            <div class="form-item">
              <!--  -->
              <UFormGroup
                label="Заголовок"
                hint="<h1>"
                required
                :error="form.errors.title"
              >
                <UInput v-model="state.title" required />
              </UFormGroup>

              <!--  -->
              <UFormGroup
                label="Слаг"
                help="Изменение этого поля может привести к поломке сайта"
                required
                :error="form.errors.slug"
                @dblclick="disabledSlug = false"
                :class="{ 'cursor-pointer': disabledSlug }"
              >
                <UInput
                  v-model="state.slug"
                  :error="form.errors.slug"
                  :disabled="disabledSlug"
                  :class="{ 'pointer-events-none': disabledSlug }"
                />
              </UFormGroup>

              <!--  -->
              <UFormGroup
                label="Описание"
                description="Выводится внизу страницы"
                required
                :error="form.errors.description"
              >
                <UTextEditor v-model="state.description" />
              </UFormGroup>
            </div>
          </UCard>

          <!--  -->
          <UCard>
            <div class="form-item">
              <!--  -->
              <UFormGroup
                label="Название"
                description="Видно только в админке"
                required
                :error="form.errors.name"
              >
                <UInput v-model="state.name" required />
              </UFormGroup>

              <div class="grid grid-cols-2 gap-[inherit]">
                <!--  -->
                <UFormGroup
                  label="Для авторизованных"
                  :error="form.errors.is_auth"
                >
                  <UToggle color="green" v-model="state.is_auth" />
                </UFormGroup>

                <!--  -->
                <UFormGroup label="Индексировать" :error="form.errors.is_index">
                  <UToggle color="blue" v-model="state.is_index" />
                </UFormGroup>

                <!--  -->
                <UFormGroup
                  label="Только для премиум"
                  :error="form.errors.is_premium"
                >
                  <UToggle color="primary" v-model="state.is_premium" />
                </UFormGroup>
              </div>
            </div>
          </UCard>
        </div>
      </template>

      <template #seo>
        <div class="tab-wrapper">
          <PageMask class="col-span-2" />
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
    'pages',
    {
      is_index: true,
    },
    {
      loadByRoute: true,
    },
  )

  const disabledSlug = ref(!!state.id)

  const currentTab = useTabs('pages-tab')
  const items = [
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
