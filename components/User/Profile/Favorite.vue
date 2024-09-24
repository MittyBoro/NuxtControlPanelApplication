<template>
  <TableWrapper v-model:pagination="pagination" class="max-w-4xl">
    <template #header>
      <!--user_id  -->
      <!--model_id  -->

      <UFormGroupX v-model="filter.actions" label="Действие" size="xs">
        <USelectMenu
          v-model="filter.actions"
          :options="['Все', 'Лайки', 'Дизлайки', 'Просмотры', 'Подписки']"
          multiple
          class="w-28"
        />
      </UFormGroupX>
      <UFormGroupX v-model="filter.period.from" label="Период с" size="xs">
        <UInput v-model="filter.period.from" type="datetime-local" />
      </UFormGroupX>
      <UFormGroupX v-model="filter.period.to" label="Период до" size="xs">
        <UInput v-model="filter.period.to" type="datetime-local" />
      </UFormGroupX>
    </template>
    <UTable
      v-model:sort="sort"
      :loading="pending"
      :columns="columns"
      :rows="data"
    >
      <!--  -->
      <template #model_type-data="{ row }">
        <UButton
          :icon="typeToIcon[row.model_type]"
          color="gray"
          variant="link"
          to="/videos"
          :padded="false"
          class="flex"
        >
          {{ typeToName[row.model_type] || row.model_type }} «бла бла бла»
        </UButton>
      </template>

      <!--  -->
      <template #action-data="{ row }">
        <UButton
          :icon="actionToIcon[row.action]"
          color="gray"
          variant="link"
          to="/videos"
          :padded="false"
          class="flex"
        >
          {{ actionToName[row.action] || row.action }}
        </UButton>
      </template>

      <!--  -->
      <template #created_at-data="{ row }">
        <TableDate :date="row.created_at" />
      </template>
    </UTable>
  </TableWrapper>
</template>

<script setup></script>

<style lang="scss" scoped></style>
