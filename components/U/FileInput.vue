<template>
  <div ref="wrapperRef" :class="{ 'opacity-70': disabled }">
    <draggable
      class="flex flex-wrap gap-2"
      :class="{ 'short-list': hiddenElements }"
      v-model="modelValue"
      @start="dragging = true"
      @end="dragging = false"
      item-key="key"
      :disabled="disabled"
    >
      <template #item="{ element, index }">
        <UFilePreview
          :file="element"
          :crop="crop"
          :remove="() => removeFile(index)"
          class="square preview"
        />
      </template>
      <template #footer>
        <UButton
          v-if="hiddenElements > 0"
          color="gray"
          @click="hiddenElements = 0"
          class="square show-more flex-col text-xl font-bold"
        >
          <span class="text-xs">и ещё</span>
          <span>+{{ hiddenElements }} </span>
        </UButton>
        <UButton
          as="label"
          color="gray"
          :icon="icon"
          class="square flex-grow-[2] outline-gray-500/50 -outline-offset-2 outline-dashed"
          :class="{
            'outline-gray-900 bg-primary text-black': isDraggedOver,
            'flex-grow': isRow,
            'pointer-events-none': disabled,
          }"
          @drop.prevent="handleDrop"
          @dragover.prevent="isDraggedOver = true"
          @dragleave="isDraggedOver = false"
        >
          <input
            class="hidden"
            type="file"
            ref="fileInputRef"
            :accept="accept"
            :multiple="multiple"
            @change="handleFileInput"
            :disabled="disabled"
          />
          <span class="mt-2 text-xs leading-none">
            Выберите
            <span v-if="multiple">файлы</span>
            <span v-else>файл</span>
          </span>
        </UButton>
      </template>
    </draggable>
  </div>
</template>

<script setup>
  import draggable from 'vuedraggable'

  const modelValue = defineModel({
    type: Array,
  })

  const { icon, accept, multiple, disabled, crop } = defineProps({
    icon: {
      type: String,
      default: 'i-ic-baseline-upload-file',
    },
    accept: {
      type: String,
      default: '*',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    crop: {
      type: Array,
      default: null,
    },
  })

  const wrapperRef = ref(null)
  const hiddenElements = ref(1)

  const fileInputRef = ref(null)
  const isDraggedOver = ref(false)
  const dragging = ref(false)

  const isRow = ref(false)

  watchEffect(() => {
    if (!modelValue.value) {
      modelValue.value = []
    } else {
      modelValue.value.forEach((i) => {
        if (i.key) {
          i.key = Math.random().toString(36)
        }
      })
    }

    if (!multiple && modelValue.value && modelValue.value.length > 1) {
      modelValue.value = modelValue.value.slice(-1)
    }
  })

  const handleDrop = (e) => {
    isDraggedOver.value = false
    const fileList = e.dataTransfer.files
    handleFiles(fileList)
  }

  const handleFileInput = () => {
    const fileList = fileInputRef.value.files
    handleFiles(fileList)
  }

  const handleFiles = async (fileList) => {
    Array.from(fileList).forEach(async (file) => {
      const item = {
        src: URL.createObjectURL(file),
        file: file,
        name: file.name,
        size: file.size,
        // properties: await getMediaInfo(file),
      }
      if (multiple) {
        modelValue.value.push(item)
      } else {
        modelValue.value = [item]
      }
      hiddenElements.value = 0
    })
  }

  const removeFile = (index) => {
    modelValue.value.splice(index, 1)
  }

  const setHiddenElements = () => {
    hiddenElements.value = Array.from(
      wrapperRef.value.querySelectorAll('.preview'),
    ).filter((element) => element.offsetParent === null).length
  }

  onMounted(() => {
    setHiddenElements()

    watchEffect(() => {
      if (disabled) {
        dragging.value = false
      }
    })
  })
</script>

<style lang="scss"></style>

<style lang="scss" scoped>
  $nth: 3;
  .short-list {
    .preview:nth-child(#{ $nth }) ~ .preview {
      display: none;
    }
  }
  .square {
    @apply relative h-28 cursor-pointer rounded-lg transition-all flex flex-col justify-center text-center overflow-hidden aspect-[1/1];
  }
  .preview {
    flex-grow: 0.2;
  }
  :deep(.square.aspect-video) {
    @apply aspect-[16/9];
    flex-grow: 0.5;
  }
</style>
