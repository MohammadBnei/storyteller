// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: false, // Disable pages since we're using app.vue directly
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ui: {
    global: true,
  },
  typescript: {
    strict: true
  }
})
