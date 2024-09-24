<template>
  <LayoutModal
    v-model="isOpen"
    :id="state.id"
    :ui="{ overlay: { background: `bg-red-700/80` } }"
  >
    <template #default>
      <UForm :form="form">
        <div class="form-item">
          <!--  -->
          <UAlert
            color="red"
            title="Менять нижеуказанные настройки очень опасно!"
            icon="i-line-md-alert"
          >
            <template #title="{ title }">
              <span class="text-md" v-html="title"></span>
            </template>
          </UAlert>

          <!--  -->
          <UFormGroup label="Ключ" required :error="form.errors.key">
            <UInput v-model="state.key" required />
          </UFormGroup>

          <!--  -->
          <UFormGroup label="Тип" :error="form.errors.type" required>
            <USelect v-model="state.type" :options="types" required />
          </UFormGroup>

          <!--  -->
          <div class="grid grid-cols-2 gap-6">
            <UFormGroup label="Публичный" :error="form.errors.is_public">
              <UToggle v-model="state.is_public" />
            </UFormGroup>
            <UFormGroup label="Важный" :error="form.errors.is_important">
              <UToggle v-model="state.is_important" />
            </UFormGroup>
          </div>

          <!--  -->
          <UDivider label="Конфиг для панели" />

          <!--  -->
          <UFormGroup
            label="Заголовок"
            required
            :error="objKeysToStr(form.errors, 'config.title')"
          >
            <UInput v-model="state.config.title" required />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Описание"
            :error="objKeysToStr(form.errors, 'config.description')"
          >
            <UInput v-model="state.config.description" />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            label="Вкладка"
            required
            :error="objKeysToStr(form.errors, 'config.tab')"
          >
            <UInput
              v-model="state.config.tab"
              :options="meta.tabs"
              required
              list="tabs"
              name="tab"
            />
            <datalist id="tabs">
              <option v-for="item in meta.tabs" :value="item"></option>
            </datalist>
          </UFormGroup>

          <!--  -->
          <UFormGroup
            v-if="state.type == 'media'"
            label="Множественное"
            required
            :error="objKeysToStr(form.errors, 'config.multiple')"
          >
            <UToggle v-model="state.config.multiple" />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            v-if="['object', 'object_array'].includes(state.type)"
            label="Поля"
            :error="objKeysToStr(form.errors, 'config.fields')"
          >
            <UArray
              v-model="state.config.fields"
              :config="objectFieldsConfig"
              type="object_array"
            />
          </UFormGroup>

          <!--  -->
          <UFormGroup
            v-if="state.type == 'select'"
            label="Поля"
            :error="objKeysToStr(form.errors, 'fields.options')"
          >
            <UArray v-model="state.config.options" type="array" />
          </UFormGroup>

          <!--  -->
          <div class="grid grid-cols-2 gap-6">
            <!--  -->
            <UFormGroup
              v-if="state.id"
              label="Позиция"
              :error="form.errors.position"
            >
              <UInput v-model="state.position" type="number" min="0" />
            </UFormGroup>

            <!--  -->
            <UFormGroup
              label="Очистить перед сохранением"
              :error="form.errors.clear_value"
            >
              <UToggle v-model="state.clear_value" size="xl" />
            </UFormGroup>
          </div>
        </div>
      </UForm>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()
  const data = useCustomModal('props').data

  const meta = data.meta
  const item = JSON.parse(JSON.stringify(data.item))

  const types = Object.entries(meta.types).map(([key, label]) => ({
    value: key,
    label: label,
  }))

  const objectFieldsConfig = {
    fields: [
      {
        key: 'key',
        title: 'Ключ',
        type: 'string',
      },
      {
        key: 'type',
        title: 'Тип',
        type: 'select',
        options: types.filter((i) =>
          ['string', 'number', 'date', 'text', 'boolean', 'select'].includes(
            i.value,
          ),
        ),
      },
      {
        key: 'title',
        title: 'Заголовок',
        type: 'string',
      },
      {
        key: 'options',
        title: 'Опции (если тип "select")',
        type: 'array',
        clause: (item) => {
          if (item && item.type == 'select') {
            item.options = item.options || []
            return true
          } else {
            delete item.options
            return false
          }
        },
      },
    ],
  }

  const { form, state } = await useApiForm(
    'props',
    reactive({
      config: {},
      clear_value: false,
      ...item,
    }),
    {
      redirectAfterCreate: false,
      onSuccess: () => {
        isOpen.value = false
      },
    },
  )

  watch(
    () => state.key,
    (val) => {
      state.key = generateSlug(val, {
        replacement: '_',
        lower: false,
      })
    },
  )

  watch(
    () => state.type,
    (val, oldVal) => {
      if (val == oldVal || !oldVal) {
        return
      }
      if (val != 'media') {
        delete state.config.multiple
      }
      if (['object', 'object_array'].includes(val)) {
        if (!state.config.fields) {
          state.config.fields = []
        }
      } else {
        delete state.config.fields
      }
      if (val == 'select') {
        state.config.options = []
      } else {
        delete state.config.options
      }
      if (val == 'media') {
        state.config.multiple = !!state.config.multiple
      }
    },
    { immediate: true },
  )

  form.showRemove = computed(() => !item.is_important && item.id)
</script>
