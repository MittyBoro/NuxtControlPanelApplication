import type { UTooltip } from '#build/components';
<template>
  <div class="whitespace-normal">
    <NuxtLink
      :to="commentableUrl + `#comment-${item.id}`"
      target="_blank"
      color="gray"
      class="link-opacity"
    >
      <span>
        <b>#{{ item.id }}</b>
        | {{ formatDate(item.created_at) }}
      </span>
    </NuxtLink>
    <div class="flex items-center flex-wrap gap-1.5">
      <NuxtLink
        v-if="!route.query.user_id"
        :to="`/users/show/${item.user.id}`"
        class="max-w-[150px] truncate link-opacity"
      >
        <span class="font-bold">{{ item.user.name }}</span>
        <span class="text-xs"> [{{ item.user.username }}]</span>
      </NuxtLink>
      к
      <NuxtLink
        :to="commentableUrl"
        target="_blank"
        class="font-bold text-xs link-opacity"
      >
        <UIcon :name="commentableIcon" />
        {{ item.commentable.title || item.commentable.name }}
      </NuxtLink>
      <UTooltip text="Редактировать запись">
        <NuxtLink
          :to="`/${item.commentable_type}s/${item.commentable.id}`"
          class="font-bold text-xs link-opacity"
        >
          <UIcon name="i-gg-pen" />
        </NuxtLink>
      </UTooltip>
    </div>
    <div v-if="item.parent_id">
      <NuxtLink
        :to="`/comments?id=${item.parent_id}`"
        class="link-opacity text-xs"
      >
        В ответ на #{{ item.parent_id }}
      </NuxtLink>
    </div>

    <div class="text-sm my-2 leading-tight w-full">
      <UTextarea
        v-if="item.isEdit && !item.is_deleted"
        v-model="item.body"
        class="w-full"
        resize
        @change="openItemEditor(item)"
      />
      <div
        v-else
        class="cursor-pointer transition-opacity"
        :class="{ 'line-clamp-3 hover:opacity-75': !item.showMore }"
        @click="item.showMore = !item.showMore"
      >
        {{ item.body }}
      </div>
    </div>

    <div class="text-xs">
      <span v-if="item.is_deleted" class="text-red-500 font-bold mr-2">
        [удалено, но на комментарий есть ответы]
      </span>
      <span class="mr-2">
        <UIcon name="i-ic-baseline-thumb-up" />
        {{ item.likes || 0 }}
      </span>
      <span>
        <UIcon name="i-ic-baseline-thumb-down" />
        {{ item.dislikes || 0 }}
      </span>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    item: Object,
  })
  const route = useRoute()
  const item = toRef(props.item)

  const commentableUrl = computed(() => {
    return externalUrl(
      `/${item.value.commentable_type}s/${item.value.commentable.slug}`,
    )
  })

  const commentableIcon = computed(() => {
    switch (item.value.commentable_type) {
      case 'video':
        return 'i-material-symbols-smart-display-rounded'
      case 'album':
        return 'i-mingcute-photo-album-fill'
      case 'actor':
        return 'i-mdi-face-woman-shimmer'
      default:
        return ''
    }
  })

  const openItemEditor = async (row) => {
    row.isEdit = false
    await useApiFormSubmit('comments', row)
  }

  onMounted(() => {
    if (item.value.is_deleted) {
      item.value.class = 'opacity-50'
    }
  })
</script>
