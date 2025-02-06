// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Enable pages
  pages: true,

  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  ui: {
    global: true,
  },

  typescript: {
    strict: true
  },

  runtimeConfig: {
    deepseekApiKey: process.env.DEEPSEEK_API_KEY
  },

  compatibilityDate: '2025-02-06'
})