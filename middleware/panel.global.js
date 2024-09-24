export default defineNuxtRouteMiddleware(async (to) => {
  const user = useApiUser()
  const allowedRoles = useAppConfig().app.allowed_roles

  if (user.value && !allowedRoles.includes(user.value.role)) {
    const { logout } = useApiAuth()
    return await logout()
  }
})
