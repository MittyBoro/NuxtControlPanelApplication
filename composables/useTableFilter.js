export const useTableFilter = async (append = []) => {
  const name = useRoute().name

  let filter = []
  try {
    filter = await (await import(`@/config/filters/${name}.js`)).default
    filter = (await filter()) || []
  } catch {}

  return [
    {
      key: 'q',
      type: 'text',
      icon: 'i-material-symbols-search',
      placeholder: 'Поиск...',
    },
    ...filter,
    ...append,
  ]
}
