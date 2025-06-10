<script setup lang="ts">
    const { gameState, isGameOver } = useGameState();
</script>

<template>
    <div class="w-full space-y-8">
        <h1
            class="text-4xl sm:text-5xl font-bold text-center text-white/90 font-display">
            Canto Cards
        </h1>

        <ClientOnly>
            <template v-if="!isGameOver">
                <div class="space-y-6">
                    <PlayerManager />
                    <GameBoard />
                </div>
            </template>
            <Leaderboard v-else />
        </ClientOnly>
    </div>
</template>
