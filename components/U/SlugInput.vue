<template>
  <UFormGroup
    label="Слаг"
    required
    description="Краткое имя страницы, используется в URL-адресе. Нужно для SEO"
    :error="props.error || error"
  >
    <UButtonGroup size="md" class="w-full" @dblclick="alertMsg">
      <UButton
        color="gray"
        icon="i-tdesign-arrow-left-right-1"
        title="Сгенерировать из названия"
        class="cursor-pointer"
        @click="() => generateFromRaw(true)"
        :disabled="disabled && !showAlert"
        :class="{ 'pointer-events-none': disabled && !showAlert }"
      />

      <UInput
        class="w-full"
        v-model="slug"
        @change="autoSlug = false"
        required
        :disabled="disabled && !showAlert"
        :class="{ 'pointer-events-none': disabled && !showAlert }"
      />
    </UButtonGroup>

    <template #help>
      <UButtonGroup v-if="slug" size="xs" class="w-full max-w-full">
        <UButton
          icon="i-gg-external"
          :to="urlBySlug"
          target="_blank"
          color="gray"
          variant="soft"
          truncate
          class="grow shrink-0 basis-0"
          :label="urlBySlug.replace(/^https?:\/\//, '')"
        />
        <UButton
          icon="i-heroicons-clipboard-document"
          color="gray"
          @click="copyWithNotify(urlBySlug)"
        />
      </UButtonGroup>
    </template>
  </UFormGroup>
</template>

<script setup>
  const props = defineProps({
    to: {
      type: String,
    },
    raw: {
      type: String,
    },
    error: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  })

  const error = ref('')

  const showAlert = ref(false)
  const alertMsg = () => {
    if (props.disabled) {
      showAlert.value = true
      error.value =
        'Редактирование поля в опубликованном контенте крайне не рекомендовано!'
    }
  }

  const modelValue = defineModel({
    type: String,
  })

  const urlBySlug = computed(() => {
    return externalUrl(`/${props.to}/${slug.value}`)
  })

  const autoSlug = ref(!modelValue.value)

  const slug = computed({
    get() {
      return modelValue.value
    },
    set(value) {
      modelValue.value = generateSlug(value || '')
    },
  })

  const generateFromRaw = (stopAuto = false) => {
    if (props.raw) {
      slug.value = props.raw.split(' ').splice(0, 7).join(' ')
    }
    if (stopAuto) {
      autoSlug.value = false
    }
  }
  watch(
    () => props.raw,
    () => {
      if (autoSlug.value) {
        generateFromRaw()
      }
    },
  )
</script>
