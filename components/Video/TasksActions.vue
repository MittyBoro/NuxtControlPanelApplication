<template>
  <div
    v-if="state?.movie?.length || state?.resizes?.length"
    :class="{
      'opacity-50 cursor-not-allowed pointer-events-none':
        form.pending || !state.id,
    }"
  >
    <div class="grid grid-cols-2 gap-2" size="xs">
      <template v-if="!isRendering">
        <UButton
          v-if="state.movie?.length"
          color="gray"
          variant="outline"
          label="Сгенерировать основное"
          size="sm"
          block
          class="col-span-full"
          @click="sendTasks('default')"
        />
        <UButton
          color="gray"
          label="Превью"
          size="xs"
          block
          @click="sendTasks('preview')"
        />
        <UButton
          color="gray"
          label="Скриншоты"
          size="xs"
          block
          @click="sendTasks('screenshots')"
        />
        <UButton
          color="gray"
          label="Трейлер"
          size="xs"
          block
          @click="sendTasks('trailer')"
        />
        <UButton
          color="gray"
          label="Миниатюры"
          size="xs"
          block
          @click="sendTasks('thumbnails')"
        />
        <template v-if="state.movie?.length">
          <UButtonGroup size="xs" class="col-span-full">
            <template v-for="q in qualities" :key="q">
              <UButton
                v-if="q <= state.quality"
                color="gray"
                :label="q"
                @click="sendTasks('resize', q)"
                block
                class="w-auto flex-1"
              />
            </template>
          </UButtonGroup>
          <UButton
            icon="i-fluent-resize-video-20-filled"
            color="gray"
            label="Все ресайзы"
            size="xs"
            block
            class="col-span-full"
            @click="sendTasks('resize')"
          />
        </template>

        <UDivider class="col-span-full my-1" />

        <UButton
          color="gray"
          variant="outline"
          label="Новый альбом"
          icon="i-mingcute-photo-album-fill"
          @click="sendTasks('album')"
          size="sm"
          block
          class="col-span-full"
        />
      </template>
      <template v-else>
        <UButton
          v-if="isRendering"
          color="gray"
          label="Остановить все задачи"
          size="xs"
          block
          class="col-span-full"
          @click="stopTasks"
        />
      </template>

      <UDivider class="col-span-full my-1" />

      <UButton
        v-if="!isRendering"
        color="gray"
        label="Обновить длительность и качество"
        size="xs"
        block
        class="col-span-full"
        @click="updateInfo"
      />
      <UButton
        to="/props?tab=1"
        icon="i-material-symbols-settings-rounded"
        label="Перейти к настройкам"
        color="gray"
        class="col-span-full"
        block
        size="xs"
      />
    </div>
  </div>
</template>

<script setup>
  const qualities = Object.keys(useApiAttributes().value?.video_qualities || {})

  const props = defineProps({
    form: Object,
    state: Object,
    isRendering: Boolean,
  })

  const sendTasks = async (task, quality = undefined) => {
    await send({
      tasks: [task],
      quality: quality,
    })
  }
  const updateInfo = async () => {
    await send({
      update_info: true,
    })
  }
  const stopTasks = async () => {
    await send({
      stop: true,
    })
  }

  const send = async (body) => {
    await props.form.customSubmit(
      async () =>
        await $api(`/videos/${props.state.id}/tasks`, {
          method: 'POST',
          body: body,
        }),
    )
    await props.form.refresh()
  }
</script>
