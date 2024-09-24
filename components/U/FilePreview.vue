<template>
  <transition>
    <NuxtLink
      :to="file.src"
      target="_blank"
      @mouseenter="videoPlay"
      @mouseleave="videoStop"
      class="file-preview"
      :data-id="file.id"
      :style="{
        aspectRatio: crop ? `${crop[0]}/${crop[1]}` : undefined,
      }"
      :class="{
        'aspect-video': type === 'video',
      }"
    >
      <component
        v-if="type === 'image' || type === 'video'"
        :is="type === 'video' ? 'video' : 'img'"
        :src="file.src"
        class="file-thumb absolute w-full h-full object-cover rounded-xl"
        ref="elementRef"
      ></component>
      <span class="file-info">
        <UBadge
          color="green"
          class="absolute bottom-1 scale-[60%] font-bold"
          v-if="isFile"
          label="NEW"
        />

        <UButton color="gray" size="xs" class="mt-2 pointer-events-none">
          <span class="font-bold uppercase">{{ fileExtension }}</span>
        </UButton>
        <span class="mt-2 text-xs font-bold">{{ formatBytes(file.size) }}</span>
      </span>
      <span class="top-row">
        <UButtonGroup size="xs" class="absolute top-0 right-0">
          <UButton
            v-if="crop && type === 'image'"
            icon="i-material-symbols-crop-rounded"
            color="gray"
            variant="ghost"
            @click.prevent="openModal('image_crop', { item: file, crop })"
          />
          <UButton
            icon="i-carbon-close"
            color="gray"
            variant="ghost"
            @click.prevent="remove"
          />
        </UButtonGroup>
        <UButton
          icon="i-ri-drag-move-fill"
          color="gray"
          variant="ghost"
          size="xs"
          class="absolute top-0 left-0"
          @click.prevent
        />
      </span>
    </NuxtLink>
  </transition>
</template>

<script setup>
  const { file, remove, crop } = defineProps({
    file: {
      type: Object,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    },
    crop: [Array, null],
  })

  const elementRef = ref(null)

  const type = computed(() => {
    if (['jpeg', 'jpg', 'png'].includes(fileExtension.value)) return 'image'
    if (['mp4', 'mov', 'mkv', 'avi'].includes(fileExtension.value))
      return 'video'
    return 'file'
  })

  const isFile = computed(() => file instanceof File)

  const fileExtension = computed(() => {
    return file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2)
  })

  const videoPlay = () => {
    if (type.value == 'video') {
      elementRef.value.play()
    }
  }

  const videoStop = () => {
    if (type.value == 'video') {
      elementRef.value.pause()
    }
  }
</script>

<style lang="scss" scoped>
  .file-preview {
    @apply relative shrink-0 ring-2 bg-gray-300 ring-gray-300 dark:ring-gray-600 dark:bg-gray-600;
    .top-row {
      @apply transition-opacity opacity-30;
    }
    &:hover {
      .file-thumb ~ .file-info {
        opacity: 0;
        pointer-events: none;
      }
      .top-row {
        opacity: 1;
      }
    }
    &.sortable-chosen {
      @apply ring-primary-500 bg-primary-500;
    }
  }
  .file-info {
    @apply absolute text-center inset-0 p-4 flex flex-col justify-center items-center bg-gray-200/90 dark:bg-gray-800/90 backdrop-blur-sm transition duration-300 rounded-lg;
  }
</style>
