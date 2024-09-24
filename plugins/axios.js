import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const { baseUrl, csrf } = useRuntimeConfig().public.sanctum

  let api = axios.create({
    withCredentials: true,
    headers: {
      accept: 'application/json',
      common: {},
    },
  })

  api.interceptors.request.use((config) => {
    config.headers[csrf.header] = useCookie(csrf.cookie).value
    return config
  })
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.data?.message) {
        notify.alert(error.response?.data?.message)
      }
      return Promise.reject(error)
    },
  )

  api.defaults.baseURL = baseUrl

  return {
    provide: {
      axios: api,
    },
  }
})
