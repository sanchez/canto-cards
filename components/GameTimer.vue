<script setup lang="ts">
    const props = defineProps<{
        duration: number;
        isActive: boolean;
    }>();

    const emit = defineEmits<{
        timeout: [];
    }>();

    const timeLeft = ref(props.duration);
    const formattedTime = computed(() => {
        const minutes = Math.floor(timeLeft.value / 60);
        const seconds = timeLeft.value % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    });

    const progressPercentage = computed(
        () => ((props.duration - timeLeft.value) / props.duration) * 100
    );

    watch(
        () => props.isActive,
        (isActive) => {
            if (isActive) {
                timeLeft.value = props.duration;
                const timer = setInterval(() => {
                    if (timeLeft.value > 0) {
                        timeLeft.value--;
                    } else {
                        clearInterval(timer);
                        emit("timeout");
                    }
                }, 1000);

                onScopeDispose(() => {
                    clearInterval(timer);
                });
            }
        }
    );
</script>

<template>
    <div class="relative">
        <div
            class="absolute -top-8 left-1/2 -translate-x-1/2 text-xl font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300">
            {{ formattedTime }}
        </div>
        <div
            class="relative w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div
                class="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 transition-all duration-1000 ease-linear shadow-lg"
                :style="{ width: `${progressPercentage}%` }" />
        </div>
    </div>
</template>
