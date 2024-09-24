export const useTabs = (key) => {
  const currentTab = useLocalStorage(key, 0)

  onMounted(() => {
    const routeTab = useRoute().query.tab
    if (routeTab !== undefined) {
      currentTab.value = parseInt(routeTab)
    }
  })

  watch(
    () => currentTab.value,
    (value) => {
      navigateTo({ query: { tab: value } })
    },
  )

  return currentTab
}
