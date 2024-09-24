<template>
  <LayoutModal v-model="isOpen">
    <template #title>Загрузка нового видео</template>

    <template #default>
      <component
        class="relative flex flex-col items-center justify-center w-full h-52 outline-4 outline-dashed outline-gray-400 rounded-xl transition-all duration-300 overflow-hidden"
        :class="{
          'text-black bg-primary-500 outline-gray-950': isDraggedOver,
          'cursor-pointer': !file,
          'bg-animated outline-transparent shadow-lg shadow-black/10 scale-[1.02]':
            progress.loading,
        }"
        :is="file ? 'div' : 'label'"
        @dragover="handleDragOver"
        @drop="handleDrop"
        @dragleave="isDraggedOver = false"
      >
        <input
          type="file"
          ref="fileInput"
          @change="handleFileInput"
          accept="video/*,.mkv"
          class="hidden"
        />
        <div class="p-6 flex flex-col items-center">
          <div class="text-6xl">
            <UIcon
              v-if="progress.loading"
              name="i-line-md-cloud-upload-outline-loop"
              class="text-primary-500"
            />
            <UIcon
              v-else
              name="i-uil-cloud-upload"
              :class="file ? 'text-green-500' : 'opacity-80'"
            />
          </div>
          <div class="text-sm font-bold text-center w-full">
            <template v-if="progress.loading">
              <span v-if="progress.total == progress.loaded">
                Сохранение файла...
              </span>
              <span v-else>Загрузка {{ progress.percent }}%</span>
            </template>
            <template v-else>
              <div v-if="file">
                <p>Готово к загрузке</p>
                <p>
                  {{ formatBytes(file.size) }},
                  {{ videoResolution }}
                </p>
              </div>
              <div v-else>
                <p>Перетащите файл</p>
                <p>или кликните здесь для загрузки</p>
              </div>
            </template>
          </div>
        </div>
        <div
          class="absolute bottom-0 -inset-x-1 transition duration-500"
          :class="{ 'opacity-0': !progress.loading }"
        >
          <div class="px-4 pb-2 flex text-xs font-bold justify-between">
            <span>
              {{ formatBytes(progress.loaded) }} из
              {{ formatBytes(progress.total) }}
              <span v-if="progress.rate">
                | {{ formatBytes(progress.rate) }}/s
              </span>
            </span>
            <span class="text-right">
              <span>
                осталось ≈ {{ accurateCountdown(progress.estimated) }}
              </span>
            </span>
          </div>
          <UProgress :value="progress.percent" class="rounded-0" />
        </div>
      </component>
    </template>

    <template #footer>
      <div class="flex gap-2 justify-center transition">
        <UButton
          :loading="progress.loading"
          icon="i-uil-cloud-upload"
          :color="!file || progress.loading ? 'gray' : 'primary'"
          @click="uploadFile"
          :disabled="!file"
        >
          <span v-if="!progress.loading">Загрузить на сервер</span>
          <span v-else>Загрузка на сервер</span>
        </UButton>
        <UButton
          icon="i-ci-close-small"
          color="gray"
          variant="soft"
          square
          @click="() => clearAll()"
          class="cursor-pointer"
          :disabled="!file"
        />
      </div>
    </template>
  </LayoutModal>
</template>

<script setup>
  const isOpen = defineModel()

  const { $axios } = useNuxtApp()
  const axiosController = ref(new AbortController())

  const form = useCustomModal('video_upload').data

  const file = ref(null)
  const fileInput = ref(null)
  const isDraggedOver = ref(false)
  const videoResolution = ref(null)

  const progress = reactive({
    loading: false,
    percent: 0,
    loaded: 0,
    total: 1,
  })

  const clearAll = (showConfirm = true) => {
    const isConfirm = showConfirm ? confirm('Вы уверены?') : true
    if (isConfirm) {
      file.value = null
      axiosController.value.abort()
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    isDraggedOver.value = true
  }

  const handleDrop = (e) => {
    e.preventDefault()
    isDraggedOver.value = false
    const fileList = e.dataTransfer.files
    handleFile(fileList[0])
  }

  const handleFileInput = () => {
    const fileList = fileInput.value.files
    handleFile(fileList[0])
  }

  const handleFile = async (newFile) => {
    if (validateFile(newFile)) {
      file.value = newFile
      const mediaInfo = await getMediaInfo(newFile)
      videoResolution.value = `${mediaInfo.width}x${mediaInfo.height}px`
    }
  }

  const validateFile = (file) => {
    if (!file) return false
    if (!file.type.startsWith('video/')) {
      notify.alert('Выберите видеофайл')
      return false
    }
    return true
  }

  const uploadFile = async () => {
    const formData = form.getFormData()
    for (let pair of formData.entries()) {
      if (pair[0].startsWith('movie')) {
        formData.delete(pair[0])
      }
    }

    formData.append('movie[][file]', file.value)
    formData.append('_method', 'PUT')

    axiosController.value = new AbortController()
    progress.loading = true

    preventCloseWindow(true)
    notify.clear()

    try {
      const { data, error } = await $axios(form.path, {
        method: 'POST',
        data: formData,
        signal: axiosController.value.signal,

        onUploadProgress: (progressEvent) => {
          progress.percent = Math.round(progressEvent.progress * 1000) / 10
          progress.loaded = progressEvent.loaded
          progress.total = progressEvent.total
          progress.estimated = progressEvent.estimated
          progress.rate = !progress.loaded ? 0 : progressEvent.rate
        },
      })
      if (error) {
        throw new Error(error)
      }
      if (!data.data) {
        throw new Error('Не удалось загрузить видео')
      }

      notify.success('Видеофайл загружен на сервер и принят в обработку', {
        timeout: 10000,
      })

      setTimeout(() => {
        isOpen.value = false
      }, 200)
    } catch (error) {
      console.error(error)

      let timeout = 0
      if (error.message === 'canceled') {
        error.message = 'Загрузка отменена пользователем'
        timeout = 3000
      }
      notify.alert(error.message, {
        timeout: timeout,
      })
    }
    setTimeout(() => {
      progress.loading = false
      progress.percent = 0
      progress.loaded = 0
      progress.total = 0
      formData.delete('movie[999][file]')
    }, 200)
    preventCloseWindow(false)
  }
  onBeforeUnmount(() => {
    clearAll(false)
  })
</script>

<style lang="scss" scoped>
  .bg-animated {
    background: linear-gradient(
      90deg,
      rgba(var(--color-gray-500) / 0.1),
      rgba(var(--color-gray-500) / 0.05),
      rgba(var(--color-gray-500) / 0.1),
      rgba(var(--color-gray-500) / 0.05),
      rgba(var(--color-gray-500) / 0.1),
      rgba(var(--color-gray-500) / 0.05),
      rgba(var(--color-gray-500) / 0.1)
    );
    animation: bgMoving 1.5s linear infinite;
    background-size: 200% auto;
  }

  @keyframes bgMoving {
    0% {
      background-position-x: 100%;
    }
    100% {
      background-position-x: -100%;
    }
  }
</style>
