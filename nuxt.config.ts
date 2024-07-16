// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL,
        key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      },
    },
    supabase: {
      databaseUrl: process.env.NUXT_SUPABASE_DATABASE_URL,
    },
  },
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@vee-validate/nuxt",
  ],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    redirect: false,
  },
  shadcn: {
    prefix: "U",
    componentDir: "./app/components/ui",
  },
  site: {
    name: "C00kb00k",
    description: "C00kb00k",
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "cs",
        name: "Čeština",
        file: "cs.json",
      },
    ],
    lazy: true,
    langDir: "lang",
  },
  colorMode: {
    classSuffix: "",
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    componentIslands: {
      selectiveClient: "deep",
    },
  },
});
