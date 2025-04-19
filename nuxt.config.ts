// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxt/ui'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  app: {
    head: {
      title: 'Apollo Documentation',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Documentation for Apollo' }
      ]
    },
    baseURL: '/apollo-site/',
    buildAssetsDir: '/_nuxt/'
  },

  nitro: {
    baseURL: '/apollo-site/', 
    prerender: {
      crawlLinks: false,
      routes: [
        '/', 
        '/playground',
        '/getting-started',
        '/how-to-guides/state-management',
        '/reference/commands',
        '/explanation/architecture',
        '/tutorials/your-first-app'
      ]
      // ignore: ['/some-path-to-ignore']
    }
  },

  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  },

  hooks: {
    'build:done': () => {
      console.log('Build completed successfully')
    }
  }
})