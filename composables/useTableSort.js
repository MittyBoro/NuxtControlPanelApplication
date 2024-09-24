export const useTableSort = (defaultStr = '') => {
  const route = useRoute()
  return computed({
    get() {
      const order = String(route.query.order ?? defaultStr).split('-') || []
      return {
        column: order[0],
        direction: order[1],
      }
    },
    set(value) {
      navigateTo({
        query: {
          ...route.query,
          page: undefined,
          order: `${value.column}-${value.direction}`,
        },
      })
    },
  })
}
