<template>
  <USelectMenu
    v-model="selected"
    :options="countriesList"
    searchable
    searchable-placeholder="Поиск страны..."
    value-attribute="key"
    option-attribute="value"
    :multiple="multiple"
    class="w-full max-w-full"
  >
    <template #label>
      <template v-if="typeof selected === 'string'">
        <span class="truncate">
          {{ country.getName(selected, 'ru', { select: 'alias' }) }}
        </span>
      </template>
      <div
        class="max-w-xs"
        v-else-if="Array.isArray(selected) && selected.length"
      >
        <div class="truncate">
          <span>{{ selected.length }} шт: </span>
          <template v-for="(item, i) in selected">
            {{
              country.getName(item, 'ru', { select: 'alias' }) +
              (i < selected.length - 1 ? ', ' : '')
            }}
          </template>
        </div>
      </div>
      <template v-else>Выберите страну</template>
    </template>
  </USelectMenu>
</template>

<script setup>
  import country from 'i18n-iso-countries'
  import countryLocalize from 'i18n-iso-countries/langs/ru.json'
  country.registerLocale(countryLocalize)

  const countriesList = Object.entries(
    country.getNames('ru', { select: 'alias' })
  ).map(([key, value]) => ({
    key,
    value,
  }))

  const selected = defineModel()

  const { multiple } = defineProps({
    multiple: {
      type: Boolean,
      default: false,
    },
  })
</script>
