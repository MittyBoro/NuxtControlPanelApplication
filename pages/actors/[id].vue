<template>
  <UForm :form="form">
    <UTabs v-model="currentTab" :items="items" class="w-full">
      <template #default="{ item }">
        <UTabsItem :item="item" />
      </template>
      <template #main>
        <div class="tab-wrapper">
          <UCard class="col-span-2">
            <div class="form-item">
              <!--  -->
              <UFormGroup label="Имя" required :error="form.errors.name">
                <UInput v-model="state.name" required />
              </UFormGroup>

              <!--  -->
              <USlugInput
                v-model="state.slug"
                :raw="state.name"
                :error="form.errors.slug"
                to="actors"
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

              <!--  -->
              <UDivider icon="i-ion-md-images" />

              <!--  -->
              <UFormGroup
                label="Фотография"
                :error="objKeysToStr(form.errors, 'photo')"
              >
                <template #description>
                  Будет использоваться для превью в списке и в аватаре
                  <br />
                  Рекомендуемое соотношение сторон 1:1 и размер от 600x600
                </template>
                <UFileInput
                  icon="i-material-symbols-add-photo-alternate-outline-rounded"
                  v-model="state.photo"
                  accept="image/*"
                  :crop="[600, 600]"
                />
              </UFormGroup>

              <!--  -->
              <UFormGroup
                label="Обложка"
                :error="objKeysToStr(form.errors, 'cover')"
              >
                <template #description>
                  Будет использоваться на странице модели
                  <br />
                  Рекомендуемое соотношение сторон 5:1 и размер от 1500x300
                </template>
                <UFileInput
                  icon="i-material-symbols-add-photo-alternate-outline-rounded"
                  v-model="state.cover"
                  accept="image/*"
                  :crop="[1500, 300]"
                />
              </UFormGroup>
            </div>
          </UCard>
          <UCard>
            <div class="form-item sm:grid-cols-2">
              <!--  -->
              <UFormGroup
                label="Опубликовано"
                :error="form.errors.is_published"
              >
                <UToggle color="green" v-model="state.is_published" />
              </UFormGroup>

              <!--  -->
              <UFormGroup
                label="Страна"
                class="col-span-full"
                :error="form.errors.country"
              >
                <UCountrySelect v-model="state.country" />
              </UFormGroup>
              <!--  -->
              <UFormGroup
                label="Город"
                class="col-span-full"
                :error="form.errors.city"
              >
                <UInput v-model="state.city" name="city" />
              </UFormGroup>

              <!--  -->
              <UFormGroup
                class="col-span-full"
                label="Дата рождения"
                :error="form.errors.birthday"
              >
                <UInputDate v-model="state.birthday" type="date" />
              </UFormGroup>

              <!--  -->
              <UFormGroup label="Рост, см" :error="form.errors.height">
                <UInput
                  v-model="state.height"
                  type="number"
                  min="0"
                  name="height"
                />
              </UFormGroup>
              <!--  -->
              <UFormGroup label="Вес, кг" :error="form.errors.weight">
                <UInput
                  v-model="state.weight"
                  type="number"
                  min="0"
                  name="weight"
                />
              </UFormGroup>

              <!--  -->
              <UFormGroup label="Пол" :error="form.errors.gender">
                <USelect v-model="state.gender" :options="genders" />
              </UFormGroup>

              <!--  -->
              <UFormGroup label="Ориентация" :error="form.errors.orientation">
                <USelect v-model="state.orientation" :options="orientations" />
              </UFormGroup>

              <!--  -->
              <UFormGroup label="Цвет волос" :error="form.errors.hair_color">
                <USelect v-model="state.hair_color" :options="hairColors" />
              </UFormGroup>

              <!--  -->
              <UFormGroup label="Этничность" :error="form.errors.ethnicity">
                <USelect v-model="state.ethnicity" :options="ethnicities" />
              </UFormGroup>
              <!--  -->
              <UFormGroup
                label="Семейное положение"
                :error="form.errors.relation_status"
              >
                <USelect
                  v-model="state.relation_status"
                  :options="relationStatuses"
                />
              </UFormGroup>
              <!--  -->
              <UFormGroup label="Цвет глаз" :error="form.errors.eye_color">
                <USelect v-model="state.eye_color" :options="eyeColors" />
              </UFormGroup>

              <!--  -->
              <UFormGroup
                v-show="state.gender !== 'male'"
                label="Размер груди"
                :error="form.errors.boob_size"
              >
                <USelect v-model="state.boob_size" :options="boobSizes" />
              </UFormGroup>
              <!--  -->
              <UFormGroup
                v-show="state.gender !== 'male'"
                label="Искусственная грудь"
                :error="form.errors.fake_boobs"
              >
                <USelect v-model="state.fake_boobs" :options="yesOrNo" />
              </UFormGroup>

              <!--  -->
              <UFormGroup label="Тату" :error="form.errors.tattoos">
                <USelect v-model="state.tattoos" :options="yesOrNo" />
              </UFormGroup>

              <!--  -->
              <UFormGroup label="Пирсинг" :error="form.errors.piercings">
                <USelect v-model="state.piercings" :options="yesOrNo" />
              </UFormGroup>

              <!--  -->
              <USelectBadge
                class="col-span-full"
                label="Особенности"
                v-model="state.features"
                :options="features"
                :error="form.errors.features"
              />

              <!--  -->
              <UFormGroup
                label="Ссылки на соц.сети"
                :error="objKeysToStr(form.errors, 'links')"
                class="col-span-full whitespace-pre-line"
              >
                <UTextarea v-model="socialLinks" autoresize />
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
    'actors',
    {
      is_published: false,
      photo: [],
      cover: [],
      features: [],
    },
    {
      loadByRoute: true,
    },
  )

  const currentTab = useTabs('actor-tab')
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

  const genders = listWithTranslate(form.meta.genders, true)
  const relationStatuses = listWithTranslate(form.meta.relation_statuses, true)
  const orientations = listWithTranslate(form.meta.orientations, true)
  const ethnicities = listWithTranslate(form.meta.ethnicities, true)
  const hairColors = listWithTranslate(form.meta.hair_colors, true)
  const eyeColors = listWithTranslate(form.meta.eye_colors, true)
  const boobSizes = listWithTranslate(form.meta.boob_sizes, true)
  const features = listWithTranslate(form.meta.features, false)

  const yesOrNo = listWithTranslate(['yes', 'no'], true)

  const socialLinks = computed({
    get: () => {
      return !state.links
        ? ''
        : state.links
            .filter((x) => x)
            .map((x) => x.trim())
            .join('\n')
    },
    set: (val) => {
      val = val.trim()
      state.links = val.split('\n').map((x) => x.trim())
    },
  })
</script>
