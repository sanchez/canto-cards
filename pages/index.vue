<script setup lang="ts">
    const { gameState, isGameOver } = useGameState();
</script>

<template>
    <Header>
        Canto-Cards!

        <template #subtitle>
            A fun party game to test your knowledge of Cantonese and learn some
            new words! To get started, add players below and click "Get Started"
            to start the game.
        </template>
    </Header>

    <PlayerManager />

    <Button>Get Started</Button>

    <div class="w-full space-y-8">
        <ClientOnly>
            <template v-if="!isGameOver">
                <div class="space-y-6">
                    <GameBoard />
                </div>
            </template>
            <Leaderboard v-else />
        </ClientOnly>
    </div>
</template>
