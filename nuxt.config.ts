// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
    ssr: false,

    experimental: {
        typedPages: true,
    },

    runtimeConfig: {},
    imports: {
        dirs: ["types", "schema", "phrases", "composables"],
    },

    sourcemap: {
        client: true,
        server: true,
    },
});
