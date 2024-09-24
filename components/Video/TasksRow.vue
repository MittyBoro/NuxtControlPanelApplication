<template>
  <UPopover v-model:open="open" :popper="{ arrow: false }">
    <div
      class="flex items-center text-xs gap-1 w-full rounded transition-colors"
      :class="{ 'bg-gray-500/5 ring-gray-500/5 ring-4': open }"
    >
      <span class="font-bold">{{ getRuType(task) }}</span>

      <span class="dots w-full"></span>
      <template v-if="!['error', 'success'].includes(task.status)">
        <span>
          <span v-if="mini">≈</span>
          {{ task.progress }}%
        </span>
      </template>
      <template v-else-if="task.duration || task.duration === 0">
        <span>{{ accurateCountdown(task.duration) }}</span>
      </template>
      <span
        class="font-bold flex"
        :class="{
          'text-red-500': task.status === 'error',
          'text-green-500': task.status === 'success',
          'text-gray-500': task.status === 'queued',
        }"
      >
        {{ translateKey(task.status) }}
      </span>
    </div>
    <template #panel>
      <div
        class="grid grid-cols-[auto_1fr] gap-x-3 p-4 text-xs whitespace-normal"
      >
        <template v-for="key in Object.keys(task)" :key="key">
          <template v-if="task[key]">
            <span>{{ key }}:</span>
            <span class="max-w-40 break-words">
              {{ task[key] }}
            </span>
            <UDivider class="col-span-full my-0.5" />
          </template>
        </template>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
  const { task, mini } = defineProps({
    task: Object,
    mini: Boolean,
  })

  const open = ref(false)

  const getRuType = (task) => {
    switch (task.type) {
      case 'resize':
        return task.parameters.quality
      case 'preview':
        return 'Превью'
      case 'trailer':
        return 'Трейлер'
      case 'screenshots':
        return 'Скриншоты'
      case 'thumbnails':
        return 'Миниатюры'
      case 'album':
        return 'Альбом'
      default:
        return task.type
    }
  }
</script>

<style lang="scss" scoped>
  .dots {
    align-self: stretch;

    border-bottom: 1px dotted currentColor;
    min-width: 10px;
    opacity: 0.5;
    margin-bottom: 3px;
  }
</style>
