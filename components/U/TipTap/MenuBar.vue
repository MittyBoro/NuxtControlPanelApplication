<template>
  <div
    :class="{
      big: isFullscreen,
    }"
  >
    <template v-for="(item, index) in items">
      <template v-if="!item.hidden">
        <div
          class="divider"
          v-if="item.type === 'divider'"
          :key="`divider${index}`"
        ></div>
        <UTipTapMenuItem
          v-else
          :key="index"
          v-bind="item"
          :disabled="!item.always && isSource"
        />
      </template>
    </template>
    <UTipTapMenuItem
      class="ml-auto"
      v-bind="{
        icon: 'i-tabler-aspect-ratio-filled',
        title: 'На весь экран',
        action: () => {
          toggleFullScreen()
        },
        isActive: () => isFullscreen,
      }"
    />
    <div
      class="w-full border-t dark:border-gray-700 flex pt-1.5 mt-1.5"
      v-if="isActiveTable"
    >
      <template v-for="(item, index) in tableItems">
        <div
          class="divider"
          v-if="item.type === 'divider'"
          :key="`divider${index}`"
        ></div>
        <UTipTapMenuItem
          v-else
          :key="index"
          v-bind="item"
          :disabled="isSource"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
  const {
    toggleSource,
    isSource,
    toggleFullScreen,
    isFullscreen,
    mini,
    editor,
  } = defineProps({
    toggleSource: Function,
    isSource: Boolean,
    toggleFullScreen: Function,
    isFullscreen: Boolean,
    mini: Boolean,
    editor: {
      type: Object,
      required: true,
    },
  })

  const isActiveTable = computed(() => {
    return editor.isActive('table')
  })

  const items = [
    {
      icon: 'i-material-symbols-html',
      always: true,
      title: 'HTML код',
      action: () => {
        toggleSource()
        editor.commands.focus()
      },
      isActive: () => isSource.value,
    },
    {
      type: 'divider',
    },
    {
      icon: 'i-material-symbols-format-bold-rounded',
      title: 'Жирный',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: 'i-material-symbols-format-italic-rounded',
      title: 'Курсив',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: 'i-material-symbols-format-strikethrough-rounded',
      title: 'Зачёркнутый',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-code-blocks',
      title: 'Код',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-format-ink-highlighter',
      title: 'Выделить',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-link-rounded',
      title: 'Ссылка',
      action: () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
        // cancelled
        if (url === null) {
          return
        }

        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run()

          return
        }
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run()
      },
      isActive: () => editor.isActive('link'),
    },
    {
      type: 'divider',
    },
    {
      icon: 'i-material-symbols-align-horizontal-left-rounded',
      title: 'Выравнивание слева',
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: () => editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: 'i-material-symbols-align-horizontal-center-rounded',
      title: 'Выравнивание справа',
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: () => editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: 'i-material-symbols-align-horizontal-right-rounded',
      title: 'Выравнивание по центру',
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: () => editor.isActive({ textAlign: 'right' }),
    },
    {
      type: 'divider',
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-format-h1-rounded',
      title: 'Заголовок 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-format-h2-rounded',
      title: 'Заголовок 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-format-h3-rounded',
      title: 'Заголовок 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-format-h4-rounded',
      title: 'Заголовок 4',
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive('heading', { level: 4 }),
    },
    {
      icon: 'i-material-symbols-format-paragraph-rounded',
      title: 'Параграф',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: 'i-material-symbols-format-list-bulleted-rounded',
      title: 'Маркированный список',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: 'i-material-symbols-format-list-numbered-rounded',
      title: 'Упорядоченный список',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: 'i-material-symbols-format-quote-rounded',
      title: 'Цитата',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-horizontal-rule-rounded',
      title: 'Разделитель',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: 'i-material-symbols-format-clear-rounded',
      title: 'Очистить форматирование',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: 'divider',
      hidden: mini,
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-add-photo-alternate-rounded',
      title: 'Добавить изображение',
      action: () => {
        const url = window.prompt('URL')
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
      },
    },
    {
      hidden: mini,
      icon: 'i-material-symbols-table-rounded',
      title: 'Таблица',
      action: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
          .run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'i-material-symbols-undo-rounded',
      title: 'Отменить',
      always: true,
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: 'i-material-symbols-redo-rounded',
      title: 'Повторить',
      always: true,
      action: () => editor.chain().focus().redo().run(),
    },
  ]

  const tableItems = [
    {
      icon: 'i-tabler-column-insert-left',
      title: 'Добавить столбец перед',
      action: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      icon: 'i-tabler-column-insert-right',
      title: 'Добавить столбец после',
      action: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      icon: 'i-tabler-row-insert-top',
      title: 'Добавить строку перед',
      action: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      icon: 'i-tabler-row-insert-bottom',
      title: 'Добавить строку после',
      action: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'i-tabler-border-corners',
      title: 'Объединить ячейки',
      action: () => editor.chain().focus().mergeCells().run(),
    },
    {
      icon: 'i-tabler-border-all',
      title: 'Разделить ячейку',
      action: () => editor.chain().focus().splitCell().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'i-tabler-table-row',
      title: 'Переключить заголовок',
      action: () => editor.chain().focus().toggleHeaderRow().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'i-tabler-table-options',
      title: 'Исправить таблицу',
      action: () => editor.chain().focus().fixTables().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'i-tabler-column-remove',
      title: 'Удалить столбец',
      action: () => editor.chain().focus().deleteColumn().run(),
    },
    {
      icon: 'i-tabler-row-remove',
      title: 'Удалить строку',
      action: () => editor.chain().focus().deleteRow().run(),
    },
    {
      icon: 'i-tabler-table-minus',
      title: 'Удалить таблицу',
      action: () => editor.chain().focus().deleteTable().run(),
    },
  ]
</script>

<style lang="scss" scoped>
  .divider {
    @apply h-5 w-[1px] mx-1 bg-gray-500/30;
  }
  .big {
    :deep(.menu-item) {
      @apply h-7 w-7;
    }
  }

  :deep(.menu-item) {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @apply py-1.5 mr-0.5 w-6 h-6 rounded-md transition-colors;

    &.disabled {
      pointer-events: none;
      opacity: 0.3;
    }

    &:hover {
      @apply bg-gray-500/30;
    }
  }
</style>
