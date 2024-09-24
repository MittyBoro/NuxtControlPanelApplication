<template>
  <UAlert icon="i-material-symbols-info-outline-rounded" title="">
    <template #description>
      <div class="prose dark:prose-invert prose-sm">
        <p>
          <code class="code" @click="copyWithNotify('%mask%')">%mask%</code>
          для подстановки данных из дочерней страницы с теми же ключами
        </p>
        <p>
          <code class="code" @click="copyWithNotify('%mask_title%')">
            %mask_title%
          </code>
          для замены на заголовок из дочерней страницы
        </p>
        <p>
        <p>
          <code class="code" @click="copyWithNotify('%mask_sort%')">
            %mask_sort%
          </code>
          для замены текста на вариант сортировки
        </p>
          <span
            @click="
              copyWithNotify(
                '{{ Текст без сортировки || Текст c сортировкой с %mask_sort% или без }}',
              )
            "
          >
            <code class="code" v-pre>
              {{ Текст по умолчанию || Текст c сортировкой с %mask_sort% или без }}
            </code>
          </span>
          для замены текста на вариант сортировки с условием
        </p>
      </div>
    </template>
  </UAlert>
</template>

<script setup></script>

<style lang="scss" scoped>
  .prose {
    p {
      @apply my-1;
    }
  }
  .code {
    @apply bg-gray-500/20 px-1 rounded whitespace-normal inline-flex cursor-pointer;
    &::before,
    &::after {
      display: none;
    }
  }
</style>
