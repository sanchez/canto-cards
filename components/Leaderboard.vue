<script setup lang="ts">
    const { gameState, resetGame } = useGameState();

    const sortedPlayers = computed(() =>
        [...gameState.value.players].sort((a, b) => b.score - a.score)
    );
</script>

<template>
    <div class="space-y-8">
        <div class="text-center space-y-2">
            <h2
                class="text-4xl font-bold bg-gradient-to-r from-rose-600 to-indigo-600 text-transparent bg-clip-text">
                Game Over!
            </h2>
            <p class="text-slate-600">Final Standings</p>
        </div>

        <div
            v-auto-animate
            class="space-y-4">
            <div
                v-for="(player, index) in sortedPlayers"
                :key="player.name"
                class="flex items-center justify-between p-5 bg-white/70 backdrop-blur-sm rounded-xl border-2 transition-all duration-200"
                :class="[
                    index === 0
                        ? 'border-amber-200  shadow-lg shadow-amber-100 '
                        : index === 1
                        ? 'border-slate-200 '
                        : index === 2
                        ? 'border-orange-200 '
                        : 'border-slate-100 ',
                ]">
                <div class="flex items-center gap-4">
                    <span
                        class="w-8 h-8 flex items-center justify-center rounded-lg text-xl font-bold"
                        :class="[
                            index === 0
                                ? 'bg-amber-100 text-amber-700'
                                : index === 1
                                ? 'bg-slate-100 text-slate-700'
                                : index === 2
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-slate-50 text-slate-600',
                        ]">
                        {{ index + 1 }}
                    </span>
                    <span class="text-lg font-medium text-slate-800">
                        {{ player.name }}
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <span
                        class="text-2xl font-bold"
                        :class="[
                            index === 0
                                ? 'text-amber-600'
                                : index === 1
                                ? 'text-slate-600'
                                : index === 2
                                ? 'text-orange-600'
                                : 'text-slate-500',
                        ]">
                        {{ player.score }}
                    </span>
                    <span class="text-sm text-slate-500">points</span>
                </div>
            </div>
        </div>

        <button
            @click="resetGame"
            class="w-full py-4 bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-lg font-medium rounded-xl hover:from-indigo-600 hover:to-rose-600 active:scale-[0.98] transform transition-all duration-200 shadow-lg hover:shadow-xl">
            Play Again
        </button>
    </div>
</template>
