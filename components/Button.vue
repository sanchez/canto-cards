<template>
    <button
        class="relative inline-flex items-center justify-center font-medium transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] transform rounded-xl px-4 py-3 text-lg w-full border-2"
        :class="{
            'bg-primary-600 border-primary-600 text-white hover:bg-primary-700 hover:border-primary-700':
                variant === 'primary' && !disabled,
            'border-primary-600 text-black cursor-not-allowed':
                variant === 'primary' && disabled,
            'bg-secondary-600 border-secondary-600 text-white hover:bg-secondary-700 hover:border-secondary-700':
                variant === 'secondary' && !disabled,
            'border-secondary-600 text-black cursor-not-allowed':
                variant === 'secondary' && disabled,
        }">
        <slot />
    </button>
</template>

<script setup lang="ts">
    defineProps({
        variant: {
            type: String as PropType<"primary" | "secondary">,
            default: "primary",
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    });
</script>
