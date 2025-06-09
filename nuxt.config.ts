// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: [],
    ssr: false,

    experimental: {
        typedPages: true,
    },

    runtimeConfig: {},

    imports: {
        dirs: ["types", "schema"],
    },

    sourcemap: {
        client: true,
        server: true,
    },
});
