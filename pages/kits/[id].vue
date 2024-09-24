<template>
  <section class="flex md:grid grid-cols-2 gap-4 max-w-2xl">
    <!--  -->
    <UCard class="shrink-0 w-full col-span-full">
      <template #header>
        <div class="flex items-baseline gap-2">
          <span class="font-black lg:text-xl">
            {{ item.name }}
            <span class="opacity-70">({{ translateKey(item.type) }})</span>
          </span>
          <span class="link-opacity" @click="copyWithNotify(item.key)">
            <code>[{{ item.key }}]</code>
          </span>
        </div>
        <div>
          Сортировка после списка: {{ translateKey(item.sorting_rest) }}
        </div>
      </template>

      <!--  -->
      <KitSortable :item="item" />
    </UCard>
  </section>
</template>

<script setup>
  const { data } = await useApi(`/kits/${useRoute().params.id}`)
  const item = computed(() => data.value?.data)
</script>
