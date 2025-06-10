<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-800 to-secondary-900">
        <div class="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            <div
                class="w-full rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl p-6 sm:p-8 flex flex-col items-center gap-6">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    // ...existing code...
</script>

<style scoped>
    /* Add any additional custom styles here if needed */
</style>
