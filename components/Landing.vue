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

    <div class="w-full">
        <Button
            :disabled="!enoughPlayers"
            @click="gameState.stage = 'difficulty'"
            >Get Started</Button
        >
        <div
            v-if="!enoughPlayers"
            class="w-full text-left px-3 text-sm text-secondary-900">
            You must have at least 2 players to start the game.
        </div>
    </div>
</template>

<script setup lang="ts">
    const { gameState } = useGameState();

    const enoughPlayers = computed(() => {
        return gameState.value.players.length >= 2;
    });
</script>
