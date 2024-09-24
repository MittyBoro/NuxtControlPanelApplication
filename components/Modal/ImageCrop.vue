<template>
  <LayoutModal v-model="isOpen">
    <template #title>Обрезать изображение</template>
    <template #default>
      <div class="content">
        <section class="cropper-area">
          <div class="img-cropper">
            <VueCropper
              ref="cropperRef"
              class="field-file__cropper"
              :movable="false"
              :aspect-ratio="crop[0] / crop[1]"
              :rotatable="true"
              :zoomable="false"
              :src="imgSrc"
              @crop="cropEvent"
              preview=".field-file__preview"
            />
          </div>
        </section>
        <section class="preview-area">
          <div class="field-file__preview"></div>
          <div class="cropped-image">
            <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
            <div v-else class="crop-placeholder" />
          </div>
        </section>
      </div>
    </template>
    <template #footer>
      <UButton label="Изменить" @click="updateImage()" :loading="loading" />
    </template>
  </LayoutModal>
</template>

<script setup>
  import VueCropper from 'vue-cropperjs'
  import 'cropperjs/dist/cropper.css'

  const isOpen = defineModel()
  const cropperRef = ref(null)

  const { crop, item } = useCustomModal('image_crop').data

  const loading = ref(false)

  const imgSrc = computed(() => item.src)

  const cropImg = ref(null)

  const cropEvent = (event) => {
    if (!cropperRef.value) return
    var width = Math.round(event.detail.width)
    var height = Math.round(event.detail.height)

    if (width < crop[0] || height < crop[1]) {
      cropperRef.value.setData({
        width: Math.max(crop[0], width),
        height: Math.max(crop[1], height),
      })
    }
  }

  const updateImage = () => {
    loading.value = true
    item.file = cropperRef.value.getCroppedCanvas().toBlob((blob) => {
      item.src = URL.createObjectURL(blob)
      item.file = new File([blob], 'avatar.jpg', { type: 'image/jpg' })
      item.size = blob.size

      loading.value = false
      isOpen.value = false
    })
  }
</script>
