// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    'nitro-cloudflare-dev',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4,

  },

  compatibilityDate: '2025-06-16',
  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
