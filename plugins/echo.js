import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin((nuxtApp) => {
  window.Pusher = Pusher

  const pusherConfig = useRuntimeConfig().public.pusher

  const isProduction = process.env.NODE_ENV === 'production'

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: pusherConfig.key,
    cluster: pusherConfig.cluster,
    wsHost: pusherConfig.host,
    wsPort: pusherConfig.port,
    wssPort: pusherConfig.port,
    forceTLS: isProduction,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          $api('/../broadcasting/auth', {
            method: 'POST',
            body: {
              socket_id: socketId,
              channel_name: channel.name,
            },
          })
            .then((response) => {
              callback(null, response)
            })
            .catch((error) => {
              callback(error)
            })
        },
      }
    },
  })
})
