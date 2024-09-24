export default defineNuxtRouteMiddleware(async () => {
  const user = useApiUser()
  if (!user.value || !['admin'].includes(user.value?.role)) {
    return await navigateTo('/')
  }
})
