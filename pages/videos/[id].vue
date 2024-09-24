<template>
  <UForm :form="form">
    <transition>
      <UAlert
        v-if="isRendering"
        icon="i-eos-icons-bubble-loading"
        title="Видеофайл находится в процессе обработки. Воздержитесь от сохранения данной страницы!"
        color="primary"
        class="mb-4 text-black"
      />
    </transition>

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
                to="videos"
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
              <div class="grid grid-cols-3 gap-6">
                <!--  -->
                <UFormGroup label="Опубл." :error="form.errors.is_published">
                  <UToggle color="green" v-model="state.is_published" />
                </UFormGroup>

                <!--  -->
                <UFormGroup label="Премиум" :error="form.errors.is_premium">
                  <UToggle color="primary" v-model="state.is_premium" />
                </UFormGroup>

                <!--  -->
                <UFormGroup label="RU озвучка" :error="form.errors.is_ru_voice">
                  <UToggle color="blue" v-model="state.is_ru_voice" />
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

      <template #video>
        <div class="tab-wrapper">
          <UCard class="col-span-2 max-lg:order-2">
            <div class="form-item">
              <!--  -->
              <UFormGroup label="Видеофайл" required :error="form.errors.movie">
                <UAlert
                  v-if="state.movie.length"
                  icon="i-mdi-movie-open-outline"
                  title=""
                >
                  <template #title>
                    <div class="flex justify-between gap-2">
                      <NuxtLink
                        :to="state.movie[0].src"
                        target="_blank"
                        class="link"
                      >
                        {{ state.movie[0].name }}
                        <UIcon name="i-mdi-open-in-new" />
                      </NuxtLink>

                      <UButton
                        v-if="!isRendering"
                        color="red"
                        variant="soft"
                        size="xs"
                        label="Удалить"
                        @click="deleteMovie"
                      />
                    </div>
                  </template>
                  <template #description>
                    <p class="text-xs font-semibold text-gray-500">
                      {{ formatBytes(state.movie[0].size) }}
                    </p>
                    <p v-if="!isRendering" class="mt-2 text-xs text-gray-500">
                      После генерации всех файлов и проверки данных оригинал
                      можно удалить вручную
                    </p>
                  </template>
                </UAlert>
                <UAlert
                  v-else
                  icon="i-material-symbols-info-outline-rounded"
                  title="Перед загрузкой все изменения буду сохранены"
                ></UAlert>

                <div class="mt-4 flex flex-wrap gap-2">
                  <UButton
                    icon="i-ic-baseline-cloud-upload"
                    @click="openUploadModal"
                    :disabled="isRendering"
                    label="Загрузить новый видеофайл"
                  />
                </div>
              </UFormGroup>

              <!--  -->
              <UDivider />

              <!--  -->
              <VideoFiles :state="state" />

              <!--  -->
              <UDivider />

              <!--  -->
              <UAlert
                title="Следующие параметры генерируются автоматически, но можно загрузить вручную"
                class="mb-2"
              />

              <!--  -->
              <UFormGroup
                label="Превью"
                :error="objKeysToStr(form.errors, 'preview')"
              >
                <UFileInput
                  icon="i-material-symbols-add-photo-alternate-outline-rounded"
                  v-model="state.preview"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/heic"
                  :disabled="isRendering"
                  :crop="[640, 360]"
                />
              </UFormGroup>

              <!--  -->
              <UFormGroup
                label="Скриншоты"
                :error="objKeysToStr(form.errors, 'screenshots')"
              >
                <UFileInput
                  v-model="state.screenshots"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/heic"
                  multiple
                  :disabled="isRendering"
                  :crop="[640, 360]"
                />
              </UFormGroup>

              <!--  -->
              <UFormGroup
                label="Трейлер"
                :error="objKeysToStr(form.errors, 'trailer')"
              >
                <UFileInput
                  icon="i-material-symbols-video-call-outline-rounded"
                  v-model="state.trailer"
                  accept="video/*"
                  :disabled="isRendering"
                />
              </UFormGroup>
            </div>
          </UCard>

          <UCard class="col-span-1" v-if="state.tasks">
            <VideoTasks
              :state="state"
              :form="form"
              :isRendering="isRendering"
            />
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
      <template #charts>
        <div class="tab-wrapper">
          <UCard class="col-span-full">
            <ChartVideo :id="state.id" />
          </UCard>
        </div>
      </template>
    </UTabs>
  </UForm>
</template>

<script setup>
  const { form, state } = await useApiForm(
    'videos',
    {
      actors: [],
      categories: [],
      studios: [],
      movie: [],
      preview: [],
      trailer: [],
      screenshots: [],
      thumbnails: [],
      resizes: [],
    },
    {
      loadByRoute: true,
    },
  )

  const currentTab = useTabs('video-tab')
  const tabs = [
    {
      slot: 'main',
      label: 'Основное',
      icon: 'i-material-symbols-info-outline-rounded',
    },
    {
      slot: 'video',
      label: 'Видео',
      icon: 'i-material-symbols-smart-display-outline-rounded',
    },
    {
      slot: 'seo',
      label: 'SEO',
      icon: 'i-material-symbols-find-in-page-outline-rounded',
    },
    {
      slot: 'charts',
      label: 'Статистика',
      icon: 'i-material-symbols-insert-chart-outline-rounded',
    },
  ]

  const openUploadModal = async () => {
    await form.submit()
    openModal('video_upload', form, form.refresh)
  }

  const deleteMovie = () => {
    state.movie = []
    form.submit()
  }

  const catList = listForSelect(
    await useApiList('categories', { all: 1 }, { lazy: false }),
  )
  const actorList = listForSelect(
    await useApiList('actors', { all: 1 }, { lazy: false }),
  )
  const studioList = listForSelect(
    await useApiList('studios', { all: 1 }, { lazy: false }),
  )

  const isRendering = computed(() => {
    let isRendering = false
    state.tasks?.forEach((task) => {
      if (['queued', 'rendering'].includes(task.status)) {
        isRendering = true
      }
    })
    form.disabled = isRendering
    return isRendering
  })

  window.Echo.private(`videos.${state.id}`).listen(
    '.task_updated',
    ({ task }) => {
      const stateTask = state.tasks.find((t) => t.id === task.id)
      if (stateTask) {
        Object.assign(stateTask, task)
      }
      form.isDirty = false
    },
  )
  window.Echo.private(`videos.${state.id}`).listen(
    '.task_process_updated',
    ({ video }) => {
      Object.assign(state, video)
      setTimeout(() => {
        form.isDirty = false
      }, 13)
    },
  )
</script>
