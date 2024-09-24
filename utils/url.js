const { frontendUrl } = useRuntimeConfig().public

export const localUrl = (path) => {
  const url = useRequestURL()
  return url.origin + path
}
export const externalUrl = (path = '/') => {
  return frontendUrl + '/' + path.replace(/^\/+/, '')
}
