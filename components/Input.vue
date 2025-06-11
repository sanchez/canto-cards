<template>
    <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="$event => value = ($event.target as HTMLInputElement).value"
        class="w-full flex-1 px-4 py-3 rounded-xl border-2 border-primary-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none placeholder:text-slate-400 text-slate-700" />
</template>

<script setup lang="ts">
    const props = defineProps({
        type: {
            type: String as PropType<"text" | "email" | "password" | "number">,
            default: "text",
        },

        placeholder: {
            type: String,
            default: "",
        },
    });

    const value = defineModel({
        type: String,
    });
</script>
