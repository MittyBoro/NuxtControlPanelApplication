// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page' },
  },

  colorMode: {
    classSuffix: '',
  },

  css: ['~/assets/styles/main.scss'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/ui', 'nuxt-auth-sanctum'],

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      frontendUrl: process.env.FRONTEND_URL, // Front site url
      pusher: {
        key: process.env.PUSHER_APP_KEY,
        host: process.env.PUSHER_HOST,
        port: process.env.PUSHER_PORT,
        encrypted: process.env.PUSHER_ENCRYPTED,
        cluster: process.env.PUSHER_APP_CLUSTER,
      },
    },
  },

  sanctum: {
    baseUrl: process.env.BACKEND_URL + '/api/v2', // Laravel API
    endpoints: {
      csrf: '/../../sanctum/csrf-cookie',
      login: '/../auth/login',
      logout: '/../auth/logout',
      user: '/../v1/users/me',
    },
    redirect: {
      keepRequestedRoute: true,
      onLogout: '/login',
      onAuthOnly: '/login',
      onGuestOnly: '/',
    },
    globalMiddleware: {
      enabled: true,
    },
  },

  ssr: false,

  ui: {
    icons: 'all',
    safelistColors: ['gray', 'blue', 'green'],
  },

  tailwindcss: {
    viewer: false,
  },

  compatibilityDate: '2024-07-11',
})