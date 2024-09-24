export async function useApiList(path, apiQuery = {}, options = {}) {
  const route = useRoute()
  const query = computed(() => ({ ...apiQuery, ...route.query }))
  const { data, pending, error, refresh } = await useApi(path, {
    query: query,
    lazy: true,
    ...options,
  })

  const list = computed(() => data.value?.data || [])
  const meta = computed(() => data.value?.meta)

  return {
    list,
    meta,
    pending,
    error,
    refresh,
  }
}
