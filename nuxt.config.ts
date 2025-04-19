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
    baseURL: '/apollo-site/', // Keep this for client-side routing
    buildAssetsDir: '/_nuxt/'
  },

  nitro: {
    baseURL: '/apollo-site/', 
    prerender: {
      crawlLinks: false, // Disable crawling
      routes: [ // Explicitly define routes
        '/apollo-site/', 
        '/apollo-site/playground',
        '/apollo-site/getting-started',
        '/apollo-site/how-to-guides/state-management',
        '/apollo-site/reference/commands',
        '/apollo-site/explanation/architecture',
        '/apollo-site/tutorials/your-first-app'
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