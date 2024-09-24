export const ui = {
  primary: 'supernova',
  gray: 'zinc',
  avatar: {
    background: 'bg-gray-200 dark:bg-gray-800',
    placeholder: 'font-bold text-gray-500 dark:text-gray-400 truncate',
    default: {
      text: 'font-bold text-gray-900 dark:text-white truncate',
      size: 'lg',
    },
  },
  breadcrumb: {
    base: 'font-black transition',
    li: 'leading-4',
    active: 'text-black dark:text-white/70',
    inactive: 'font-bold text-current dark:text-current',
    default: {
      divider: 'i-heroicons-chevron-right-20-solid',
    },
  },
  button: {
    base: 'transition-all',
    rounded: 'rounded-lg',
    color: {
      primary: {
        solid:
          'bg-gradient-to-r bg-200% from-primary-400 via-primary-400 to-primary-500 text-gray-900 bg-right hover:bg-left ',
      },
    },
    font: 'font-bold ',
    default: {
      size: 'lg',
    },
  },
  card: {
    base: 'overflow-visible',
    background: 'bg-white dark:bg-gray-900',
    ring: 'ring-0',
    rounded: 'sm:rounded-3xl',
    shadow: 'shadow-none',
  },
  icons: {
    dynamic: true,
  },
  input: {
    default: {
      size: 'md',
    },
  },
  modal: {
    rounded: 'rounded-3xl',
    base: 'overflow-visible',
    overlay: {
      background: 'bg-gray-100/90 dark:bg-gray-950/90',
    },
    width: 'w-full sm:max-w-xl',
  },
  notifications: {
    position: 'top-0 bottom-auto right-0 left-auto',
  },
  popover: {
    popper: { arrow: true },
  },
  select: {
    default: {
      size: 'md',
    },
  },
  table: {
    wrapper: 'max-w-full',
    tr: { base: 'transition hover:bg-gray-500/5' },
    default: {
      loadingState: {
        label: 'Загрузка...',
      },
      emptyState: {
        label: 'Нет элементов',
      },
      sortAscIcon: 'i-tdesign-chevron-up-s',
      sortDescIcon: 'i-tdesign-chevron-down-s',
      sortButton: {
        icon: 'i-radix-icons-caret-sort',
        trailing: true,
        square: false,
        color: 'gray',
        variant: 'ghost',
        size: 'sm',
        class: '-m-1.5 gap-1',
      },
    },
  },
  tabs: {
    list: {
      rounded: 'rounded-none sm:rounded-lg',
      background: 'bg-gray-200/50 dark:bg-gray-800',
      tab: {
        size: 'max-sm:text-xs',
      },
    },
  },
  tooltip: {
    popper: { arrow: true },
  },
}
