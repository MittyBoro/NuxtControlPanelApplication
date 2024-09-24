<template>
  <img
    v-bind="attrs"
    ref="imageRef"
    :style="style"
    loading="lazy"
    class="transition duration-alt"
  />
</template>

<script setup>
  defineOptions({
    inheritAttrs: false,
  })

  const attrs = useAttrs()

  const imageRef = ref(null)
  const style = reactive({
    opacity: 0,
  })

  const setImageLoaded = () => {
    delete style.opacity
  }

  onMounted(() => {
    if (imageRef.value.complete === false) {
      imageRef.value.onload = setImageLoaded
    } else {
      setImageLoaded()
    }
  })
</script>

<style lang="scss" scoped></style>
