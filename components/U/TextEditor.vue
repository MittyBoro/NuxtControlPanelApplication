<template>
  <div
    v-if="editor"
    class="editor form-text notranslate"
    :class="{ focus: focus, fullscreen: isFullscreen }"
    @click="focus || editor.view.dom.focus()"
    ref="editorRef"
  >
    <UTipTapMenuBar
      class="editor__header"
      :editor="editor"
      :mini="mini"
      :isSource="isSource"
      :toggleSource="toggleSource"
      :isFullscreen="isFullscreen"
      :toggleFullScreen="toggleFullscreen"
    />

    <EditorContent
      v-show="!isSource"
      class="editor__content"
      :class="{ mini: mini }"
      :editor="editor"
    />
    <textarea
      v-show="isSource"
      class="editor__raw_content"
      v-model="modelValue"
      ref="textareaRef"
      :class="{ mini: mini }"
      :style="{ minHeight: editorHeight + 'px' }"
      @focus="focus = true"
      @blur="focus = false"
    ></textarea>

    <div class="editor__footer">
      <span class="mr-3">Слов: {{ wordsCount }}</span>
      <span>Символов: {{ symbolsCount }}</span>
    </div>
  </div>
</template>

<script setup>
  import TextAlign from '@tiptap/extension-text-align'
  import StarterKit from '@tiptap/starter-kit'
  import CharacterCount from '@tiptap/extension-character-count'
  import Highlight from '@tiptap/extension-highlight'
  import Image from '@tiptap/extension-image'

  import Table from '@tiptap/extension-table'
  import TableHeader from '@tiptap/extension-table-header'
  import TableCell from '@tiptap/extension-table-cell'
  import TableRow from '@tiptap/extension-table-row'

  import TextStyle from '@tiptap/extension-text-style'
  import Span from './TipTap/Extensions/span'
  import Small from './TipTap/Extensions/small'
  import Link from '@tiptap/extension-link'

  import { Editor, EditorContent } from '@tiptap/vue-3'

  const { mini, srcFirst } = defineProps({
    mini: {
      type: Boolean,
      default: false,
    },
    srcFirst: {
      type: Boolean,
      default: false,
    },
  })
  const modelValue = defineModel()

  const textareaRef = ref(null)
  const editorRef = ref(null)
  const editor = ref(null)
  const focus = ref(false)
  const isSource = ref(srcFirst)
  const isFullscreen = ref(false)
  const editorHeight = ref(0)

  watch(
    () => modelValue.value,
    (val) => {
      if (isSource.value) {
        editor.value.commands.setContent(val)
      }
    },
  )

  onMounted(() => {
    editor.value = new Editor({
      content: modelValue.value,
      extensions: [
        StarterKit,
        CharacterCount.configure(),
        Highlight,
        Image,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),

        Table,
        TableHeader,
        TableCell,
        TableRow,

        Span,
        Small,
        TextStyle,
        Link.configure({
          openOnClick: false,
        }),
      ],
      onCreate: ({ editor }) => {
        editorHeight.value = editor.options.element?.offsetHeight
      },
      onUpdate: ({ editor }) => {
        modelValue.value = editor.getHTML()
        editorHeight.value = editor.options.element.offsetHeight
      },
      onFocus: ({ editor, event }) => {
        focus.value = true
      },
      onBlur: ({ editor, event }) => {
        focus.value = false
      },
    })

    addEventListener('fullscreenchange', (event) => {
      isFullscreen.value = document.fullscreenElement
    })
  })

  const symbolsCount = computed(() => {
    if (!editor.value.storage) return 0
    return editor.value.storage.characterCount.characters()
  })
  const wordsCount = computed(() => {
    if (!editor.value.storage) return 0
    return editor.value.storage.characterCount.words()
  })

  const toggleSource = () => {
    isSource.value = !isSource.value
    if (isSource.value) {
      setTimeout(() => {
        textareaRef.value.focus()
      }, 40)
    }
  }

  const toggleFullscreen = () => {
    const element = editorRef.value
    if (!isFullscreen.value) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else {
        isFullscreen.value = true
        return
      }
    } else {
      document.exitFullscreen()
    }
  }

  onUnmounted(() => {
    editor.value.destroy()
  })
</script>

<style lang="scss" scoped>
  .editor {
    @apply border rounded-md dark:border-gray-700;
    overflow: hidden;
    &.focus {
      @apply ring-2 ring-primary-500 dark:ring-primary-400;
    }
    &.form-text {
      display: flex;
      flex-direction: column;
      max-height: 36rem;
      @apply p-0 bg-white dark:bg-gray-900;
    }
    &__header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      flex-wrap: wrap;
      z-index: 5;
      @apply py-1.5 px-2 bg-gray-50 dark:bg-gray-950 border-b dark:border-gray-700;
    }

    &__content,
    &__raw_content {
      min-height: 12rem;
      @apply py-5 px-4;
      &.mini {
        min-height: 10rem;
      }
    }

    &__content {
      flex: 1 1 auto;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      @apply py-5 px-4;
    }

    &__raw_content {
      outline: 0;
      border: 0;
      @apply bg-gray-50 dark:bg-gray-950 font-mono;
      &:focus {
        box-shadow: none;
        outline: 0;
        border: 0;
      }
    }

    &__footer {
      display: flex;
      flex: 0 0 auto;
      @apply py-2 px-4 bg-gray-50 dark:bg-gray-950 text-xs border-t dark:border-gray-700;
    }
  }

  .editor.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    z-index: 500;
    max-height: none;
    .editor__content {
      height: 100%;
      min-height: 0;
    }
  }
</style>

<style lang="scss">
  .ProseMirror {
    min-height: 100%;
    &:focus {
      outline: 0;
    }
    > * {
      & + * {
        margin-top: 0.75rem;
      }
      & + h1 {
        margin-top: 1.25rem;
      }
      & + h2,
      & + h3 {
        margin-top: 1rem;
      }
    }
    ul,
    ol {
      padding: 0 1rem;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
      font-weight: 700;
      &:first-child {
        margin-top: 0;
      }
    }
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    h3 {
      font-size: 1.25rem;
    }
    h4 {
      font-size: 1rem;
    }
    h5 {
      font-size: 0.85rem;
    }
    h6 {
      font-size: 0.75rem;
    }
    code {
      @apply font-mono bg-gray-500/50;
    }
    small {
      font-size: 0.7em;
    }
    pre {
      @apply font-mono bg-gray-500/50 px-1 py-2 rounded;
      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }
    mark {
      background-color: #faf594;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    blockquote {
      @apply my-4 p-2 border-l-4 border-gray-500 bg-gray-500/10;
    }
    hr {
      @apply my-8 border-t-2;
    }

    a {
      text-decoration: underline;
    }
    ul li {
      list-style: disc;
    }
    ol li {
      list-style: decimal;
    }
    ul[data-type='taskList'] {
      list-style: none;
      padding: 0;
      li {
        display: flex;
        align-items: center;

        > label {
          flex: 0 0 auto;
          margin-right: 0.5rem;
          user-select: none;
        }
        > div {
          flex: 1 1 auto;
        }
      }
    }
    table {
      table-layout: auto;
      width: 100%;
      border-collapse: collapse;
      @apply my-4 rounded-md;
      th {
        @apply bg-gray-500/10;
      }
      th,
      td {
        @apply px-1.5 py-2 border border-gray-500/20;
      }
    }
  }
</style>
