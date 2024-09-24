<template>
  <div class="paid">
    <template v-for="currency in currencies" :key="currency.key">
      <div
        v-if="`${currency.key}_paid` in user && user[`${currency.key}_paid`]"
      >
        {{ formatNumber(user[`${currency.key}_paid`]) + currency.symbol }}
      </div>
    </template>
  </div>
</template>

<script setup>
  const { user } = defineProps({
    user: Object,
  })

  const currencies = useApiAttributes().value.currencies
</script>

<style lang="scss" scoped>
  .paid:empty::before {
    content: 0;
  }
</style>
