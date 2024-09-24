export const $api = (path, options = {}) => {
  if (typeof Echo !== 'undefined') {
    if ('headers' in options) {
      options.headers['X-Socket-ID'] = Echo.socketId()
    } else {
      options.headers = {
        'X-Socket-ID': Echo.socketId(),
      }
    }
  }
  return useNuxtApp().$sanctumClient(path, options)
}
