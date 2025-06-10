<script setup lang="ts">
    const { gameState, addPlayer, removePlayer, startGame } = useGameState();
    const newPlayerName = ref("");

    const handleAddPlayer = () => {
        if (newPlayerName.value.trim()) {
            addPlayer(newPlayerName.value);
            newPlayerName.value = "";
        }
    };
</script>

<template>
    <div class="space-y-6">
        <h2
            class="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400">
            Players
        </h2>

        <div
            v-if="!gameState.isGameStarted"
            class="space-y-6">
            <div class="flex flex-col sm:flex-row gap-2">
                <input
                    v-model="newPlayerName"
                    type="text"
                    placeholder="Enter player name"
                    class="flex-1 px-4 py-3 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 focus:border-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-700 dark:text-slate-200"
                    @keyup.enter="handleAddPlayer" />
                <button
                    @click="handleAddPlayer"
                    class="px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 active:scale-95 transform transition-all duration-200 shadow-lg hover:shadow-xl dark:shadow-indigo-900/30">
                    Add Player
                </button>
            </div>

            <div
                v-auto-animate
                class="space-y-3">
                <div
                    v-for="(player, index) in gameState.players"
                    :key="player.name"
                    class="flex items-center justify-between p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border-2 border-rose-100 dark:border-rose-900 shadow-sm hover:shadow-md transition-all duration-200">
                    <span class="text-lg text-slate-700 dark:text-slate-200">{{
                        player.name
                    }}</span>
                    <button
                        @click="() => removePlayer(index)"
                        class="p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors">
                        Remove
                    </button>
                </div>
            </div>

            <button
                v-if="gameState.players.length >= 2"
                @click="startGame"
                class="w-full py-4 bg-gradient-to-r from-rose-500 to-indigo-500 text-white text-lg font-medium rounded-xl hover:from-rose-600 hover:to-indigo-600 active:scale-[0.98] transform transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                Start Game
            </button>
        </div>

        <div
            v-else
            class="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-800 rounded-lg">
            <div class="space-y-1">
                <div
                    v-for="player in gameState.players"
                    :key="player.name"
                    class="flex gap-4">
                    <span
                        :class="[
                            'text-primary-900 dark:text-primary-100',
                            {
                                'font-bold':
                                    player ===
                                    gameState.players[
                                        gameState.currentPlayerIndex
                                    ],
                            },
                        ]">
                        {{ player.name }}
                    </span>
                    <span class="text-primary-500"
                        >{{ player.score }} points</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
