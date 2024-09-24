<template>
  <div>
    <nav
      v-for="(menu, i) in menu"
      :key="i"
      class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-7 mb-8"
    >
      <template v-for="item in menu" :key="item.name">
        <UButton
          v-if="!item.hidden"
          :to="item.route"
          class="py-5 rounded-[2rem] block text-center"
        >
          <UIcon :name="item.icon" class="text-8xl" />
          <div class="text-base font-black">
            {{ item.name }}
          </div>
        </UButton>
      </template>
    </nav>
  </div>
</template>

<script setup>
  const menu = useSidebarMenu()
</script>

<style lang="scss" scoped></style>
