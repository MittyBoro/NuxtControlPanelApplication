export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:loading:start', async () => {
    const user = useApiUser()
    const attributes = useApiAttributes()
    const $api = useSanctumClient()

    if (
      (!attributes.value || Object.keys(attributes.value).length === 0) &&
      user.value
    ) {
      attributes.value = await $api('/attributes')
    }
  })
})
