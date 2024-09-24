<template>
  <UAlert title="">
    <template #description>
      <div class="grid gap-4">
        <div class="font-bold grid gap-2">
          <p>
            Продолжительность:
            <UBadge color="gray">{{ secondToTime(state.duration) }}</UBadge>
          </p>
          <p>
            Макс. качество:
            <UBadge color="gray">{{ state.quality || 'Не определено' }}</UBadge>
          </p>
        </div>
        <!--  -->
        <div v-if="state.resizes.length" class="grid gap-2">
          <div class="font-bold mb-1">Ресайзы</div>
          <div
            v-for="media in state.resizes"
            :key="media.id"
            class="text-xs flex gap-2 items-center"
          >
            <UBadge color="gray" class="w-12 justify-center">
              {{ media.properties.quality }}
            </UBadge>
            <UBadge
              variant="soft"
              :color="
                media.properties.duration == state.duration ? 'gray' : 'red'
              "
            >
              {{ secondToTime(media.properties.duration) }}
            </UBadge>
            <NuxtLink :to="media.src" target="_blank" class="link">
              {{ media.name }}
            </NuxtLink>

            <span class="ml-auto font-semibold text-gray-500">
              {{ formatBytes(media.size) }}
            </span>
          </div>
        </div>

        <!--  -->
        <div v-if="state.thumbnails.length" class="grid gap-2">
          <div class="mt-2 font-bold mb-1">Миниатюры</div>
          <div
            v-for="media in state.thumbnails"
            :key="media.id"
            class="text-xs flex gap-2 items-center"
          >
            <NuxtLink :to="media.src" target="_blank" class="link">
              {{ media.name }}
            </NuxtLink>

            <span class="ml-auto font-semibold text-gray-500">
              {{ formatBytes(media.size) }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </UAlert>
</template>

<script setup>
  const { state } = defineProps({
    state: Object,
  })
</script>
